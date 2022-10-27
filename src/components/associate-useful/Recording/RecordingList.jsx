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
import React from 'react';
import { useSelector } from 'react-redux';
import { allRecordings, userDetails } from '../../../store';
const tableHeader = ['Recording Description', 'Recording Link'];
const RecordingList = (props) => {
  const recording = useSelector(allRecordings);
  const user = useSelector(userDetails);
  return (
    <TableContainer style={{ margin: '0px' }}>
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
          {recording.length > 0 ? (
            recording.map((item) => (
              <TableRow key={item.recordId}>
                <TableCell>{item.recordDesc}</TableCell>
                <TableCell>
                  <a target="_blank" href={item.recordLink}>
                    {item.recordLink}
                  </a>
                  <br />
                  Password : {item.recordLinkPassword}
                </TableCell>
                {(user.role === 'REVIEWER' || user.role === 'MANAGER') && (
                  <>
                    <TableCell>
                      <Button
                        type="submit"
                        onClick={() => props.editRecording(item)}
                        variant="contained"
                        size="small"
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        type="submit"
                        onClick={() => props.deleteRecording(item.recordId)}
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
              <td colSpan={4}>No recording available</td>
            </tr>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default RecordingList;
