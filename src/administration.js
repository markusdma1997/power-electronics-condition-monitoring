import {
    Button,
    Card,
    Flex, Grid,
    Heading, ScrollView, SelectField, TabItem, Tabs,
    Text, TextAreaField, TextField
} from "@aws-amplify/ui-react";
import * as React from "react";
import {Auth, DataStore, Storage} from 'aws-amplify';
import {allowedEmail} from "./models";
import {useEffect} from "react";

export default function Administration() {
    const [apiResponse, setAPIResponse] = React.useState({
        statusCode: '',
        body: ''
    });
    const [approvedEmailsList, setApprovedEmailsList] = React.useState([]);

    const newApprovedEmailRef = React.useRef(null);
    const removeApprovalEmailRef = React.useRef(null);

    useEffect(() => {
        async function initializeApprovedEmailsList() {
            try {
                const approvedEmailsList = await DataStore.query(allowedEmail);
                setApprovedEmailsList(approvedEmailsList);
            } catch (error) {
                console.error('Error getting initialized approved emails list, ', error);
            }
        }
        initializeApprovedEmailsList().then(r => {});
    }, []);

    function updateApprovedEmailsList(approvedEmailsList) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let body = JSON.stringify({"allowed_emails_list":approvedEmailsList});
        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: body,
            redirect: 'follow'
        };

        fetch("https://z233nl7bhj.execute-api.eu-west-1.amazonaws.com/prod", requestOptions)
            .then(response => response.text())
            .then(result => {
                setAPIResponse({
                    statusCode: JSON.parse(result).statusCode,
                    body: JSON.parse(result).body
                })
            })
            .catch(error => console.log('error', error));
    }

    async function checkApprovedEmailDataStorageID(email) {
        let approvedEmailDataStorageID = null;
        const existingEmail = await DataStore.query(allowedEmail, (item) => item.email.eq(email));
        if (existingEmail.length !== 0) {
            // No duplicate email item is allowed, so if existingEmail returns non-empty items, there will only be one item
            approvedEmailDataStorageID = existingEmail[0].id;
        }
        return approvedEmailDataStorageID;
    }

    async function updateApprovedEmailsListOnS3() {
        const result = await Storage.put("approved_emails_list.txt", approvedEmailsList.map(approvedEmail => approvedEmail.email).join(","));
        console.log(result);
    }

    async function approveNewUserForSigningUp() {
        let newApprovedEmailInput = `${newApprovedEmailRef.current.value}`
        let newApprovedEmailIDCheck = await checkApprovedEmailDataStorageID(newApprovedEmailInput);
        if (newApprovedEmailIDCheck !== null) {
            alert("Email already approved");
        } else {
            await DataStore.save(
                new allowedEmail({
                    email: newApprovedEmailInput
                })
            );
            const updatedApprovedEmailsList = await DataStore.query(allowedEmail);
            setApprovedEmailsList(updatedApprovedEmailsList);
            await updateApprovedEmailsListOnS3();
        }
    }

    async function removeExistingUserForSigningUp() {
        let removeApprovalEmailInput = `${removeApprovalEmailRef.current.value}`
        let removeApprovalEmailIDCheck = await checkApprovedEmailDataStorageID(removeApprovalEmailInput);
        console.log(removeApprovalEmailIDCheck);
        if (removeApprovalEmailIDCheck !== null) {
            const emailToRemove = await DataStore.query(allowedEmail, removeApprovalEmailIDCheck);
            await DataStore.delete(emailToRemove);
            const updatedApprovedEmailsList = await DataStore.query(allowedEmail);
            setApprovedEmailsList(updatedApprovedEmailsList);
            await updateApprovedEmailsListOnS3();
        } else {
            alert("Email is not yet approved")
        }
    }

    return (
        <Card>
            <Heading level={4}>Administration Panel</Heading>
            <Tabs
                justifyContent="flex-start"
                alignSelf="flex-start"
                spacing="equal">
                <TabItem title="List of allowed emails for signing up">
                    <Card>
                        <ScrollView
                            width="100%"
                            height="400px"
                            alignSelf="center"
                        >
                            {approvedEmailsList.map(allowedEmail => <p>{allowedEmail.email}</p>)}
                        </ScrollView>
                    </Card>
                    <Flex
                        alignItems="flex-start"
                        justifyContent="center">
                        <Card width="24rem">
                            <TextField
                                descriptiveText="Enter a new email address to approve signing up"
                                label=""
                                ref={newApprovedEmailRef}
                                errorMessage="There is an error"
                            />
                            <Button
                                variation="primary"
                                type="submit"
                                height="2rem"
                                width="16rem"
                                alignSelf="flex-end"
                                onClick={() => approveNewUserForSigningUp()}>
                                Approve new user
                            </Button>
                        </Card>
                        <Card width="24rem">
                            <TextField
                                descriptiveText="Remove an email address from approved list"
                                label=""
                                ref={removeApprovalEmailRef}
                                errorMessage="There is an error"
                            />
                            <Button
                                variation="primary"
                                type="submit"
                                height="2rem"
                                width="16rem"
                                alignSelf="flex-end"
                                onClick={() => removeExistingUserForSigningUp()}>
                                Remove user
                            </Button>
                        </Card>
                    </Flex>
                </TabItem>
            </Tabs>
        </Card>
    )
}
