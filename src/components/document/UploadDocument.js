import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Typography } from "@mui/material";
import "./UploadDocument.css";

const UploadDocument = () => {
  const [documents, setDocuments] = useState([]);
  const [open, setDialogStatus] = useState(false);
  const [docTobeDeleted, setDocIdTobeDeleted] = useState({});
  //const [state, setState] = useState([]);
  useEffect(() => {
    fetchDocuments();
  }, []);

  const callUploadAPI = () => {
    var input = document.getElementById("myfile");
    console.log("inputFileElement.value", input.files[0]);
    var formdata = new FormData();
    formdata.append("file", input.files[0], input.files[0].name);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    axios
      .post("http://localhost:9003/files", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        document.getElementById("myfile").value = "";
        fetchDocuments();
        console.log(result);
      });
  };

  const fetchDocuments = () => {
    axios
      .get("http://localhost:9003/files")
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setDocuments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openDialog = (doc) => {
    setDocIdTobeDeleted(doc);
    setDialogStatus(true);
  };

  const deleteDocs = (id) => {
    axios
      .delete(`http://localhost:9003/files/delete/${id}`)
      .then((result) => {
        setDialogStatus(false);
        console.log(result);
        fetchDocuments();
      })
      .catch((err) => {
        console.log(err);
      });
    //  fetch(`http://localhost:9003/delete/${name}`, { method: 'DELETE', mode: 'no-cors' })
    //  .then(result => console.log(result));
  };
  const download = (id, name) => {
    axios
      .get(`http://localhost:9003/files/${id}`, { responseType: "blob" })
      .then((result) => {
        console.log(result);
        if (result) {
          const file = new Blob([result.data], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          var a = document.createElement("a");
          a.href = fileURL;
          a.download = name;
          document.body.appendChild(a);
          a.click();
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  const fileUpload = (event) => {
    //let changedFile = event.target.files[0];
    let uploadedFiles = event.target.files;
  };

  const handleClose = () => {
    setDialogStatus(false);
  };

  return (
    <div className="upload-doc-container">
      <h2>Upload Documents</h2>
      <div className="upload-doc-wrapper">
        <input
          className="primary-button"
          type="file"
          id="myfile"
          name="myfile"
          onChange={fileUpload}
          multiple
        />
        <button className="primary-button" onClick={() => callUploadAPI()}>Upload</button>
      </div>
      <h3>Documents:</h3>
      {documents.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.No.</TableCell>
                <TableCell>Name</TableCell>
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
                  <TableCell>
                    <Button color="secondary" onClick={() => openDialog(doc)}>
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      onClick={() => download(doc.id, doc.name)}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No records found</Typography>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete the document ${docTobeDeleted.name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once deleted canot be reverted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => deleteDocs(docTobeDeleted.id)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default UploadDocument;
