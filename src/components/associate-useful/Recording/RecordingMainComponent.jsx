import React, { useState } from 'react';
import RecordingList from './RecordingList';
import { recordingData } from "../../../json/recordingData";
import AddRecording from './AddRecording';
import EditRecording from './EditRecording';
import { Grid } from "@mui/material";
const RecordingMainComponent = () => {
    const initialFormState = { recordingId: '', recordingDescription: '', link: '', password: '' };
    const [recordings, setRecordings] = useState(recordingData);
    const [editing, setEditing] = useState(false);
    const [currentRecording, setCurrentRecording] = useState(initialFormState);
    // Add recording...
    const addRecording = (recording) => {
        recording.recordingId = recordings.length + 1;
        setRecordings([...recordings, recording]);
    };
    // delete recordings...
    const deleteRecording = (recordingId) => {
        setRecordings(recordings.filter((recording) => recording.recordingId !== recordingId));
    };
    // set value for edit recording form...
    const editRecording = (recording) => {
        setEditing(true);
        setCurrentRecording({
            recordingId: recording.recordingId,
            recordingDescription: recording.recordingDescription,
            link: recording.link,
            password: recording.password
        });
    };
    //  update recording
    const updateRecording = (recordingId, updatedRecording) => {
        setEditing(false);
        console.log(recordingId, 'idd');
        setRecordings(recordings.map((item) => { console.log(item.recordingId); return (item.recordingId === recordingId ? updatedRecording : item); }));
    };
    return (<div className="checklist-container">
            <div className="row">
                <Grid container direction="row" style={{ backgroundColor: "white" }} className="pt-3">
                    {editing ? (<div>
                            <h2 style={{ textAlign: "center" }}>Edit Recording</h2>
                            <div>
                                <EditRecording editing={editing} setEditing={setEditing} currentRecording={currentRecording} updateRecording={updateRecording}/>
                            </div>
                        </div>) : (<div>
                            <h2 style={{ textAlign: "center" }}>Recording</h2>
                            <div>
                                <AddRecording addRecording={addRecording}/>
                            </div>
                        </div>)}

                    
                        <div>
                            <RecordingList recordings={recordings} editRecording={editRecording} deleteRecording={deleteRecording}/>
                        </div>
                </Grid>
            </div>
        </div>);
};
export default RecordingMainComponent;