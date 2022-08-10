import React from 'react';
import axios from 'axios';
import './UploadDocument.css';

export default class UploadDeleteDocComponent extends React.Component {

    fileUploaderRef;

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            disabled: false,
            changedFileIndex: -1,
        };
        this.fileUploaderRef = React.createRef();
    }

    fileUpload = (e) => {
        let changedFile = e.target.files[0];
        let uploadedFiles = e.target.files;

        if (this.state.changedFileIndex >= 0) {
            this.setState(prevState => {
                const list = [];
                prevState.files.map((file, i) => {
                    if (i === prevState.changedFileIndex)
                        list.push(changedFile);
                    else
                        list.push(file);
                });
                return {
                    files: list,
                    changedFileIndex: -1,
                };
            });
        } else if (this.state.files.length > 0) {
            this.setState(prevState => {
                return { files: [...prevState.files, ...uploadedFiles] }
            });
        } else
            this.setState({ files: [...e.target.files] });
    };

    Delete(name) {

        axios.delete(`http://localhost:9003/delete/${name}`)
            .then(result => {
                console.log(result)
                this.setState(prevState => {
                    const list = [];
                    prevState.files.map((file) => {
                        if (file.name !== name) {
                            list.push(file);
                        }
                    });
                    return {
                        files: list,
                        changedFileIndex: -1,
                    };
                });
            })
    }

    callUploadAPI() {
        var input = document.getElementById('file');
        console.log('inputFileElement.value', input.files[0]);
        var formdata = new FormData();
        formdata.append("file", input.files[0], input.files[0].name);

        axios.post("http://localhost:9003/uploadFile", formdata, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(result => console.log(result))
    }

    render() {
        return (
            <div className='mar-left-10'>
                <h2 className='mar-top-20'>Upload Documents</h2>
                
                    <div className='file-upload-wrapper' data-text="Select your file!">
                        <label>Insert Files:
                            <input type="file" id="file" ref={this.fileUploaderRef} onChange={this.fileUpload} />
                        </label>
                    </div>
                    <table>
                        <tbody>  
                            {
                                this.state.files.map((file, i) =>
                                    <tr key={i}>
                                        <td className='upload-doc' style={{ textAlign: "left" }}>{file.name} :</td>
                                        <td>
                                            <button className='upload-btn' onClick={() => this.callUploadAPI()}>Upload</button>
                                        </td>
                                        <td>
                                            <button className='delete-btn' onClick={() => this.Delete(file.name)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                
            </div>
        );
    }
}