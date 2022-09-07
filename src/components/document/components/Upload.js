import React, {useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import "./../UploadDocument.css";
import SelectBox from "../../core/Select";

const Upload = ({ docs, onDocChange }) => {
  const [openSnakBar, setSnakBarOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [options, setOptions] = useState([]);
  const [optionselect, setOptionselect] = useState('');
  const [inputfile, setInputfile] = useState(false);
  
  useEffect(() => {
    fetchDocumentTypes();
  }, []);

 const callUploadAPI = () => {
    var input = document.getElementById("myfile");
    var formdata = new FormData();
    formdata.append("file", input.files[0], input.files[0].name);
    formdata.append("document_type", optionselect);
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
        //updateDialogClose();
        setSnakBarOpen(true);
        setUploadStatus(true);
        onDocChange();
        resetFields();
      })
      .catch((error) => {
        setSnakBarOpen(true);
        setUploadStatus(false);
        console.log("Error while uploading", error);
      });
  };
  
  const fileUpload = (event) => {
    //let changedFile = event.target.files[0];
    let uploadedFiles = event.target.files;
    setInputfile(true);
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
    const filteredObj = docs.filter(obj => obj.name===updateFileName);
    if(filteredObj && filteredObj.length>0){
      //setDocTobeUpdate(filteredObj[0]);
      //setUpdateDialogStatus(true);
    } else {
      callUploadAPI();
    }
  };
  

  return (
    <div>
      <div className="input-select"> Document Type:&nbsp;
        <SelectBox options={options}  onOptionChanged={optionChanged} optionselect={optionselect} />
      </div>
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
export default Upload;
