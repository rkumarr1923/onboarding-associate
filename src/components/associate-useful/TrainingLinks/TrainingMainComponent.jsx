import React, { useState } from 'react';
import TrainingList from './TrainingList';
import {trainingData} from "../../../json/trainingData";
import AddTraining from './AddTraining';
import EditTraining from './EditTraining';
import { Grid } from "@mui/material";

const TrainingMainComponent = () => {

    const initialFormState = { trainingId: '', trainingName: '', link: '', remarks: '' }
    const [trainings, setTrainings] = useState(trainingData)
    const [editing, setEditing] = useState(false);
    const [currentTraining, setCurrentTraining] = useState(initialFormState)
    // Add training...
    const addTraining = training => {
        training.trainingId = trainings.length + 1
        setTrainings([...trainings, training])
    }
    // delete trainings...
    const deleteTraining = trainingId => {
        setTrainings(trainings.filter(training => training.trainingId !== trainingId))
    }
    // set value for edit training form...
    const editTraining = (training) => {
        setEditing(true)
        setCurrentTraining({
            trainingId: training.trainingId,
            trainingName: training.trainingName,
            link: training.link,
            remarks: training.remarks
        })
    }
    //  update training
    const updateTraining = (trainingId, updatedTraining) => {
        setEditing(false)
        setTrainings(trainings.map(item => {console.log(item.trainingId); return (item.trainingId === trainingId ? updatedTraining : item)}))
    }

    return (
        <Grid container >
            <Grid item xs={12}>
                {editing ? (
                    <Grid item xs={12}>
                        <h2 style={{textAlign:"center"}}>Edit Training</h2>
                        <Grid item xs={12}>
                            <EditTraining
                                editing={editing}
                                setEditing={setEditing}
                                currentTraining={currentTraining}
                                updateTraining={updateTraining}
                            />
                        </Grid>
                    </Grid>
                ) : (
                    <Grid item xs={12}>
                        <h2 style={{textAlign:"center"}}>Add Training</h2>
                        <Grid item xs={12}>
                            <AddTraining addTraining={addTraining} />
                        </Grid>
                    </Grid>
                )}

                
                <Grid item xs={12}>
                        <TrainingList trainings={trainings} editTraining={editTraining} deleteTraining={deleteTraining} />
                </Grid>
                
            </Grid>
        </Grid>
    );


}


export default TrainingMainComponent;