import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField,
    Grid,
    Button,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import React from "react";
  import { recordings } from "../../../json/recordings";
  
  const tableInputHeader = ["Recording Description", "Recording Link", "Password"];
  
  const RecordingList = () => {
    return (
      <>
        <TableContainer>
          
          <Table>
            <TableHead>
            <TableRow>
              {tableInputHeader &&
                  tableInputHeader.map((header) => {
                    return (
                      <TableCell key={header}>
                        <Typography variant="span">
                          <strong>{header}</strong>
                        </Typography>
                        <TextField
                          variant="outlined"
                          id="recordingDesc"
                          style={{ width: "80%" }}
                          size="small"
                        />
                      </TableCell>
                    );
                  })}
                  <Grid item xs={12}>
                    <Box sx={{ mt: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Add
                        </Button>
                      </div>
                    </Box>
                  </Grid>
              </TableRow>
            </TableHead>
            <TableBody>
              {recordings &&
                recordings.map((tableValue) => {
                  return (
                    <TableRow key={tableValue.id}>
                      <TableCell>{tableValue.recordingDescription}</TableCell>
                      <TableCell><a target="_blank" href={tableValue.link} >{tableValue.link}</a> <br/>
                      Password : {tableValue.password}</TableCell>
                      <TableCell>
                        <Button type='submit'
                            variant="contained"
                            size="small"
                        >
                            Edit
                        </Button>
                        <Button type='submit'
                            variant="contained"
                            size="small"
                            color="error"
                            
                        >
                            Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };
  
  export default RecordingList;