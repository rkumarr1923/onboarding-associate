import React, { useState, useEffect } from "react";
import Upload from "./components/Upload";
import DocumentTable from "./components/DocumentTable";
import axios from "axios";

const UploadDocument = () => {  
  const [documents, setDocuments] = useState([]);
  const fetchDocuments = () => {  
    axios
      .get("http://localhost:9003/files")
      .then((res) => {
        setDocuments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="main">
      <h2>Upload Documents</h2>
      <Upload docs={documents} onDocChange={fetchDocuments} />
      <h3>Documents:</h3>
      <DocumentTable docs={documents} onDocChange={fetchDocuments} />
    </div>
  );
};
export default UploadDocument;
