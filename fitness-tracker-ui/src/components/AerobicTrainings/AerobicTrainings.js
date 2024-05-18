import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAerobicTrainings } from '../../Services/TrainingsService';
import { useState, useEffect } from 'react';

const AerobicTrainings = () => {

  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAerobicTrainings()
      .then((res) => {
        setTrainings(res.data.$values);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <><h2> Aerobic Trainings</h2><TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="left">Id</TableCell>
            <TableCell align="left">Activity Type</TableCell>
            <TableCell align="left">Calorie Burnt</TableCell>
            <TableCell align="left">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainings && trainings.map((training) => (
            <TableRow
              key={training.aerobicTrainingId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{training.$id - 1}</TableCell>
              <TableCell align="left">{training.activityType}</TableCell>
              <TableCell align="left">{training.calorieBurnt}</TableCell>
              <TableCell align="left">{training.creationDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer></>
  )
};  

AerobicTrainings.propTypes = {};

AerobicTrainings.defaultProps = {};

export default AerobicTrainings;
