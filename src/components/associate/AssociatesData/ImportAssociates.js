import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { read, utils } from 'xlsx';
import CustomButton from '../../core/Button';
import '../../styles/associate.css';

const EXTENSIONS = ['xlsx', 'xls', 'csv']
const ImportAssociates = (props) => {
  const [colDefs, setColDefs] = useState();
  const [data, setData] = useState();

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
      </div>
      <div className='import-bottom'>
        <CustomButton clickHandler={() => props.setImportAssociateVisiblity(false)} label="Cancel" />
      </div>
    </div>
  );
}

export default ImportAssociates;
