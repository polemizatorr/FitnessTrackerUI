import React from 'react';
import PropTypes from 'prop-types';
import styles from './StregthTrainingDetails.module.css';
import { getStrengthTraining } from '../../Services/TrainingsService';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StregthTrainingDetails = () => {

  const [training, setTraining] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    getStrengthTraining(id)
      .then((res) => {
        setTraining(res.data);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return(
      <p>Loading...</p>
    )
  }

  console.log("traingn"  + JSON.stringify(training));
  
  return (
    <div className={styles.StrengthTrainingDetails}>
      <p><strong>Training Name:</strong> {training.trainingName}</p>
      <p><strong>Training Date:</strong> {new Date(training.trainingDate).toLocaleDateString()}</p>

      <div className={styles.itemCollection}>
      <h2>Sets:</h2>
      {/* <ul>
        {training.sets.map((item, index) => (
          <li key={index} className={styles.item}>
            <strong> Repetitions Number </strong>: {item.repetitionsNumber}
            <strong> Exercise Name </strong>: {item.exerciseName}
            <strong> Exhaustion Level </strong>: {item.exhaustionLevel}
            <strong> weight </strong>: {item.weight}
          </li>
        ))}
      </ul> */}

<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="left">Id</TableCell>
            <TableCell align="left">Repetitions Number</TableCell>
            <TableCell align="left">Exercise Name</TableCell>
            <TableCell align="left">Exhaustion Level&nbsp;(1 - 10)</TableCell>
            <TableCell align="left">weight&nbsp;(kg)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {training.sets.map((set, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{index + 1}</TableCell>
              <TableCell align="left" component="th" scope="row">
                {set.repetitionsNumber}
              </TableCell>
              <TableCell align="left">{set.exerciseName}</TableCell>
              <TableCell align="left">{set.exhaustionLevel}</TableCell>
              <TableCell align="left">{set.weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
      
    </div>
  );
  
};

StregthTrainingDetails.propTypes = {};

StregthTrainingDetails.defaultProps = {};

export default StregthTrainingDetails;
