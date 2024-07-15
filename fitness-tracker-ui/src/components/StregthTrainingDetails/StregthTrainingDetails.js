import React from 'react';
import PropTypes from 'prop-types';
import styles from './StregthTrainingDetails.module.css';
import { getStrengthTraining, deleteSet, createSet} from '../../Services/TrainingsService';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
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

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getStrengthTraining(id)
      .then((res) => {
        setTraining(res.data.data);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return(
      <p>Loading...</p>
    )
  }

  const createNewSet = async (strengthTrainingId, setData) => {
    await createSet(strengthTrainingId, setData);
  }

  const deleteSetById = async (id) => {
    await deleteSet(id);
  }
  
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
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {training.sets.map((set, index) => (
            <TableRow
              key={set.setId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{index + 1}</TableCell>
              <TableCell align="left" component="th" scope="row">
                {set.repetitionsNumber}
              </TableCell>
              <TableCell align="left">{set.exerciseName}</TableCell>
              <TableCell align="left">{set.exhaustionLevel}</TableCell>
              <TableCell align="left">{set.weight}</TableCell>
              <TableCell align="left">
                <Button color="primary" onClick={() => {deleteSetById(set.setId)}}> Delete</Button>
              </TableCell>
                
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button color="primary" onClick={() => {navigate('/set-create-new/' + training.strenghtTrainingId)}}> Add Set</Button>

    </div>
      
    </div>
  );
  
};

StregthTrainingDetails.propTypes = {};

StregthTrainingDetails.defaultProps = {};

export default StregthTrainingDetails;
