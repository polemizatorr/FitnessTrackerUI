import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  TablePagination,
} from '@mui/material';
import { getAerobicTrainingsForUser, deleteAerobicTraining } from '../../Services/TrainingsService';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../AerobicTrainings/AerobicTrainings.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateAerobicTraining from '../CreateAerobicTraining/CreateAerobicTraining';

const AerobicTrainings = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const username = useSelector(state => state.auth.username);
  const navigate = useNavigate();
  const location = useLocation();

  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    fetchData(); // Refresh the data after modal close
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  const fetchData = async () => {
    try {
      const res = await getAerobicTrainingsForUser(username);
      setTrainings(res.data.data); // Assuming data structure
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trainings:", error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/unauthorized");
    } else {
      fetchData();
    }
  }, [isAuthenticated, username, location.pathname, navigate]);

  const viewTraining = (id) => {
    navigate("/aerobic/" + id);
  };

  const editTraining = (id) => {
    navigate("/aerobic-edit-training/" + id);
  };

  const deleteTraining = async (id) => {
    await deleteAerobicTraining(id);
    fetchData(); // Refresh data after deletion
  };

  if (!isAuthenticated) {
    return <div>User not authenticated</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // Calculate the trainings to display based on pagination
  const paginatedTrainings = trainings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <div className='Header'>
        <h2>Aerobic Trainings</h2>
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <CreateAerobicTraining isModalOpen={open} onCloseModal={handleCloseModal} />
          </Box>
        </Modal>
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
            {paginatedTrainings.map((training, index) => (
              <TableRow key={training.aerobicTrainingId}>
                <TableCell align="left" className={styles.customCell} >{page * rowsPerPage + index + 1}</TableCell> {/* Adjust index */}
                <TableCell align="left">{training.activityType}</TableCell>
                <TableCell align="left">{training.activityDurationMinutes}</TableCell>
                <TableCell align="left">{training.calorieBurnt}</TableCell>
                <TableCell align="left">{new Date(training.activityDate).toLocaleDateString()}</TableCell>
                <TableCell align="left">
                  <Button color="primary" onClick={() => viewTraining(training.aerobicTrainingId)}>
                    <FontAwesomeIcon icon={faEye} title='View' className={styles.IconsSize} />
                  </Button>
                  <Button color="primary" onClick={() => editTraining(training.aerobicTrainingId)}>
                    <FontAwesomeIcon icon={faEdit} title='Edit' className={styles.IconsSize} />
                  </Button>
                  <Button color="primary" onClick={() => deleteTraining(training.aerobicTrainingId)}>
                    <FontAwesomeIcon icon={faTrash} title='Delete' className={styles.IconsSize} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          count={trainings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <div style={{ position: 'fixed', bottom: '7em', right: '3em' }}>
        <Button
          variant="fab"
          color="primary"
          onClick={handleOpenModal}
          className={styles.circularButton}
          sx={{
            border: '2px solid #1976d2',
            borderRadius: '50%',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          <FontAwesomeIcon icon={faPlus} title='Add New Training' size='2x' color='#1976d2' />
        </Button>
      </div>
    </>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  boxShadow: 24,
  padding: '20px',
  borderRadius: '8px',
};

export default AerobicTrainings;