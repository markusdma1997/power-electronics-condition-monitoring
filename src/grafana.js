import {Button, Card, Grid, Heading, TabItem, Tabs} from "@aws-amplify/ui-react";
import * as React from "react";
import {useEffect, useState} from "react";

export default function GrafanaDashboardPanel() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    let gridTemplateColumns = windowSize.width > 1280 ? "1fr 1fr 1fr" : "1fr 1fr";

    const updateWindowSize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        gridTemplateColumns = windowSize.width > 1280 ? "1fr 1fr 1fr" : "1fr 1fr";
    };

    useEffect(() => {
        // Add a resize event listener
        window.addEventListener('resize', updateWindowSize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', updateWindowSize);
        };
    }, []);

    return (
        <Card>
            <Heading level={4}>Grafana Panel</Heading>
            <Tabs
                justifyContent="flex-start"
                alignSelf="flex-start"
                spacing="equal">
                <TabItem title="Voltage & Power">
                    <Grid templateColumns={gridTemplateColumns}>
                        <Card>
                            <Heading level={6}>Condition Monitoring - MV Voltage</Heading>
                            <iframe
                                title="MV Voltage"
                                src="https://ec2-grafana.de:3000/d-solo/fac9197a-c4fc-493c-9707-a546d84cfeb4/condition-monitoring?refresh=5s&from=now-5m&to=now&orgId=2&theme=dark&panelId=1"
                                width="720rem"
                                height="320rem"
                                frameBorder="0">
                            </iframe>
                        </Card>
                        <Card>
                            <Heading level={6}>Condition Monitoring - LV Voltage</Heading>
                            <iframe
                                title="LV Voltage"
                                src="https://ec2-grafana.de:3000/d-solo/fac9197a-c4fc-493c-9707-a546d84cfeb4/condition-monitoring?refresh=5s&from=now-5m&to=now&orgId=2&theme=dark&panelId=2"
                                width="720rem"
                                height="320rem"
                                frameBorder="0">
                            </iframe>
                        </Card>
                        <Card>
                            <Heading level={6}>Condition Monitoring - Power</Heading>
                            <iframe
                                title="Power"
                                src="https://ec2-grafana.de:3000/d-solo/fac9197a-c4fc-493c-9707-a546d84cfeb4/condition-monitoring?refresh=5s&from=now-5m&to=now&orgId=2&theme=dark&panelId=3"
                                width="720rem"
                                height="320rem"
                                frameBorder="0">
                            </iframe>
                        </Card>
                    </Grid>
                </TabItem>
                <TabItem title="Temperature - Transformer">
                    <Grid templateColumns="1fr 1fr 1fr">
                        <Card>
                            <Heading level={6}>Condition Monitoring - Transformer LV Temperature</Heading>
                            <iframe
                                title="Transformer LV Temperature"
                                src="https://ec2-grafana.de:3000/d-solo/fac9197a-c4fc-493c-9707-a546d84cfeb4/condition-monitoring?refresh=5s&from=now-5m&to=now&orgId=2&theme=dark&panelId=4"
                                width="675"
                                height="300"
                                frameBorder="0">
                            </iframe>
                        </Card>
                        <Card>
                            <Heading level={6}>Condition Monitoring - Transformer MV Temperature</Heading>
                            <iframe
                                title="Transformer MV Temperature"
                                src="https://ec2-grafana.de:3000/d-solo/fac9197a-c4fc-493c-9707-a546d84cfeb4/condition-monitoring?refresh=5s&from=now-5m&to=now&orgId=2&theme=dark&panelId=5"
                                width="675"
                                height="300"
                                frameBorder="0">
                            </iframe>
                        </Card>
                        <Card>
                            <Heading level={6}>Condition Monitoring - Transformer Core Temperature</Heading>
                            <iframe
                                title="Transformer Core Temperature"
                                src="https://ec2-grafana.de:3000/d-solo/fac9197a-c4fc-493c-9707-a546d84cfeb4/condition-monitoring?refresh=5s&from=now-5m&to=now&orgId=2&theme=dark&panelId=6"
                                width="675"
                                height="300"
                                frameBorder="0">
                            </iframe>
                        </Card>
                        <Card>
                            <Heading level={6}>Condition Monitoring - TBD</Heading>
                            <iframe
                                title="Transformer Temperature TBD"
                                src="https://ec2-grafana.de:3000/d-solo/fac9197a-c4fc-493c-9707-a546d84cfeb4/condition-monitoring?refresh=5s&from=now-5m&to=now&orgId=2&theme=dark&panelId=7"
                                width="675"
                                height="300"
                                frameBorder="0">
                            </iframe>
                        </Card>
                    </Grid>
                </TabItem>
                <TabItem title="Temperature - Capacitor">
                    <Grid templateColumns="1fr 1fr 1fr">
                        <Card>
                            <Heading level={6}>Condition Monitoring - Capacitor Inside Temperature</Heading>
                            <iframe
                                title="Capacitor Inside Temperature"
                                src="https://ec2-grafana.de:3000/d-solo/fac9197a-c4fc-493c-9707-a546d84cfeb4/condition-monitoring?refresh=5s&from=now-5m&to=now&orgId=2&theme=dark&panelId=8"
                                width="675"
                                height="300"
                                frameBorder="0">
                            </iframe>
                        </Card>
                        <Card>
                            <Heading level={6}>Condition Monitoring - Capacitor Outside Temperature</Heading>
                            <iframe
                                title="Capacitor Outside Temperature"
                                src="https://ec2-grafana.de:3000/d-solo/fac9197a-c4fc-493c-9707-a546d84cfeb4/condition-monitoring?refresh=5s&from=now-5m&to=now&orgId=2&theme=dark&panelId=9"
                                width="675"
                                height="300"
                                frameBorder="0">
                            </iframe>
                        </Card>
                    </Grid>
                </TabItem>
                <TabItem title="Temperature - Cooling Plate & Water">
                    <Grid templateColumns="1fr 1fr 1fr">
                        <Card>
                            <Heading level={6}>Condition Monitoring - Cooling Plate Temperature</Heading>
                            <iframe
                                title="Cooling Plate Temperature"
                                src="https://ec2-grafana.de:3000/d-solo/fac9197a-c4fc-493c-9707-a546d84cfeb4/condition-monitoring?refresh=5s&from=now-5m&to=now&orgId=2&theme=dark&panelId=10"
                                width="675"
                                height="300"
                                frameBorder="0">
                            </iframe>
                        </Card>
                        <Card>
                            <Heading level={6}>Condition Monitoring - Water Temperature</Heading>
                            <iframe
                                title="Water Temperature"
                                src="https://ec2-grafana.de:3000/d-solo/fac9197a-c4fc-493c-9707-a546d84cfeb4/condition-monitoring?refresh=5s&from=now-5m&to=now&orgId=2&theme=dark&panelId=11"
                                width="675"
                                height="300"
                                frameBorder="0">
                            </iframe>
                        </Card>
                    </Grid>
                </TabItem>
                <TabItem title="Auxiliary">
                    <Card>
                        <Heading level={6}>Condition Monitoring - Auxiliary Data (Sawtooth Wave)</Heading>
                        <iframe
                            title="Auxiliary Data"
                            src="https://ec2-grafana.de:3000/d-solo/fac9197a-c4fc-493c-9707-a546d84cfeb4/condition-monitoring?orgId=2&refresh=5s&from=now-5m&to=now&theme=dark&panelId=12"
                            width="675"
                            height="300"
                            frameBorder="0">
                        </iframe>
                    </Card>
                </TabItem>
            </Tabs>
            <Button
                variation="primary"
                type="submit"
                height="2rem"
                alignSelf="flex-end"
                // ref={newSubscriptionTopicButtonRef}
                onClick={() => alert("Current window width is " + windowSize.width + ", height is " + windowSize.height)}>
                Get current window size
            </Button>
        </Card>
    )
}
