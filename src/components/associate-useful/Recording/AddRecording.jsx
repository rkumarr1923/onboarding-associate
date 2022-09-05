import React, { useState } from 'react';
import { Grid, TextField, Button } from "@mui/material";
const AddRecording = (props) => {
    const initialFormState = { recordingId: '', recordingDescription: '', link: '', password: '' };
    const [recording, setRecording] = useState(initialFormState);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRecording({ ...recording, [name]: value });
    };
    return (<form onSubmit={event => {
            event.preventDefault();
            if (!recording.recordingDescription || !recording.link || !recording.password)
                return;
            props.addRecording(recording);
            setRecording(initialFormState);
        }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={8} md={6} lg={3}>
          <TextField variant="outlined" id="recordingDescription" name="recordingDescription" value={recording.recordingDescription} placeholder="Description" style={{ width: "80%" }} size="small" onChange={handleInputChange}/>
        </Grid>
        <Grid item xs={8} md={6} lg={3}>

          <TextField variant="outlined" id="link" name="link" value={recording.link} placeholder="Link" style={{ width: "80%" }} size="small" onChange={handleInputChange}/>
        </Grid>
        <Grid item xs={6} md={4} lg={3}>

          <TextField variant="outlined" id="password" name="password" value={recording.password} placeholder="Password" style={{ width: "80%" }} size="small" onChange={handleInputChange}/>
        </Grid>
        
          <Button type='submit' variant="contained" color="success" sx={{ mt: 2, mr: 2 }}>
            Submit
          </Button>
        
      </Grid>
    </form>);
};
export default AddRecording;
//# sourceMappingURL=AddRecording.jsx.map