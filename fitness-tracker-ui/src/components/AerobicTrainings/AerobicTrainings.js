import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAerobicTrainings, deleteAerobicTraining, getAerobicTrainingsForUser } from '../../Services/TrainingsService';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../AerobicTrainings/AerobicTrainings.module.css'; // Use 'styles' to reference the imported module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AerobicTrainings = () => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const username = useSelector(state => state.auth.username);

  const navigate = useNavigate();
  const location = useLocation();

  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!isAuthenticated){
      navigate("/unauthorized");
    }
    else {
      fetchData();
    }
  }, [isAuthenticated, username, location.pathname, navigate]);

  const fetchData = async () => {
    await getAerobicTrainingsForUser(username)
      .then((res) => {
        setTrainings(res.data.data);
        setLoading(false);
      })
  }

  const viewTraining = (id) => {
    navigate("/aerobic/" + id);
  }

  const createTrainingView = () => {
    navigate("/aerobic-create-new");
  }

  const editTraining = (id) => {
    navigate("/aerobic-edit-training/" + id);
  }

  const deleteTraining = async (id) => {
    await deleteAerobicTraining(id);
    await fetchData();
    navigate("/aerobic");
  }

  if (!isAuthenticated) {
    return <div>User not authenticated</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className='Header'>
      <h2> Aerobic Trainings</h2>
    </div> 

    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="left">Id</TableCell>
            <TableCell align="left">Activity Type</TableCell>
            <TableCell align="left">Activity Duration (Minutes)</TableCell>
            <TableCell align="left">Calorie Burnt</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainings && trainings.map((training, index) => (
            <TableRow
              key={training.aerobicTrainingId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{index + 1}</TableCell>
              <TableCell align="left">{training.activityType}</TableCell>
              <TableCell align="left">{training.activityDurationMinutes}</TableCell>
              <TableCell align="left">{training.calorieBurnt}</TableCell>
              <TableCell align="left">{new Date(training.activityDate).toLocaleDateString()}</TableCell>
              <TableCell align="left"> 
                <Button color="primary" onClick={() => {viewTraining(training.aerobicTrainingId)}}> <FontAwesomeIcon icon={faEye} title='View' className={styles.IconsSize} /></Button> 
                <Button color="primary" onClick={() => {editTraining(training.aerobicTrainingId)}}> <FontAwesomeIcon icon={faEdit} title='Edit' className={styles.IconsSize} /> </Button> 
                <Button color="primary" onClick={() => {deleteTraining(training.aerobicTrainingId)}}> <FontAwesomeIcon icon={faTrash} title='Delete' className={styles.IconsSize} /></Button> 
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <div style={{ position: 'fixed', bottom: '7em', right: '3em' }}>
      <Button 
          variant="fab" 
          color="primary" 
          onClick={() => {createTrainingView()}} 
          className={styles.circularButton}
          sx={{
            border: '2px solid #1976d2', // Set the border color (blue in this case)
            borderRadius: '50%', // Makes the button circular
            '&:hover': {
                backgroundColor: '#f0f0f0', // Change background on hover
            },
        }}
      >
          <FontAwesomeIcon icon={faPlus} title='Add New Training' size='2x' color='#1976d2' />
      </Button>
    </div>
    
    </>
    
  )
  

};  

AerobicTrainings.propTypes = {};

AerobicTrainings.defaultProps = {};

export default AerobicTrainings;
