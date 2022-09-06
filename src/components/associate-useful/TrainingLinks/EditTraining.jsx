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


const EditTraining = (props) => {
  const [training, setTraining] = useState(props.currentTraining)
  useEffect(
    () => {
      setTraining(props.currentTraining)
    },
    [props]
  )

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setTraining({ ...training, [name]: value })
  }

  return (
    <form onSubmit={event => {
      event.preventDefault()
      if (!training.trainingName || !training.link || !training.remarks) return

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