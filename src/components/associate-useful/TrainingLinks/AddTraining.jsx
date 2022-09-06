import React, { useState } from 'react'
import {
  Grid,
  TextField,
  Button
} from "@mui/material";

const AddTraining = (props) => {
  const initialFormState = { trainingId: '', trainingName: '', link: '', remarks: '' }
  const [training, setTraining] = useState(initialFormState)

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setTraining({ ...training, [name]: value })
  }

  return (
    <form onSubmit={event => {
      event.preventDefault()
      if (!training.trainingName || !training.link || !training.remarks) return
      props.addTraining(training)
      setTraining(initialFormState)
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