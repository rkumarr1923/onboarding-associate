import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
} from '@mui/material';
import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import TrainingService from '../../../services/hooks/TrainingService';
import { useSelector } from 'react-redux';
import { token, userDetails } from '../../../store';

const tableHeader = ['Training', 'Link', 'Remarks'];

const TrainingList = (props) => {
  const userToken = useSelector(token);
  const user = useSelector(userDetails);
  const [trainings, setTrainings] = useState([]);
  const [currentTraining, setCurrentTraining] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const BASE_URL = 'http://localhost:9094/training';

    axios
      .get(BASE_URL + '/get-all-training', {
        headers: { Authorization: 'Bearer ' + userToken },
      })
      .then((response) => {
        setTrainings(response.data);
        console.log(
          'in Training list useEffect getall trainings ',
          response.data
        );
      });
    //retrieveTrainings();
  }, []);

  return (
    <TableContainer style={{ margin: '0px', backgroundColor: 'white' }}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeader &&
              tableHeader.map((header) => {
                return (
                  <TableCell key={header}>
                    <Typography component="h3">
                      <strong>{header}</strong>
                    </Typography>
                  </TableCell>
                );
              })}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.trainings.length > 0 ? (
            props.trainings.map((item) => (
              <TableRow key={item.trainingId}>
                <TableCell>{item.trainingName}</TableCell>
                <TableCell>
                  <a target="_blank" href={item.link}>
                    {item.link}{' '}
                  </a>
                </TableCell>
                <TableCell>{item.remarks}</TableCell>
                {(user.role === 'ROLE_ONBOARDING_MANAGER' ||
                  user.role === 'ROLE_ONBOARDING_REVIEWER') && (
                  <>
                    <TableCell>
                      <Button
                        type="submit"
                        onClick={() => props.editTraining(item)}
                        variant="contained"
                        size="small"
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        type="submit"
                        onClick={() => props.deleteTraining(item.trainingId)}
                        variant="contained"
                        size="small"
                        color="error"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No training available</td>
            </tr>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TrainingList;
