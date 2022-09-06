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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import "./UploadDocument.css";
import { Typography } from "@mui/material";
import SelectBox from "../core/Select";
import { userDetails } from "../../store"; 
import { useSelector } from "react-redux";

const UploadDocument = () => {
  const [documents, setDocuments] = useState([]);
  const [open, setDialogStatus] = useState(false);
  const [docTobeDeleted, setDocIdTobeDeleted] = useState({});
  const [openSnakBar, setSnakBarOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [options, setOptions] = useState([]);
  const [optionselect, setOptionselect] = useState('');
  const [inputfile, setInputfile] = useState(false);
  const [docTobeUpdate, setDocTobeUpdate] = useState({});
  const [openUpdate, setUpdateDialogStatus] = useState(false);
  const user = useSelector(userDetails);
  
  useEffect(() => {
    fetchDocuments();
    fetchDocumentTypes();
  }, []);

  const callUploadAPI = () => {
    var input = document.getElementById("myfile");
    //console.log("inputFileElement.value", input.files[0]);
    var formdata = new FormData();
    formdata.append("file", input.files[0], input.files[0].name);
    formdata.append("document_type", optionselect);
    formdata.append("employeeId", user.empId);
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
        updateDialogClose();
        setSnakBarOpen(true);
        setUploadStatus(true);
        //document.getElementById("myfile").value = "";
        fetchDocuments();
        resetFields();
        //console.log(result);
      })
      .catch((error) => {
        setSnakBarOpen(true);
        setUploadStatus(false);
        console.log("Error while uploading", error);
      });
  };

  const fetchDocuments = () => {
    const id = user.empId;
    axios
      //.get(`http://localhost:9003/files`)
      .get(`http://localhost:9003/files/employee/${id}`)
      .then((res) => {
        //console.log(res);
        //console.log(res.data);
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
        //console.log(result);
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
        //console.log(result);
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
    setInputfile(true);
  };

  const handleClose = () => {
    setDialogStatus(false);
  };

  const handleSnackClose = () => {
    setSnakBarOpen(false);
  };

  const fetchDocumentTypes = () => {
    axios
        .get('http://localhost:9003/document')
        .then((res) => {
            setOptions([...res.data]);
            setOptionselect('1');

        })
        .catch((err) => {
            console.log(err);
        });
  }

  const optionChanged = (childData) =>{
    setOptionselect(childData);
  }

  const resetFields = () =>{
    document.getElementById("myfile").value = "";
    setOptionselect('1');
    setInputfile(false);
  }

  const openUpdateDialog = () => {
    const updateFileName = document.getElementById("myfile").files[0].name;
    const filteredObj = documents.filter(obj => (obj.name===updateFileName && obj.documentType.id===parseInt(optionselect)));
    if(filteredObj && filteredObj.length>0){
      setDocTobeUpdate(filteredObj[0]);
      setUpdateDialogStatus(true);
    } else {
      callUploadAPI();
    }
  };

  const updateDialogClose = () => {
    setUpdateDialogStatus(false);
  };

  return (
    <div className="upload-doc-container">
      <h2>Upload Documents</h2>
      <div className="input-fieldbox">
        <div className="input-select"> Document Type:&nbsp;
          <SelectBox options={options}  onOptionChanged={optionChanged} optionselect={optionselect} />
        </div> &nbsp;
        <div className="file-upload-wrapper" data-text="Select your file!">
          <label htmlFor="myfile">
            <input className="input-field"
              onChange={fileUpload}
              id="myfile"
              name="myfile"
              type="file"
            />
          </label> &nbsp;
          <Button color="primary" variant="contained" component="span" onClick={() => openUpdateDialog()} disabled={!((optionselect!=='1') && inputfile)}>
              Upload
            </Button>
        </div>
      </div>
      <h3>Documents:</h3>
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
        </div>
      ) : (
        <Typography>No Records Exist</Typography>
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

      <Dialog
        open={openUpdate}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to update the document ${docTobeUpdate.name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once updated canot be reverted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={updateDialogClose}>Cancel</Button>
          <Button onClick={() => callUploadAPI()} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnakBar}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity={uploadStatus ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {uploadStatus ? "File uploaded successfully!" : "File upload failed!"}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default UploadDocument;
