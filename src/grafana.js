import {Card, Grid, Heading, TabItem, Tabs} from "@aws-amplify/ui-react";
import * as React from "react";

export default function GrafanaDashboardPanel() {
    return (
        <Card>
            <Heading level={4}>Grafana Panel</Heading>
            <Tabs
                justifyContent="flex-start"
                alignSelf="flex-start"
                spacing="equal">
                <TabItem title="Voltage & Power">
                    <Grid templateColumns="1fr 1fr 1fr">
                        <Card>
                            <Heading level={6}>Condition Monitoring - MV Voltage</Heading>
                            <iframe
                                title="MV Voltage"
                                src="http://localhost:3000/d-solo/f257e0c1-9501-40f6-aab0-a7b11c8e15c4/condition-monitoring?refresh=1s&from=now-5m&to=now&orgId=2&theme=dark&panelId=1"
                                width="675"
                                height="300"
                                frameBorder="0">
                            </iframe>
                        </Card>
                        <Card>
                            <Heading level={6}>Condition Monitoring - LV Voltage</Heading>
                            <iframe
                                title="LV Voltage"
                                src="http://localhost:3000/d-solo/f257e0c1-9501-40f6-aab0-a7b11c8e15c4/condition-monitoring?refresh=1s&from=now-5m&to=now&orgId=2&theme=dark&panelId=2"
                                width="675"
                                height="300"
                                frameBorder="0">
                            </iframe>
                        </Card>
                        <Card>
                            <Heading level={6}>Condition Monitoring - Power</Heading>
                            <iframe
                                title="Power"
                                src="http://localhost:3000/d-solo/f257e0c1-9501-40f6-aab0-a7b11c8e15c4/condition-monitoring?refresh=1s&from=now-5m&to=now&orgId=2&theme=dark&panelId=3"
                                width="675"
                                height="300"
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
                                src="http://localhost:3000/d-solo/f257e0c1-9501-40f6-aab0-a7b11c8e15c4/condition-monitoring?refresh=1s&from=now-5m&to=now&orgId=2&theme=dark&panelId=4"
                                width="675"
                                height="300"
                                frameBorder="0">
                            </iframe>
                        </Card>
                        <Card>
                            <Heading level={6}>Condition Monitoring - Transformer MV Temperature</Heading>
                            <iframe
                                title="Transformer MV Temperature"
                                src="http://localhost:3000/d-solo/f257e0c1-9501-40f6-aab0-a7b11c8e15c4/condition-monitoring?refresh=1s&from=now-5m&to=now&orgId=2&theme=dark&panelId=5"
                                width="675"
                                height="300"
                                frameBorder="0">
                            </iframe>
                        </Card>
                        <Card>
                            <Heading level={6}>Condition Monitoring - Transformer Core Temperature</Heading>
                            <iframe
                                title="Transformer Core Temperature"
                                src="http://localhost:3000/d-solo/f257e0c1-9501-40f6-aab0-a7b11c8e15c4/condition-monitoring?refresh=1s&from=now-5m&to=now&orgId=2&theme=dark&panelId=6"
                                width="675"
                                height="300"
                                frameBorder="0">
                            </iframe>
                        </Card>
                        <Card>
                            <Heading level={6}>Condition Monitoring - TBD</Heading>
                            <iframe
                                title="Transformer Temperature TBD"
                                src="http://localhost:3000/d-solo/f257e0c1-9501-40f6-aab0-a7b11c8e15c4/condition-monitoring?refresh=1s&from=now-5m&to=now&orgId=2&theme=dark&panelId=7"
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
                                src="http://localhost:3000/d-solo/f257e0c1-9501-40f6-aab0-a7b11c8e15c4/condition-monitoring?refresh=1s&from=now-5m&to=now&orgId=2&theme=dark&panelId=8"
                                width="675"
                                height="300"
                                frameBorder="0">
                            </iframe>
                        </Card>
                        <Card>
                            <Heading level={6}>Condition Monitoring - Capacitor Outside Temperature</Heading>
                            <iframe
                                title="Capacitor Outside Temperature"
                                src="http://localhost:3000/d-solo/f257e0c1-9501-40f6-aab0-a7b11c8e15c4/condition-monitoring?refresh=1s&from=now-5m&to=now&orgId=2&theme=dark&panelId=9"
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
                                src="http://localhost:3000/d-solo/f257e0c1-9501-40f6-aab0-a7b11c8e15c4/condition-monitoring?refresh=1s&from=now-5m&to=now&orgId=2&theme=dark&panelId=10"
                                width="675"
                                height="300"
                                frameBorder="0">
                            </iframe>
                        </Card>
                        <Card>
                            <Heading level={6}>Condition Monitoring - Water Temperature</Heading>
                            <iframe
                                title="Water Temperature"
                                src="http://localhost:3000/d-solo/f257e0c1-9501-40f6-aab0-a7b11c8e15c4/condition-monitoring?refresh=1s&from=now-5m&to=now&orgId=2&theme=dark&panelId=11"
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
                            src="http://localhost:3000/d-solo/f257e0c1-9501-40f6-aab0-a7b11c8e15c4/condition-monitoring?refresh=1s&from=now-5m&to=now&orgId=2&theme=dark&panelId=12"
                            width="675"
                            height="300"
                            frameBorder="0">
                        </iframe>
                    </Card>
                </TabItem>
            </Tabs>
        </Card>
    )
}
