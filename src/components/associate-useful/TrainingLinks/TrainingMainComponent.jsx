import React, { useState, useEffect } from 'react';
import TrainingList from './TrainingList';
import AddTraining from './AddTraining';
import EditTraining from './EditTraining';
import { Grid } from '@mui/material';
import axios from 'axios';
import TrainingService from '../../../services/hooks/TrainingService';
import { useSelector } from 'react-redux';
import { token, userDetails } from '../../../store';
import Loader from '../../common/Loader';

const TrainingMainComponent = () => {
  const userToken = useSelector(token);
  const user = useSelector(userDetails);
  const initialFormState = {
    trainingId: '',
    trainingName: '',
    link: '',
    remarks: '',
  };
  const [trainings, setTrainings] = useState([]);
  const [loader, setLoader] = useState(true);
  const headers = { Authorization: 'Bearer ' + userToken };
  const BASE_URL = 'http://localhost:9094/training';
  useEffect(() => {
    const BASE_URL = 'http://localhost:9094/training';

    axios
      .get(BASE_URL + '/get-all-training', {
        headers: { Authorization: 'Bearer ' + userToken },
      })
      .then((response) => {
        setTrainings(response.data);
        console.log(
          'in Main component useEffect getall trainings ',
          response.data
        );
        setLoader(false);
      });
    //retrieveTrainings();
  }, []);
  //  const retrieveTrainings = () => {
  //      const response = axios.get(BASE_URL + '/get-all-training');
  //      setTrainings(response.data);
  //      console.log("in main component, getall trainings ",response.data);
  //  };

  const [editing, setEditing] = useState(false);
  const [currentTraining, setCurrentTraining] = useState(initialFormState);
  // Add training...
  const addTraining = (training) => {
    console.log('in main component, add training', training);
    setTrainings([...trainings, training]);
  };
  // delete trainings...
  const deleteTraining = (trainingId) => {
    setLoader(true);
    TrainingService.deleteTraining(trainingId, headers).then((response) => {
      console.log(response.data);
      setTrainings(
        trainings.filter((training) => training.trainingId !== trainingId)
      );
      setLoader(false);
    });
  };
  // set value for edit training form...
  const editTraining = (training) => {
    setEditing(true);
    setCurrentTraining({
      trainingId: training.trainingId,
      trainingName: training.trainingName,
      link: training.link,
      remarks: training.remarks,
    });
  };
  //  update training
  const updateTraining = (trainingId, updatedTraining) => {
    console.log('in updateTraining', trainingId);
    setEditing(false);
    setTrainings(
      trainings.map((item) => {
        return item.trainingId === trainingId ? updatedTraining : item;
      })
    );
  };

  return (
    <div style={{ padding: '20px 20px 130px 20px' }}>
      <Grid container>
        {user.role === 'ROLE_ONBOARDING_MANAGER' ||
        user.role === 'ROLE_ONBOARDING_REVIEWER' ? (
          <Grid item xs={12}>
            {editing ? (
              <Grid item xs={12}>
                <h2 style={{ textAlign: 'center' }}>Edit Training</h2>
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
                <h2 style={{ textAlign: 'center' }}>Add Training</h2>
                <Grid item xs={12}>
                  <AddTraining addTraining={addTraining} />
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              <h2>Training</h2>
              {loader ? (
                <Loader />
              ) : (
                <TrainingList
                  trainings={trainings}
                  editTraining={editTraining}
                  deleteTraining={deleteTraining}
                />
              )}
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <h2>Training</h2>
            {loader ? <Loader /> : <TrainingList trainings={trainings} />}
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default TrainingMainComponent;
