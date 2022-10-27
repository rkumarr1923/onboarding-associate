import React, { useState } from 'react';
import RecordingList from './RecordingList';
import AddRecording from './AddRecording';
import EditRecording from './EditRecording';
import { Grid } from '@mui/material';
import { recordings, token, userDetails } from '../../../store';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../../common/Loader';
const RecordingMainComponent = () => {
  const userToken = useSelector(token);
  const dispatch = useDispatch();
  const initialFormState = {
    recordId: '',
    recordDesc: '',
    recordLink: '',
    recordLinkPassword: '',
  };
  useEffect(() => {
    axios
      .get('http://localhost:9094/recording/get-all-recordings', {
        headers: { Authorization: 'Bearer ' + userToken },
      })
      .then((response) => {
        dispatch(recordings({ recordings: response.data }));
        setLoader(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [editing, setEditing] = useState(false);
  const [currentRecording, setCurrentRecording] = useState(initialFormState);
  const user = useSelector(userDetails);
  const [loader, setLoader] = useState(true);
  // Add recording...
  const addRecording = (recording) => {
    console.log(recording);
    dispatch(recordings({ recordings }));
  };
  // delete recordings...
  const deleteRecording = (recordId) => {
    const data = recordings.filter(
      (recording) => recording.recordId !== recordId
    );
    dispatch(recordings({ data }));
  };
  // set value for edit recording form...
  const editRecording = (recording) => {
    setEditing(true);
    setCurrentRecording({
      recordId: recording.recordId,
      recordDesc: recording.recordDesc,
      recordLink: recording.recordLink,
      recordLinkPassword: recording.recordLinkPassword,
    });
  };
  //  update recording
  const updateRecording = (recordId, updatedRecording) => {
    setEditing(false);
    console.log(recordId, 'idd');
    const data = recordings.map((item) => {
      console.log(item.recordId);
      return item.recordId === recordId ? updatedRecording : item;
    });
    dispatch(recordings({ data }));
  };
  return (
    <div style={{ padding: '20px 20px 130px 20px' }}>
      <Grid container>
        {(user.role === 'ROLE_ONBOARDING_MANAGER' ||
          user.role === 'ROLE_ONBOARDING_REVIEWER') && (
          <>
            {editing ? (
              <Grid item xs={12}>
                <h2 style={{ textAlign: 'center' }}>Edit Recording</h2>
                <Grid item xs={12}>
                  <EditRecording
                    editing={editing}
                    setEditing={setEditing}
                    currentRecording={currentRecording}
                    updateRecording={updateRecording}
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <h2 style={{ textAlign: 'center' }}>Add Recording</h2>
                <Grid item xs={12}>
                  <AddRecording addRecording={addRecording} />
                </Grid>
              </Grid>
            )}
          </>
        )}
        <Grid item xs={12}>
          <h2>Recording</h2>
          {loader ? (
            <Loader />
          ) : (
            <Grid item xs={12}>
              <RecordingList
                recordings={recordings}
                editRecording={editRecording}
                deleteRecording={deleteRecording}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
export default RecordingMainComponent;
