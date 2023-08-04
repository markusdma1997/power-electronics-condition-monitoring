import {
    Button,
    Card,
    Flex,
    Heading,
    TextField,
    Text, TextAreaField
} from "@aws-amplify/ui-react";
import * as React from "react";
import { Amplify, PubSub } from "aws-amplify";
import { AWSIoTProvider } from '@aws-amplify/pubsub';

Amplify.Logger.LOG_LEVEL = 'VERBOSE';
Amplify.addPluggable(
    new AWSIoTProvider({
        aws_pubsub_region: 'eu-west-1',
        aws_pubsub_endpoint:
            'wss://arvb6j5c7prz6-ats.iot.eu-west-1.amazonaws.com/mqtt'
    })
);

export default function MQTTSubscriptionTopicList() {
    const [topicList, setTopicList] = React.useState([
        {
            topicName: 'iot2050/greengrass/command/pause_looping',
            messageList: ['message 1: this is a long message to test the text wrap layout', 'message 2']
        }
    ]);

    const [mqttSubscriptionError, setMQTTSubscriptionError] = React.useState({
        mqttSubscriptionHasError: false,
        mqttSubscriptionErrorMessage: ''
    });

    const [MQTTMessage, setMQTTMessage] = React.useState({
        topicName: '',
        messageContent: ''
    });

    const [voltageMessages, setVoltageMessages] = React.useState({
        voltageMessage: ''
    });

    const [powerMessages, setPowerMessages] = React.useState({
        powerMessage: ''
    });

    const [transformerTemperatureMessages, setTransformerTemperatureMessages] = React.useState({
        transformerTemperatureMessage: ''
    });

    const [capacitorTemperatureMessages, setCapacitorTemperatureMessages] = React.useState({
        capacitorTemperatureMessage: ''
    });

    const [coolingPlateWaterTemperatureMessages, setCoolingPlateWaterTemperatureMessages] = React.useState({
        coolingPlateWaterTemperatureMessage: ''
    });

    const [auxiliaryMessages, setAuxiliaryMessages] = React.useState({
        auxiliaryMessage: ''
    });

    PubSub.subscribe('iot2050/greengrass/response/loop').subscribe({
        next: (data) => {
            console.log('Received subscription request', data);
            setMQTTMessage({
                topicName: 'iot2050/greengrass/response/loop',
                messageContent: data.value
            })
        },
        error: (error) => {
            console.error(error);
            setMQTTSubscriptionError({
                mqttSubscriptionHasError: true,
                mqttSubscriptionErrorMessage: error.toString()
            });
        },
        complete: () => console.log('Done')
    });

    PubSub.subscribe('iot2050/greengrass/response/upload_file').subscribe({
        next: (data) => {
            console.log('Received upload file request', data);
            setMQTTMessage({
                topicName: 'iot2050/greengrass/response/upload_file',
                messageContent: data.value
            })
        },
        error: (error) => {
            console.error(error);
            setMQTTSubscriptionError({
                mqttSubscriptionHasError: true,
                mqttSubscriptionErrorMessage: error.toString()
            });
        },
        complete: () => console.log('Done')
    });


    PubSub.subscribe('iotcore/iot2050/sensor/voltage').subscribe({
        next: (data) => {
            console.log('Received voltage sensor data', data);
            setVoltageMessages({
                voltageMessage: data.value
            })
        },
        error: (error) => {
            console.error(error);
            setMQTTSubscriptionError({
                mqttSubscriptionHasError: true,
                mqttSubscriptionErrorMessage: error.toString()
            });
        },
        complete: () => console.log('Done')
    });

    PubSub.subscribe('iotcore/iot2050/sensor/power').subscribe({
        next: (data) => {
            console.log('Received power sensor data', data);
            setPowerMessages({
                powerMessage: data.value
            })
        },
        error: (error) => {
            console.error(error);
            setMQTTSubscriptionError({
                mqttSubscriptionHasError: true,
                mqttSubscriptionErrorMessage: error.toString()
            });
        },
        complete: () => console.log('Done')
    });

    PubSub.subscribe('iotcore/iot2050/sensor/temperature/transformer').subscribe({
        next: (data) => {
            console.log('Received transformer temperature sensor data', data);
            setTransformerTemperatureMessages({
                transformerTemperatureMessage: data.value
            })
        },
        error: (error) => {
            console.error(error);
            setMQTTSubscriptionError({
                mqttSubscriptionHasError: true,
                mqttSubscriptionErrorMessage: error.toString()
            });
        },
        complete: () => console.log('Done')
    });

    PubSub.subscribe('iotcore/iot2050/sensor/temperature/capacitor').subscribe({
        next: (data) => {
            console.log('Received capacitor temperature sensor data', data);
            setCapacitorTemperatureMessages({
                capacitorTemperatureMessage: data.value
            })
        },
        error: (error) => {
            console.error(error);
            setMQTTSubscriptionError({
                mqttSubscriptionHasError: true,
                mqttSubscriptionErrorMessage: error.toString()
            });
        },
        complete: () => console.log('Done')
    });

    PubSub.subscribe('iotcore/iot2050/sensor/temperature/cooling_plate_water').subscribe({
        next: (data) => {
            console.log('Received cooling plate and water temperature sensor data', data);
            setCoolingPlateWaterTemperatureMessages({
                coolingPlateWaterTemperatureMessage: data.value
            })
        },
        error: (error) => {
            console.error(error);
            setMQTTSubscriptionError({
                mqttSubscriptionHasError: true,
                mqttSubscriptionErrorMessage: error.toString()
            });
        },
        complete: () => console.log('Done')
    });

    PubSub.subscribe('iotcore/iot2050/sensor/auxiliary').subscribe({
        next: (data) => {
            setAuxiliaryMessages({
                auxiliaryMessage: data.value
            })
        },
        error: (error) => {
            console.error(error);
            setMQTTSubscriptionError({
                mqttSubscriptionHasError: true,
                mqttSubscriptionErrorMessage: error.toString()
            });
        },
        complete: () => console.log('Done')
    });

    async function validateAndInitiateMQTTSubscription(subscribeToTopicName) {
        // Initialize mqtt subscription topic error state
        setMQTTSubscriptionError({
            mqttSubscriptionHasError: false,
            mqttSubscriptionErrorMessage: ''
        });
        let topicIsValid = true;

        // Iterate through existing mqtt topic lists and check for validation
        topicList.forEach((topic, index) => {
            if (topic.topicName === subscribeToTopicName) {
                setMQTTSubscriptionError({
                    mqttSubscriptionHasError: true,
                    mqttSubscriptionErrorMessage: 'Topic ' + topic.topicName + ' has already been subscribed'
                })
                topicIsValid = false;
            }
        })

        if (topicIsValid) {
            updateTopicListWithNewTopic(subscribeToTopicName);

            PubSub.subscribe(subscribeToTopicName).subscribe({
                next: (data) => {
                    console.log('Received subscription request', data);
                    setMQTTMessage({
                        topicName: subscribeToTopicName,
                        messageContent: data.value.message
                    })
                },
                error: (error) => {
                    console.error(error);
                    setMQTTSubscriptionError({
                        mqttSubscriptionHasError: true,
                        mqttSubscriptionErrorMessage: error.toString()
                    });
                },
                complete: () => console.log('Done')
            });
        }
    }

    function updateTopicListWithNewTopic(subscribeToTopicName) {
        setTopicList([
            ...topicList,
            {
                topicName: subscribeToTopicName,
                messageList: []
            }
        ]);
    }

    async function publishMQTTMessage(topic, message){
        PubSub.publish(topic, message).then((response) => {
            console.log('published mqtt message', response);
        }, (error) => {
            console.log('error while publishing mqtt message', error);
        })
    }

    function unsubscribeFromTopic(unsubscribeFromTopicName) {
        setTopicList(topicList.filter(t => t.topicName !== unsubscribeFromTopicName.item.topicName));
    }

    const newSubscriptionTopicInputRef = React.useRef(null);
    const newSubscriptionTopicButtonRef = React.useRef(null);
    const newSubscriptionTopicOnClick = React.useCallback(() => {
        newSubscriptionTopicInputRef.current.focus();
        updateTopicListWithNewTopic(`${newSubscriptionTopicInputRef.current.value}`);
        console.log(topicList);
    }, [])

    React.useEffect(() => {
        const newSubscriptionTopicButtonRefCurrent = newSubscriptionTopicButtonRef.current;

        if (newSubscriptionTopicButtonRef && newSubscriptionTopicButtonRefCurrent) {
            newSubscriptionTopicButtonRefCurrent.addEventListener('click', newSubscriptionTopicOnClick, false);
            return () => {
                newSubscriptionTopicButtonRefCurrent.removeEventListener('click', newSubscriptionTopicOnClick, false);
            };
        }
    }, [onclick]);

    const mqttMessageTopicInputRef = React.useRef(null);
    const mqttMessagePayloadInputRef = React.useRef(null);
    const publishMQTTMessageButtonRef = React.useRef(null);

    return (
        <Card>
            <Heading level={4}>MQTT Dashboard</Heading>
            <Flex
                alignItems="center"
                justifyContent="center">
                <Card width="36rem">
                    <Heading level={5}>Voltage</Heading>
                    <Text>{voltageMessages.voltageMessage}</Text>
                </Card>
                <Card width="36rem">
                    <Heading level={5}>Power</Heading>
                    <Text>{powerMessages.powerMessage}</Text>
                </Card>
                <Card width="36rem">
                    <Heading level={5}>Temperature - Transformer</Heading>
                    <Text>{transformerTemperatureMessages.transformerTemperatureMessage}</Text>
                </Card>
                <Card width="36rem">
                    <Heading level={5}>Temperature - Capacitor</Heading>
                    <Text>{capacitorTemperatureMessages.capacitorTemperatureMessage}</Text>
                </Card>
                <Card width="36rem">
                    <Heading level={5}>Temperature - Cooling Plate & Water</Heading>
                    <Text>{coolingPlateWaterTemperatureMessages.coolingPlateWaterTemperatureMessage}</Text>
                </Card>
                <Card width="36rem">
                    <Heading level={5}>Auxiliary</Heading>
                    <Text>{auxiliaryMessages.auxiliaryMessage}</Text>
                </Card>
            </Flex>
            <Card>
                <Flex justifyContent="center">
                    <Card>
                        <Heading level={6}>
                            Publish a MQTT message to AWS IoT Core
                        </Heading>
                        <TextField
                            variation="quiet"
                            descriptiveText="Topic"
                            textAlign="left"
                            ref={mqttMessageTopicInputRef}
                        />
                        <TextAreaField
                            variation="quiet"
                            descriptiveText="Message Payload"
                            textAlign="left"
                            paddingBottom="1rem"
                            ref={mqttMessagePayloadInputRef}
                        />
                        <Button
                            variation="primary"
                            type="submit"
                            height="2rem"
                            alignSelf="flex-end"
                            ref={publishMQTTMessageButtonRef}
                            onClick={() => publishMQTTMessage(`${mqttMessageTopicInputRef.current.value}`, `${mqttMessagePayloadInputRef.current.value}`)}>
                            Publish
                        </Button>
                        <Text>-</Text>
                        <Text>Publish to pre-defined MQTT topics</Text>
                        <Button
                            variation="primary"
                            type="submit"
                            height="2rem"
                            width="20rem"
                            alignSelf="flex-end"
                            ref={publishMQTTMessageButtonRef}
                            onClick={() => publishMQTTMessage('iot2050/greengrass/command/pause_looping', '')}>
                            Pause Looping on IoT Gateway
                        </Button>
                        <Text>-</Text>
                        <Button
                            variation="primary"
                            type="submit"
                            height="2rem"
                            width="20rem"
                            alignSelf="flex-end"
                            ref={publishMQTTMessageButtonRef}
                            onClick={() => publishMQTTMessage('iot2050/greengrass/command/resume_looping', '')}>
                            Resume Looping on IoT Gateway
                        </Button>
                        <Text>-</Text>
                        <Button
                            variation="primary"
                            type="submit"
                            height="2rem"
                            width="20rem"
                            alignSelf="flex-end"
                            ref={publishMQTTMessageButtonRef}
                            onClick={() => publishMQTTMessage('iot2050/greengrass/command/upload_file', '')}>
                            Upload most recent sensor data to s3
                        </Button>
                    </Card>
                    <Card width="24rem">
                        <Heading level={6}>
                            Response from IoT Gateway
                        </Heading>
                        <Text>{MQTTMessage.topicName}</Text>
                        <Text>{MQTTMessage.messageContent}</Text>
                    </Card>
                </Flex>
            </Card>
        </Card>
    )
}
