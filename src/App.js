import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import {Amplify, Auth} from 'aws-amplify';
import awsconfig from './aws-exports';
import "@aws-amplify/ui-react/styles.css";
import {
  Card, Heading, Image, View, withAuthenticator, Button, Flex, TabItem, Tabs
} from "@aws-amplify/ui-react";

import GrafanaDashboardPanel from "./grafana";
import AWSTimestreamManagementPanel from "./timestream";
import MQTTSubscriptionTopicList from "./topics";
import AWSLambdaFunctions from "./lambda";

Amplify.configure(awsconfig);

async function signUp() {
  try {
    let username, password, email, phone_number;
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email,          // optional
        phone_number,   // optional - E.164 number convention
        // other custom attributes
      },
      autoSignIn: { // optional - enables auto sign in after user is confirmed
        enabled: true,
      }
    });
    console.log(user);
  } catch (error) {
    console.log('error signing up:', error);
  }
}

async function getCognitoIdentityId() {
  let cognitoIdentityId = await Auth.currentCredentials().then((info) => {
    return info.identityId;
  });
  console.log('AWS cognito identity ID for current user is ' + cognitoIdentityId);
  alert('AWS cognito identity ID for current user is ' + cognitoIdentityId);
}

const App = function ({ signOut, user }) {
  return (
      <headers>
        <frame-options policy="SAMEORIGIN"/>
        <View className="App">
          <Card>
            <Image alt="logo" src={logo} height="10%" width="10%"/>
            <Heading level={1}>Condition Monitoring on Power Electronics Converter Dashboard</Heading>
          </Card>
          <Tabs
              justifyContent="flex-start"
              alignSelf="flex-start"
              spacing="equal"
              paddingBottom="5rem">
            <TabItem title="Grafana Panel">
                <GrafanaDashboardPanel/>
            </TabItem>
            <TabItem title="AWS Timestream Databases">
                <AWSTimestreamManagementPanel/>
            </TabItem>
            <TabItem title="MQTT Dashboard">
                <MQTTSubscriptionTopicList/>
            </TabItem>
            <TabItem title="AWS Lambda Functions">
              <AWSLambdaFunctions/>
            </TabItem>
          </Tabs>
          <Button
              onClick={signOut}
              variation="destructive"
              height="2rem"
              alignSelf="flex-end">
            Sign Out
          </Button>
        </View>
      </headers>
  );
}

export default withAuthenticator(App);
