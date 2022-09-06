import React, { useState, useEffect } from "react";
import axios from "axios";
import { userDetails } from "../../store"; 
import { useSelector } from "react-redux";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

import "./UploadDocument.css";


const SampleDocuments = () => {

    const [documents, setDocuments] = useState([]);
    const user = useSelector(userDetails);
  
    useEffect(() => {
        fetchDocuments();
      }, []);

    const fetchDocuments = () => {
    axios
        .get(`http://localhost:9003/files/sampledoc`)
        .then((res) => {
        setDocuments(res.data);
        })
        .catch((err) => {
        console.log(err);
        });
    };

    return (
        <div className="upload-doc-container">
          <div className="button-content">
            <div><h3>Sample Documents:</h3></div>
            <div className="content-right"><h3><a href="http://localhost:9003/files/sampledoc/zip" className="btn btn-primary">Download All</a></h3>
            </div>
          </div>
          <div>
          {documents.length > 0 ? (
              <div className="table-content">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>S.No.</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Document Type</TableCell>
                        <TableCell>Delete</TableCell>
                        <TableCell>Download</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {documents.map((doc, i) => (
                        <TableRow
                          key={i}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {i + 1}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {doc.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {doc.documentType.name}
                          </TableCell>
                          <TableCell>
                            {/* <Button color="secondary" onClick={() => openDialog(doc)}>
                              Delete
                            </Button> */}
                          </TableCell>
                          <TableCell>
                            {/* <Button
                              color="primary"
                              onClick={() => download(doc.id, doc.name)}
                            >
                              Download
                            </Button> */}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ) : (
              <Typography>No Records Exist</Typography>
            )}
          </div>
        </div>
      );
};
export default SampleDocuments;