import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './UploadDocument.css';

const UploadDocument = () => {

    const [documents, setDocuments] = useState([]);
    //const [state, setState] = useState([]);
    useEffect(() => {
        fetchDocuments()
    }, []);

    const callUploadAPI = () => {

        var input = document.getElementById('myfile');
        console.log('inputFileElement.value', input.files[0]);
        var formdata = new FormData();
        formdata.append("file", input.files[0], input.files[0].name);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        axios.post("http://localhost:9003/files", formdata, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(result => {
                document.getElementById('myfile').value = '';
                fetchDocuments();
                console.log(result)
            })

    }

    const fetchDocuments = () => {
        axios
            .get('http://localhost:9003/files')
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setDocuments(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteDocs = (id) => {
        axios.delete(`http://localhost:9003/files/delete/${id}`)
             .then(result => {
                console.log(result)
                fetchDocuments()
             })
             .catch((err) => {
                console.log(err);
            });
        //  fetch(`http://localhost:9003/delete/${name}`, { method: 'DELETE', mode: 'no-cors' })
        //  .then(result => console.log(result));
    }


    const fileUpload = (event) => {
        //let changedFile = event.target.files[0];
        let uploadedFiles = event.target.files;
    }

    return (
        <div className='mar-left-10'>
            <h2>Upload Documents</h2>
            <div className='file-upload-wrapper' data-text="Select your file!">

                <input type="file" id="myfile" name="myfile" onChange={fileUpload} multiple />
                <button onClick={() => callUploadAPI()}>Upload</button>

            </div>
            <h3 className='bold'>Uploaded Documents:</h3>
            <table className="filesName">
                <tbody>
                    {
                        documents.map((doc, i) => {
                            return <tr key={i}>
                                <td style={{ textAlign: "left" }}>{doc.name} :</td>
                                <td>
                                    <button onClick={() => deleteDocs(doc.id)}>Delete</button>
                                </td>
                            </tr>
                        })}
                </tbody>
            </table>

        </div>

    )
}
export default UploadDocument