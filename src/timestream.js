import {
    Button,
    Card,
    Collection,
    Flex,
    Heading,
    ScrollView,
    Text,
    TextAreaField,
    TextField
} from "@aws-amplify/ui-react";
import * as React from "react";
import { useState } from "react";
import { Amplify, API } from 'aws-amplify';
import awsconfig from './aws-exports';

import { TimestreamQueryClient, QueryCommand } from "@aws-sdk/client-timestream-query";
import { TimestreamWriteClient, ListDatabasesCommand, ListTablesCommand } from "@aws-sdk/client-timestream-write";

const writeClient = new TimestreamWriteClient({
    region: "eu-west-1",
    endpoint: "https://ingest-cell1.timestream.eu-west-1.amazonaws.com",
    credentials: {
        accessKeyId: 'AKIAT6JT3IBBZ5ZM74Z7',
        secretAccessKey: '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'
    }
});

const queryClient = new TimestreamQueryClient({
    region: "eu-west-1",
    endpoint: "https://query-cell1.timestream.eu-west-1.amazonaws.com",
    credentials: {
        accessKeyId: 'AKIAT6JT3IBBZ5ZM74Z7',
        secretAccessKey: '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'
    }
});

export default function AWSTimestreamManagementPanel() {
    Amplify.configure(awsconfig);

    const [timestreamDatabaseList, setTimestreamDatabaseList] = useState([]);
    const [timestreamQueryResult, setTimestreamQueryResult] = React.useState([]);

    const timestreamQueryInputRef = React.useRef(null);

    /*
    const apiName = 'powerelectronicsuitest-timestream-management-API'
    const path = 'https://ki6univp1i.execute-api.eu-west-1.amazonaws.com/default/powerelectronicsuitest-timestream-management'
    const myInit = {
        headers: {},
        response: true
    }

    async function refreshTimestreamDatabaseList() {
        console.log('API call')
        API.get(apiName, path, myInit)
            .then((response) => {
                console.log('API call response')
                console.log(response);
            })
            .catch(((error) => {
                console.log('API call error')
                console.log(error.response);
            }))
    }
     */

    async function refreshTimestreamDatabaseList() {
        const listDatabaseParams = {
            MaxResults: 20,
            region: 'eu-west-1'
        };
        const updatedTimestreamDatabaseList = [];
        const listDatabasesCommand = new ListDatabasesCommand(listDatabaseParams);
        try {
            let databaseData = await writeClient.send(listDatabasesCommand);
            for (let database of databaseData.Databases) {
                const listTableParams = {
                    MaxResults: 20,
                    DatabaseName: database.DatabaseName
                }
                const listTableCommand = new ListTablesCommand(listTableParams);
                try {
                    const tableData = await writeClient.send(listTableCommand);
                    const currentTableList = tableData.Tables.map((table) => {
                        return table.TableName;
                    });
                    updatedTimestreamDatabaseList.push({
                        databaseName: database.DatabaseName,
                        tableList: currentTableList
                    })
                } catch (error) {
                    console.log("Error while listing tables,", error);
                }
            }
            setTimestreamDatabaseList(updatedTimestreamDatabaseList);
        } catch (error) {
            console.log("Error while listing databases,", error);
        }
    }

    function parseTimeSeriesColumn(entryColumnInfo, entryData) {
        let timeseriesColumnInfo = entryColumnInfo.Type.TimeSeriesMeasureValueColumnInfo;
        const parseResult = [];
        entryData.TimeSeriesValue.forEach((data) => {
            parseResult.push("time=" + data.Time + ", value=" +
                parseRowObject(timeseriesColumnInfo, data.Value));
        });

        return "[" + parseResult.join(", ") + "]"
    }

    function parseArrayColumn(entryColumnInfo, entryData) {
        let arrayColumnInfo = entryColumnInfo.Type.ArrayColumnInfo;
        const parseResult = [];
        parseResult.forEach((data) => {
            parseResult.push(parseRowObject(arrayColumnInfo, data));
        });
        return entryColumnInfo.Name + "=[" + parseResult.join(", ") + "]"
    }

    function parseScalarType(entryColumnInfo, entryData) {
        let entryColumnName = entryColumnInfo.Name == null ? "" : entryColumnInfo.Name;
        return entryColumnName + "=" + entryData.ScalarValue;
    }

    function parseRowObject(entryColumnInfo, entryData) {
        if (entryData.NullValue != null && entryData.NullValue === true) {
            return entryColumnInfo.Name + " is NULL";
        }

        const columnType = entryColumnInfo.Type;

        // Column type is Timeseries
        if (columnType.TimeSeriesMeasureValueColumnInfo != null) {
            return parseTimeSeriesColumn(entryColumnInfo, entryData);
        }
        // Column type is Array
        else if (columnType.ArrayColumnInfo != null) {
            return parseArrayColumn(entryColumnInfo,  entryData.ArrayValue);
        }
        // Column type is Row
        else if (columnType.RowColumnInfo != null) {
            const rowColumnInfo = entryColumnInfo.Type.RowColumnInfo;
            const rowValues = entryData.RowValue;
            return parseRow(rowColumnInfo, rowValues);
        }
        // Column type is Scalar
        else {
            return parseScalarType(entryColumnInfo, entryData);
        }
    }

    function parseRow(columnInfo, row) {
        const data = row.Data;
        const parseResult = [];

        for (let i = 0; i < data.length; i++) {
            let entryColumnInfo = columnInfo[i];
            let entryData = data[i];
            parseResult.push(parseRowObject(entryColumnInfo, entryData));
        }

        return parseResult.join(", ")
    }

    function parseQueryResult(response) {
        const responseColumnInfo = response.ColumnInfo;
        const responseRows = response.Rows;

        let queryResult = [];

        responseRows.forEach(function (row) {
            queryResult.push(parseRow(responseColumnInfo, row));
        });

        setTimestreamQueryResult(queryResult);
    }

    async function submitTimestreamQuery(query, nextToken) {
        const params = new QueryCommand({
            QueryString: query
        });
        if (nextToken) {
            params.NextToken = nextToken;
        }

        setTimestreamQueryResult([]);

        await queryClient.send(params).then(
            (response) => {
                parseQueryResult(response);
                if (response.NextToken) {
                    submitTimestreamQuery(query, response.NextToken);
                }
            },
            (err) => {
                console.error("Error while querying:", err);
            });
    }

    return (
        <Card>
            <Heading level={4}>AWS Timestream Databases</Heading>
            <Card>
                <Flex justifyContent="center">
                    <Card alignSelf="flex-start">
                        <Heading level={6} paddingBottom="1rem">
                            AWS Timestream Databases & Tables
                        </Heading>
                        <Text>PowerElectronicsConditionMonitoringTimestreamDatabase</Text>
                        <Text>-</Text>
                        <Text>VoltageTimestreamTable</Text>
                        <Text>PowerTimestreamTable</Text>
                        <Text>TransformerTemperatureTimestreamTable</Text>
                        <Text>CapacitorTemperatureTimestreamTable</Text>
                        <Text>CoolingPlateWaterTemperatureTimestreamTable</Text>
                        <Text>AuxiliaryTimestreamTable</Text>
                    </Card>
                    <Card alignSelf="flex-start" width="36rem">
                        <Heading level={6}>
                            AWS Timestream Query
                        </Heading>
                        <TextAreaField
                            variation="quiet"
                            descriptiveText="Submit a query to execute on AWS Timestream Databases"
                            textAlign="left"
                            ref={timestreamQueryInputRef}
                            paddingBottom="1rem"
                        />
                        <Button
                            variation="primary"
                            type="submit"
                            height="2rem"
                            alignSelf="flex-end"
                            // ref={newSubscriptionTopicButtonRef}
                            onClick={() => submitTimestreamQuery(`${timestreamQueryInputRef.current.value}`, null)}>
                            Submit Query
                        </Button>
                    </Card>
                    <Card
                        key="query_result"
                        borderRadius="medium"
                        width="36rem"
                        wrap="wrap"
                        variation="outlined">
                        <ScrollView width="100%" height="200px" alignSelf="center">
                            {timestreamQueryResult.map(result => <p>{result}</p>)}
                        </ScrollView>
                    </Card>
                </Flex>
            </Card>
        </Card>
    )
}
