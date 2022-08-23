import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './UploadDocument.css';
import Alert from '@mui/material/Alert';

const UploadDocument = () => {

    const [documents, setDocuments] = useState([]);
    //const [state, setState] = useState([]);
    useEffect(() => {
        fetchDocuments()
    }, []);

<<<<<<< Updated upstream
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            disabled: false,
            changedFileIndex: -1,
            data: [],
            errorMessage: null,
            isSuccess:null
        };
        this.fileUploaderRef = React.createRef();
    }

    fileUpload = (e) => {
        this.setState({ errorMessage: null });
        this.setState({ isSuccess: null });
        for(var i=0;i<e.target.files.length;i++){
        var filename=e.target.files[i];
        this.state.files.push({fileName:filename,Status:"",downloadUri:""})
        }
        let changedFile = e.target.files[0];
        let uploadedFiles = e.target.files;

        // if (this.state.changedFileIndex >= 0) {
        //     this.setState(prevState => {
        //         const list = [];
        //         prevState.files.map((file, i) => {
        //             if (i === prevState.changedFileIndex)
        //                 list.push(changedFile);
        //             else
        //                 list.push(file);
        //         });
        //         return {
        //             files: list,
        //             changedFileIndex: -1,
        //         };
        //     });
        // } else if (this.state.files.length > 0) {
        //     this.setState(prevState => {
        //         return { files: [...prevState.files, ...uploadedFiles] }
        //     });
        // } else
        //     this.setState({ files: [...e.target.files] });
    };

    Delete(name) {

        axios.delete(`http://localhost:9003/delete/${name}`)
            .then(result => {
                console.log(result)
                this.setState(prevState => {
                    const list = [];
                    prevState.files.map((file) => {
                        if (file.fileName.name !== name) {
                            list.push(file);
                        }
                    });
                    return {
                        files: list,
                        changedFileIndex: -1,
                    };
                });
                this.setState(prevState => {
                    if(prevState.files.length === 0){
                        this.setState({ errorMessage: null });
                        this.setState({ isSuccess: null }); 
                    }  
                });
                
                
            })
    }
    
    download(downloadUri,name) {
        axios.get(`http://localhost:9003${downloadUri}`,{responseType : 'blob'})
            .then(result => {
                
                console.log(result)
                if(result){
                this.setState({ errorMessage: null });
                this.setState({ isSuccess: `${name}: File download Success` });
                const file = new Blob([result.data], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                var a         = document.createElement('a');
                a.href        = fileURL; 
                a.download    = name;
                document.body.appendChild(a);
                a.click();
                }
            })
            .catch(error => {
                this.setState({ errorMessage: "File download Failed" });
                this.setState({ isSuccess: null });
                console.error('There was an error!', error);
            });
    }

    callUploadAPI(file,idx) {
        //var input = document.getElementById('file');
        //console.log('inputFileElement.value', input.files[0]);
=======
    const callUploadAPI = () => {

        var input = document.getElementById('myfile');
        console.log('inputFileElement.value', input.files[0]);
>>>>>>> Stashed changes
        var formdata = new FormData();
        formdata.append("file", file.fileName,file.fileName.name );

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        axios.post("http://localhost:9003/uploadFile", formdata, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
<<<<<<< Updated upstream
            .then(result => {
                if(result){
                    this.state.files[idx].Status="Success";
                    this.state.files[idx].downloadUri=result.data.downloadUri;
                    this.setState({ files: [...this.state.files] });
                }else{
                    this.state.files[idx].Status="Failed";
                    this.state.files[idx].downloadUri="";
                    this.setState({ files: [...this.state.files] });
                }
                console.log(result)
            }
                )
    }

    render() {
        const { files } = this.state;
        const { errorMessage } = this.state;
        const { isSuccess } = this.state;
        return (
            <div className='mar-left-10'>
                <h2>Upload Documents</h2>
                

                    <div className='file-upload-wrapper' data-text="Select your file!">
                        <label>
                            <input type="file" multiple id="file" ref={this.fileUploaderRef} onChange={this.fileUpload} />
                        </label>
                    </div>
                    {errorMessage ?  (
                    <Alert variant="filled" severity="error">
                    Error message: {errorMessage}
                    </Alert>
                    ) : null} 
                    { isSuccess ?  (
                    <Alert variant="filled" severity="success">
                     {isSuccess}
                    </Alert>
                    ) : null}                   
                    <h3>Documents:</h3>
                    <table>
                        <tbody>
                            {
                                files.map((file, i) =>
                                    <tr key={i}>
                                        <td style={{ textAlign: "left" }}>{file.fileName.name} :&nbsp;&nbsp;</td>
                                        <td>
                                            <button   onClick={() => this.callUploadAPI(file,i)}>Upload</button>
                                        </td>
                                        <td>
                                            <button   onClick={() => this.Delete(file.fileName.name,i)}>Delete</button>
                                        </td>
                                        <td>
                                            <button   onClick={() => this.download(file.downloadUri,file.fileName.name)}>download</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                
            </div>
        );
=======
            .then(result => console.log(result))

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
>>>>>>> Stashed changes
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