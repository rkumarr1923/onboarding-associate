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
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [editing, setEditing] = useState(false);
  const [currentRecording, setCurrentRecording] = useState(initialFormState);
  const user = useSelector(userDetails);
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
    <div className="checklist-container">
      <div className="row">
        <Grid
          container
          direction="row"
          style={{ backgroundColor: 'white' }}
          className="pt-3"
        >
          {(user.role === 'ROLE_ONBOARDING_MANAGER' ||
            user.role === 'ROLE_ONBOARDING_REVIEWER') && (
            <>
              {editing ? (
                <div>
                  <h2 style={{ textAlign: 'center' }}>Edit Recording</h2>
                  <div>
                    <EditRecording
                      editing={editing}
                      setEditing={setEditing}
                      currentRecording={currentRecording}
                      updateRecording={updateRecording}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h2 style={{ textAlign: 'center' }}>Recording</h2>
                  <div>
                    <AddRecording addRecording={addRecording} />
                  </div>
                </div>
              )}
            </>
          )}

          <div>
            <RecordingList
              recordings={recordings}
              editRecording={editRecording}
              deleteRecording={deleteRecording}
            />
          </div>
        </Grid>
      </div>
    </div>
  );
};
export default RecordingMainComponent;
