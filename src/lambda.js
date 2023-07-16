import {
    Button,
    Card,
    Flex, Grid,
    Heading, SelectField, TabItem, Tabs,
    Text, TextAreaField
} from "@aws-amplify/ui-react";
import * as React from "react";

export default function AWSLambdaFunctions() {
    const [apiResponse, setAPIResponse] = React.useState({
        statusCode: '',
        body: ''
    });

    const [sensorDataFileList, setSensorDataFileList] = React.useState([]);

    const [sensorDataFileForAnalysis, setSensorDataFileForAnalysis] = React.useState('');

    function checkSensorDataCSVFileForAnomalies(awsS3FileURI) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let body = JSON.stringify({"csv_file_s3_uri":awsS3FileURI});
        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: body,
            redirect: 'follow'
        };

        fetch("https://nt2uzsrvz0.execute-api.eu-west-1.amazonaws.com/dev", requestOptions)
            .then(response => response.text())
            .then(result => {
                setAPIResponse({
                    statusCode: JSON.parse(result).statusCode,
                    body: JSON.parse(result).body
                })
            })
            .catch(error => console.log('error', error));
    }

    const awsS3URISensorDataFile = React.useRef(null);

    return (
        <Card>
            <Heading level={4}>AWS Lambda Functions</Heading>
            <Tabs
                justifyContent="flex-start"
                alignSelf="flex-start"
                spacing="equal">
                <TabItem title="Check sensor data file for anomalies">
                    <Flex
                        alignItems="flex-start"
                        justifyContent="center">
                        <Card>
                            <TextAreaField
                                variation="quiet"
                                descriptiveText="Provide the AWS S3 URI for the sensor data file"
                                textAlign="left"
                                paddingBottom="1rem"
                                ref={awsS3URISensorDataFile}
                            />
                            <Button
                                variation="primary"
                                type="submit"
                                height="2rem"
                                width="20rem"
                                alignSelf="flex-end"
                                onClick={() => checkSensorDataCSVFileForAnomalies(`${awsS3URISensorDataFile.current.value}`)}>
                                Check sensor data anomalies
                            </Button>
                        </Card>
                        <Card width="24rem">
                            <Heading level={6}>
                                Result from AWS Lambda function
                            </Heading>
                            <Text>Response status code: {apiResponse.statusCode}</Text>
                            <Text>Response body: {apiResponse.body}</Text>
                        </Card>
                    </Flex>
                </TabItem>
                <TabItem title="Zoom in on 10 seconds sensor data">
                    <Flex
                        alignItems="center"
                        justifyContent="center">
                        <SelectField
                            label="Choose a sensor data file for analysis"
                            descriptiveText="Each file contains sensor data records for 10 seconds"
                            options={sensorDataFileList}
                            onChange={(filename) => setSensorDataFileForAnalysis(filename.target.value)}>
                        </SelectField>
                        <Card>

                        </Card>
                    </Flex>
                </TabItem>
            </Tabs>
        </Card>
    )
}
