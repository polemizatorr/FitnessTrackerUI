import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styles from './StrengthTrainings.module.css';
import { getStrengthTrainings, deleteStrengthTraining } from '../../Services/TrainingsService';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StrengthTrainings = () => {

  let id = 1;
  const navigate = useNavigate();
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getStrengthTrainings()
      .then((res) => {
        console.log(res);
        setTrainings(res.data);
        setLoading(false);
      })
  }, []);

  const navigateToTraining = (id) => {
    navigate("/strength/" + id);
  }

  const deleteTraining = async (id) => {
    await deleteStrengthTraining(id);
  }

  const createTraining = () => {
    navigate("/create-new-strength-training");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return(
    <><h2> Strength Trainings</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="left">Id</TableCell>
            <TableCell align="left">Training Name</TableCell>
            <TableCell align="left"> Training Date</TableCell>
            <TableCell align="left"> Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainings && trainings.map((training) => (
            <TableRow
              key={training.aerobicTrainingId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{id++}</TableCell>
              <TableCell align="left">{training.trainingName}</TableCell>
              <TableCell align="left">{new Date(training.trainingDate).toLocaleDateString()}</TableCell>
              <TableCell align="left">
                <Button color="primary" onClick={() => {navigateToTraining(training.strenghtTrainingId)}}> View</Button> 
                <Button color="primary" onClick={() => {deleteTraining(training.strenghtTrainingId)}}> Delete</Button> 
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button color="primary" onClick={() => {createTraining()}}> Add Training</Button> 
    </>
  )
};

StrengthTrainings.propTypes = {};

StrengthTrainings.defaultProps = {};

export default StrengthTrainings;
