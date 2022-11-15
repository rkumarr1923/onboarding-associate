import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { read, utils } from 'xlsx';
import { useSelector } from 'react-redux';
import CustomButton from '../../core/Button';
import axios from 'axios';
import '../../styles/associate.css';
import { token } from '../../../store';

const EXTENSIONS = ['xlsx', 'xls', 'csv']
const ImportAssociates = (props) => {
  const userToken = useSelector(token);
  const [colDefs, setColDefs] = useState();
  const [data, setData] = useState();
  const [newAssociates, setNewAssociates] = useState();

  const getExention = (file) => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    return EXTENSIONS.includes(extension) // return boolean
  }

  const convertToJson = (headers, data) => {
    const rows = []
    data.forEach(row => {
      let rowData = {}
      row.forEach((element, index) => {
        rowData[headers[index]] = element
      })
      rows.push(rowData)

    });
    return rows
  }

  const saveImportAssociates = (data) => {
    console.log('data to be saved ',data, props.list);
    const newAssociatesList = [];
    data.forEach(importAssociate => {
      let isNewAssociate = (props.list || []).find(existingAssociate => existingAssociate.ibmId === importAssociate["IBM Id"])
      if(!isNewAssociate) {
        newAssociatesList.push(importAssociate);
      }
    });
    setNewAssociates(newAssociatesList);

    let associatesPostReq = [];
    newAssociatesList.forEach(associateInput => {
      let associateData = {
        associate: {
          associateName: associateInput["Associate First Name"] +" "+ associateInput["Associate Last Name"],
          ibmId: associateInput["IBM Id"],
          projectId: associateInput["Project Id"],
          engagementName: associateInput["Engagement Name"],
          majorFunction: associateInput["Major Function"],
          band: associateInput["Band"],
          primaryContact: associateInput["Primary Contact"],
          emailIbm: associateInput["IBM Email"],
          emailPru: associateInput["Client Email"],
          xid: associateInput["XID"],
          prudentialManager: associateInput["Client Manager"],
          endDate: associateInput["End Date"],
          location: associateInput["Location"],
          city: associateInput["City"],
          billType: associateInput["Bill Type"],
          billCode: associateInput["Bill Code"],
          role: associateInput["Role"],
          asOnDate: associateInput["As On Date"],
          pruExpDate: associateInput["Client Exp Date"],
          itExpDate: associateInput["IT Experience"],
          ibmDate: associateInput["IBM Experience"],
          experienceWithPru: associateInput["Total Experience With Client"],
          careerExperience: associateInput["Total Career Experience"],
          experienceWithIbm: associateInput["Total Experience With IBM"],
          resourceCriticality: associateInput["Resource Criticality"],
          atImmigrationVisaRisks: associateInput["Other"],
          backupSuccessorResource: associateInput["Other"],
          keyContingencyGroup: associateInput["Other"],
          additionalContingency: associateInput["Other"],
          visaType: associateInput["Other"],
          workPermitValidUntil: associateInput["Other"],
          extensionUpdates: associateInput["Other"],
          visaMaxOutDate: associateInput["Other"],
          timeLeftInUs: associateInput["Other"],
          h1bNominations: associateInput["Other"],
          riskMitigationComments: associateInput["Other"],
          planInCaseOfExtensionAmendmentRejection:
          associateInput["Other"],
            skillset: "Test"
        },
        associateSkill: [
          {
              associateSkillId:2,
              associateId:13,
              skillId:3,
              skillRating:"skillRating"
          }
      ]
      };
      associatesPostReq.push(associateData);
    });
    const response = axios.post(
      'http://localhost:9092/pru-associate/save-all-associate',
      associatesPostReq, {
        headers: { Authorization: 'Bearer ' + userToken },
      }
    );
    props.setImportAssociateVisiblity(false);
  }

  const importExcel = (e) => {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onload = (event) => {
      //parse data

      const bstr = event.target.result
      const workBook = read(bstr, { type: "binary" })

      //get first sheet
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]
      //convert to array
      const fileData = utils.sheet_to_json(workSheet, { header: 1 })
      // console.log(fileData)
      const headers = fileData[0]
      const heads = headers.map(head => ({ title: head, field: head }))
      setColDefs(heads)

      //removing header
      fileData.splice(0, 1)


      setData(convertToJson(headers, fileData))
    }

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file)
      }
      else {
        alert("Invalid file input, Select Excel, CSV file")
      }
    } else {
      setData([])
      setColDefs([])
    }
  }

  return (
    <div className='import-associate-container'>
      <div className='d-flex-space import-top'>
        <div className="import-header">
          <h4>Import Data from Excel, CSV in Table</h4>
        </div>
        <div className='import-file'>
          <input className="primary-button" type="file" onChange={importExcel} />
        </div>
      </div>
      <hr/>
      <div className='import-table'>
        {data && colDefs && <MaterialTable title="Associate Data" data={data} columns={colDefs} />}
      <div className='import-bottom'>
        {data && colDefs && 
        <CustomButton clickHandler={() => saveImportAssociates(data)} label="Submit" />}
        <CustomButton clickHandler={() => props.setImportAssociateVisiblity(false)} label="Cancel" />
      </div>
      </div>
    </div>
  );
}

export default ImportAssociates;
