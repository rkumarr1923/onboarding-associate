import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Typography
} from "@mui/material";
import React, { Fragment } from 'react';
import axios from "axios";

const tableHeader = ["Training", "Link", "Remarks"];
const TrainingList = (props) => (

    <TableContainer style={{ margin: "0px" }}>
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
                    props.trainings.map(item => (
                        <TableRow key={item.trainingId}>
                            <TableCell>{item.trainingName}</TableCell>
                            <TableCell><a target="_blank" href={item.link}>{item.link} </a></TableCell>
                            <TableCell>{item.remarks}</TableCell>
                            <TableCell>
                                <Button type='submit'
                                    onClick={() => props.editTraining(item)}
                                    variant="contained"
                                    size="small"
                                    
                                >
                                    Edit
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button type='submit'
                                    onClick={() => props.deleteTraining(item.trainingId)}
                                    variant="contained"
                                    size="small"
                                    color="error"
                                    
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <tr>
                        <td colSpan={4}>No training available</td>
                    </tr>
                )}

            </TableBody>

        </Table>
    </TableContainer >

)

export default TrainingList
