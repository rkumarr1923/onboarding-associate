import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import DTPicker from '../associate/DatePicker/DTPicker';
import AddNewAssociate from '../associate/AddNewAssociate';
import { useState, useEffect } from 'react';
import '../styles/associate.css';
import { Link } from 'react-router-dom';
import { useFetchAssociate } from '../../services/hooks/useFetchAssociate';
import { useDispatch } from 'react-redux';
import { associateList, associates } from '../../store';
import { useSelector } from 'react-redux';

const AllAssociates = () => {
  const [isFormVisible, setFormVisiblity] = useState(null);
  const [associateData, setAssociateData] = useState(null);
  const [gridApi, setGridApi] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const { data, error, loading } = useFetchAssociate();
  const associateListDetails = useSelector(associates);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && data) {
      let formattedData = data.map((data) => {
        let associate = data.associate;
        return {
          associateName: associate.associateName,
          ibmId: associate.ibmId,
          emailIBM: associate.emailIbm,
          location: associate.location,
          role: associate.role,
          primaryContact: associate.primaryContact,
          itExpDate: associate.itExpDate, // new Date(associate.itExpDate)
          status: associate.activeInactive,
        };
      });
      console.log('formatted data ', formattedData);
      dispatch(associateList({ associateList: formattedData }));
      setFormattedData(formattedData);
    }
  }, [loading]);

  const resetAppliedFilters = () => {
    gridApi.setFilterModel(null);
  };

  const editAssociate = (data) => {
    const assoDetail = associateListDetails.find(
      (associate) => associate.ibmId == data.ibmId
    );
    setFormVisiblity(true);
    setAssociateData(assoDetail);
  };

  const cols = [
    {
      field: 'associateName',
      headerName: 'Associate Name',
      cellStyle: { textAlign: '' },
      minWidth: 100,
      maxWidth: 150,
    },
    {
      field: 'ibmId',
      headerName: 'IBM  Id',
      cellStyle: { textAlign: '' },
      minWidth: 75,
      maxWidth: 120,
      cellRenderer: (params) => {
        return (
          <Link
            to={'/user/' + params.data.ibmId}
            state={{ forAssociate: { data: params.data.ibmId } }}
          >
            {params.data.ibmId}
          </Link>
        );
      },
    },
    {
      field: 'emailIBM',
      headerName: 'Email IBM',
      cellStyle: { textAlign: '' },
      minWidth: 100,
      maxWidth: 170,
    },
    {
      field: 'location',
      headerName: 'Location',
      cellStyle: { textAlign: '' },
      minWidth: 100,
      maxWidth: 120,
    },
    {
      field: 'role',
      headerName: 'Role',
      cellStyle: { textAlign: '' },
      minWidth: 100,
      maxWidth: 100,
    },
    {
      field: 'primaryContact',
      headerName: 'Primary Contact',
      cellStyle: { textAlign: '' },
      minWidth: 100,
      maxWidth: 155,
    },
    {
      field: 'itExpDate',
      headerName: 'IT Exp Date',
      cellStyle: { textAlign: '' },
      minWidth: 250,
      maxWidth: 250,
      filter: 'agDateColumnFilter',
      filterParams: {
        defaultOption: 'inRange',
        comparator: function (filterLocalDate, cellValue) {
          filterLocalDate = new Date(filterLocalDate);
          cellValue = new Date(cellValue);
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
          } else {
            return;
          }
        },
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      cellStyle: { textAlign: '' },
      cellClass: (params) => onBoardStatus(params.data.status),
      minWidth: 100,
      maxWidth: 175,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      cellStyle: { textAlign: '' },
      minWidth: 40,
      maxWidth: 100,
      cellRenderer: (params) => {
        return (
          <Link
            to="/uploadDocuments"
            state={{ forAssociate: { empId: params.data.ibmId } }}
          >
            <div>
              <i
                title="Upload Document"
                className="fa fa-upload"
                aria-hidden="true"
              ></i>
            </div>
          </Link>
        );
      },
    },
    {
      field: 'edit',
      headerName: 'Edit',
      cellStyle: { textAlign: '' },
      minWidth: 100,
      maxWidth: 175,
      cellRenderer: (params) => {
        return (
          <Button
            type="submit"
            variant="contained"
            className="reset-filter"
            onClick={() => {
              editAssociate(params.data);
            }}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.addGlobalListener((type, event) => {
      switch (type) {
        case 'filterChanged':
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
  };

  return (
    <>
      {isFormVisible ? (
        <AddNewAssociate
          setFormVisiblity={setFormVisiblity}
          associateData={associateData}
        ></AddNewAssociate>
      ) : (
        <div className="associate-table-container">
          <div className="associate-table-header">
            <h2>All Associates</h2>
            <Button
              className="reset-filter"
              onClick={resetAppliedFilters}
              variant="outlined"
            >
              Reset Filters
            </Button>
          </div>
          <hr />
          <div
            className="ag-theme-alpine all-associate-table"
            style={{ height: '86vh', width: '100%' }}
          >
            <AgGridReact
              onGridReady={onGridReady}
              rowData={formattedData}
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
                agDateInput: DTPicker,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AllAssociates;
