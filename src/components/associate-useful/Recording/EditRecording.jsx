import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, } from "@mui/material";
const EditRecording = (props) => {
    const [recording, setRecording] = useState(props.currentRecording);
    useEffect(() => {
        setRecording(props.currentRecording);
    }, [props]);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRecording({ ...recording, [name]: value });
    };
    return (<form onSubmit={event => {
            event.preventDefault();
            if (!recording.recordingDescription || !recording.link || !recording.password)
                return;
            props.updateRecording(recording.recordingId, recording);
        }}>

    <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={8} md={6} lg={3}>
          <TextField variant="outlined" id="recordingDescription" name="recordingDescription" value={recording.recordingDescription} placeholder="Description" style={{ width: "80%" }} size="small" onChange={handleInputChange}/>
        </Grid>
        <Grid item xs={8} md={6} lg={3}>

          <TextField variant="outlined" id="link" name="link" value={recording.link} placeholder="Link" style={{ width: "80%" }} size="small" onChange={handleInputChange}/>
        </Grid>
        <Grid item xs={8} md={6} lg={3}>

          <TextField variant="outlined" id="password" name="password" value={recording.password} placeholder="Password" style={{ width: "80%" }} size="small" onChange={handleInputChange}/>
        </Grid>
        
        <Button type='submit' variant="contained" sx={{ mt: 2, mr: 2 }}>
          Edit Recording
        </Button>
        <Button type='reset' onClick={() => props.setEditing(false)} variant="contained" sx={{ mt: 2, mr: 2 }}>
          Cancel
        </Button>
      </Grid>
    </form>);
};
export default EditRecording;