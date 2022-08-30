import React from 'react';
import { AgGridReact } from "ag-grid-react";
import Button from '@mui/material/Button';
import DTPicker from "../associate/DatePicker/DTPicker";
import { allAssociates } from "../associate/DatePicker/all-associates-data";
import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/associate.css';


const AllAssociates = () => {

    const [serviceData, setServiceData] = useState([]);
    const [gridApi, setGridApi] = useState([]);
    const [tableValues] = useState(allAssociates);

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
                itExpDate: new Date(data.itExpDate),
                status: data.onBoardingAssociateStatus
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
            cellStyle: { textAlign: '' },
            minWidth: 100,
            maxWidth: 150
        },
        {
            field: "ibmId",
            headerName: "IBM  Id",
            cellStyle: { textAlign: '' },
            minWidth: 75,
            maxWidth: 120
        },
        {
            field: "emailIBM",
            headerName: "Email IBM",
            cellStyle: { textAlign: '' },
            minWidth: 100,
            maxWidth: 170
        },
        {
            field: "location",
            headerName: "Location",
            cellStyle: { textAlign: '' },
            minWidth: 100,
            maxWidth: 120
        },
        {
            field: "role",
            headerName: "Role",
            cellStyle: { textAlign: '' },
            minWidth: 100,
            maxWidth: 100
        },
        {
            field: "primaryContact",
            headerName: "Primary Contact",
            cellStyle: { textAlign: '' },
            minWidth: 100,
            maxWidth: 155
        },
        {
            field: "itExpDate",
            headerName: "IT Exp Date",
            cellStyle: { textAlign: '' },
            minWidth: 250,
            maxWidth: 250,
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
        },
        {
            field: "status",
            headerName: "Status",
            cellStyle: { textAlign: '' },
            cellClass: params => onBoardStatus(params.data.status),
            minWidth: 100,
            maxWidth: 175
        },
    ];

    const onGridReady = (params) => {
        setGridApi(params.api);
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

    const onBoardStatus = (status) => {
        switch (status) {
            case 'Yet to be started':
                return 'associate-yet-to-be-started';
            case 'In progress':
                return 'associate-in-progress';
            case 'Under review':
                return 'associate-under-review';
            case 'Back in progress':
                return 'associate-back-in-progress';
            case 'Completed':
                return 'associate-completed';
            case 'Waiting':
                return 'associate-waiting';
            case 'Blocked':
                return 'associate-blocked';
            default:
                return 'associate-in-progress';
        }
    }

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