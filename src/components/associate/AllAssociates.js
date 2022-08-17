import React from 'react';
import { AgGridReact } from "ag-grid-react";
import Button from '@mui/material/Button';
import DTPicker from "../associate/DatePicker/DTPicker";
import { allAssociates } from "../associate/DatePicker/all-associates-data";
import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/associate.css';


const AllAssociates = () => {

    const [gridColumnApi, setGridColumnApi] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const [gridApi, setGridApi] = useState([]);
    const [tableValues] = useState(allAssociates);
    const [dataSet] = useState([
        { id: 1, eventTimestamp: '2020-10-25T04:34:21Z' },
        { id: 2, eventTimestamp: '2020-04-23T20:21:55Z' },
        { id: 3, eventTimestamp: '2020-05-01T16:16:38Z' },
        { id: 4, eventTimestamp: '2020-11-24T22:10:03Z' },
        { id: 5, eventTimestamp: '2020-08-10T13:52:03Z' },
        { id: 6, eventTimestamp: '2020-10-18T18:49:19Z' },
        { id: 7, eventTimestamp: '2020-11-30T00:51:26Z' },
        { id: 8, eventTimestamp: '2020-03-28T13:30:51Z' },
        { id: 9, eventTimestamp: '2020-12-18T12:39:26Z' },
        { id: 10, eventTimestamp: '2020-03-13T18:39:02Z' },
        { id: 11, eventTimestamp: '2021-02-13T15:03:47Z' },
        { id: 12, eventTimestamp: '2020-03-11T14:03:56Z' },
        { id: 13, eventTimestamp: '2021-01-14T06:38:59Z' },
        { id: 14, eventTimestamp: '2020-08-17T06:50:21Z' },
        { id: 15, eventTimestamp: '2020-04-03T18:34:12Z' },
        { id: 16, eventTimestamp: '2020-08-08T19:21:06Z' },
        { id: 17, eventTimestamp: '2020-10-25T18:24:39Z' },
        { id: 18, eventTimestamp: '2020-03-12T14:45:03Z' },
        { id: 19, eventTimestamp: '2021-01-11T12:45:54Z' },
        { id: 20, eventTimestamp: '2020-03-22T09:37:58Z' },
    ]);

    useEffect(() => {
        axios
            .get(
                "http://localhost:9191/pru-associate/get-all-associates"
            )
            .then(result => {
                console.log(result.data)
                setServiceData(result.data)
            }).catch(error => console.log(error))

    }, [])

    useEffect(() => {

        const formattedData = tableValues.map((data) => {
            return {
                associateName: data.associateName,
                ibmId: data.ibmId,
                emailIBM: data.emailIBM,
                location: data.location,
                role: data.role,
                primaryContact: data.primaryContact,
                itExpDate: new Date(data.itExpDate)
            };
        });
        console.log("Formatted Data", formattedData)
        setServiceData(formattedData);
    }, []);

    useEffect(() => {
        console.log("gridApi", gridApi);
    });

    const resetAppliedFilters = () => {
        gridApi.setFilterModel(null);
    };

    const cols = [
        {
            field: "associateName",
            headerName: "Associate Name",
            cellStyle: { textAlign: 'center' },
            minWidth: 100,
            maxWidth: 150
        },
        {
            field: "ibmId",
            headerName: "IBM  Id",
            cellStyle: { textAlign: 'center' },
            minWidth: 100,
            maxWidth: 150
        },
        {
            field: "emailIBM",
            headerName: "Email IBM",
            cellStyle: { textAlign: 'center' },
            minWidth: 100,
            maxWidth: 150
        },
        {
            field: "location",
            headerName: "Location",
            cellStyle: { textAlign: 'center' },
            minWidth: 100,
            maxWidth: 150
        },
        {
            field: "role",
            headerName: "Role",
            cellStyle: { textAlign: 'center' },
            minWidth: 100,
            maxWidth: 150
        },
        {
            field: "primaryContact",
            headerName: "Primary Contact",
            cellStyle: { textAlign: 'center' },
            minWidth: 100,
            maxWidth: 175
        },
        {
            field: "itExpDate",
            headerName: "IT Exp Date",
            cellStyle: { textAlign: 'center' },
            minWidth: 250,
            maxWidth: 300,
            filter: "agDateColumnFilter",
            filterParams: {
                defaultOption: "inRange",
                comparator: function (filterLocalDate, cellValue) {
                    filterLocalDate = new Date(filterLocalDate)
                    cellValue = new Date(cellValue)
                    let filterBy = filterLocalDate.getTime();
                    let filterMe = cellValue.getTime();
                    if (filterBy === filterMe) {
                        return 0;
                    }
                    if (filterMe < filterBy) {
                        return -1;
                    }
                    if (filterMe > filterBy) {
                        return 1;
                    }
                    else { return }
                }
            }
        }
    ];

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        params.api.addGlobalListener((type, event) => {
            switch (type) {
                case "filterChanged":
                    console.log(event);
                    return;
                default:
                    return null;
            }
        });
    };

    return (
        <>
            <div className='associate-table-container'>
                <div className='associate-table-header'>
                    <h2>All Associates</h2>
                    <Button className='reset-filter' onClick={resetAppliedFilters} variant="outlined">
                        Reset Filters
                    </Button>
                </div>
                <hr />
                <div
                    className="ag-theme-alpine all-associate-table"
                    style={{ height: "86vh", width: "100%" }}
                >
                    <AgGridReact
                        onGridReady={onGridReady}
                        rowData={serviceData}
                        rowSelection="multiple"
                        defaultColDef={{
                            flex: 1,
                            minWidth: 100,
                            cellStyle: { textAlign: 'center' },
                            resizable: true,
                            sortable: true,
                            filter: true,
                            filterParams: {
                                buttons: ['apply', 'clear', 'reset'],
                            },
                        }}
                        pagination
                        columnDefs={cols}
                        frameworkComponents={{
                            agDateInput: DTPicker
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default AllAssociates;