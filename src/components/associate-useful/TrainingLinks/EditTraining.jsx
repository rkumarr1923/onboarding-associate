import React, { useState, useEffect } from 'react'
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import TrainingService from '../../../services/hooks/TrainingService';


const EditTraining = (props) => {
  const [training, setTraining] = useState(props.currentTraining);
  const [trainings, setTrainings] = useState([]);
  const BASE_URL = "http://localhost:9094/training";
  useEffect(() => {
    setTraining(props.currentTraining);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setTraining({ ...training, [name]: value })
  }

  return (
    <form onSubmit={event => {
      event.preventDefault()
      if (!training.trainingName || !training.link ) return;

      var data = {
        trainingName: training.trainingName,
        link: training.link,
        remarks: training.remarks
      };
      TrainingService.updateTraining(data,training.trainingId)
      .then(response => {
        setTraining({
          trainingId: response.data.trainingId,
          trainingName: response.data.trainingName,
          link: response.data.link,
          remarks: response.data.remarks
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      props.updateTraining(training.trainingId, training)
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
        <Grid item xs={8} md={6} lg={3}>

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
          variant="contained"
          sx={{ mt: 2, mr: 2 }}
        >
          Edit Training
        </Button>
       
        <Button type='reset'
          onClick={() => props.setEditing(false)}
          variant="contained"
          sx={{ mt: 2, mr: 2 }}
        >
          Cancel
        </Button>
       
      </Grid>
    </form>
  )
}

export default EditTraining