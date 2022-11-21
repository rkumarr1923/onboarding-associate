import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { associates, token, userDetails } from '../../store';
import CommentComponent from '../comment/CommentComponent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const AssociateDetails = () => {
  const location = useLocation();
  const associateListDetails = useSelector(associates);
  const userToken = useSelector(token);
  const user = useSelector(userDetails);
  const { forAssociate } = location.state;
  const tableHeader = ['Name', 'Value'];
  const assoDetail = associateListDetails.find(
    (associate) => associate.ibmId == forAssociate.data
  );
  const empId = forAssociate.data;
  const downloadDocsForAsso = () => {
    const userId = user.empId;
    const url = `http://localhost:9003/files/reviewer/${userId}/employee/${empId}/zip`;
    axios
      .get(url, {
        headers: { Authorization: 'Bearer ' + userToken },
        responseType: 'blob',
      })
      .then((result) => {
        if (result) {
          const file = new Blob([result.data], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          var a = document.createElement('a');
          a.href = fileURL;
          a.download = 'Onboarding_' + empId + '.ZIP';
          document.body.appendChild(a);
          a.click();
        }
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/allAssociates', { replace: true });
  };
  return (
    <>
      <div style={{ padding: '20px 20px 0 20px' }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={handleClick}
        >
          Back
        </Button>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          style={{ paddingTop: '10px' }}
        >
          <Grid item xs={12} md={6}>
            <h2>Associate details:</h2>
            <Box style={{ maxHeight: '65vh', overflow: 'auto' }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {tableHeader &&
                        tableHeader.map((header) => {
                          return (
                            <TableCell key={header}>
                              <Typography variant="span">
                                <strong>{header}</strong>
                              </Typography>
                            </TableCell>
                          );
                        })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(assoDetail).map((key) => {
                      return (
                        <TableRow key={key}>
                          <TableCell>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </TableCell>
                          <TableCell>{assoDetail[key]}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="column" columnSpacing={2}>
              <Grid item xs={12} md={6}>
                <Box style={{ maxHeight: '15vh' }}>
                  <div style={{ padding: '20px 20px 130px 20px' }}>
                    Files uploaded by associate. Download below.
                    <div className="download-icon">
                      <i
                        title="Download All"
                        className="fa fa-download"
                        onClick={() => downloadDocsForAsso()}
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <h2 style={{ paddingLeft: '20px' }}>Comment</h2>
                <Box style={{ maxHeight: '50vh', overflow: 'auto' }}>
                  <CommentComponent empId={empId} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AssociateDetails;
