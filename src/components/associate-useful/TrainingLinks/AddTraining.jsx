import React, { useState, useEffect } from 'react'
import {
  Grid,
  TextField,
  Button
} from "@mui/material";
import TrainingService from '../../../services/hooks/TrainingService';

const AddTraining = (props) => {
  const initialFormState = { trainingId: '', trainingName: '', link: '', remarks: '' }
  const [training, setTraining] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [trainings, setTrainings] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTraining({ ...training, [name]: value });
  }

  const newTraining = () => {
    setTraining(initialFormState);
    setSubmitted(false);
  };

  return (
    <form onSubmit={event => {
      event.preventDefault()
      if (!training.trainingName || !training.link) return;
      var data = {
        trainingName: training.trainingName,
        link: training.link,
        remarks: training.remarks
      };
  
      TrainingService.createTraining(data)
        .then(response => {
          setTraining(response.data);
          setSubmitted(true);
          newTraining();
          console.log(response.data);
          props.addTraining(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      setTraining(initialFormState);
    }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={8} md={6} lg={3}>
          <TextField
            variant="outlined"
            id="trainingName"
            name="trainingName"
            value={training.trainingName}
            placeholder="Enter Training Name"
            style={{ width: "80%" }}
            size="small"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={8} md={6} lg={3}>

          <TextField
            variant="outlined"
            id="link"
            name="link"
            value={training.link}
            placeholder="Enter Training Link"
            style={{ width: "80%" }}
            size="small"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>

          <TextField
            variant="outlined"
            id="remarks"
            name="remarks"
            value={training.remarks}
            placeholder="Enter remarks (if any)"
            style={{ width: "80%" }}
            size="small"
            onChange={handleInputChange}
          />
        </Grid>

        <Button type='submit'
          //onClick={saveTraining}
          variant="contained"
          color="success"
          sx={{ mt: 2, mr: 2 }}
        >
          Add Training
        </Button>

      </Grid>

    </form>
  )

}

export default AddTraining