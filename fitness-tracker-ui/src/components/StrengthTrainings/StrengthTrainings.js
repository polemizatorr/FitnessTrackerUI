import React from 'react';
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
import styles from '../StrengthTrainings/StrengthTrainings.module.css'
import { getStrengthTrainings, deleteStrengthTraining, getStrengthTrainingsForUser, createStrengthTraining, exportAllStrengthTrainings } from '../../Services/TrainingsService';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateStrengthTraining from '../CreateStrengthTraining/CreateStrengthTraining';

const StrengthTrainings = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const username = useSelector(state => state.auth.username);

  const navigate = useNavigate();
  const location = useLocation();

  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Set default rows per page

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/unauthorized");
    } else {
      fetchData();
    }
  }, [location.pathname]);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    fetchData(); // Refresh the data after modal close
    setOpen(false);
  };

  const exportTrainingsToFile = async () => {
    await exportAllStrengthTrainings();
  }

  const fetchData = async () => {
    await getStrengthTrainingsForUser(username)
      .then((res) => {
        setTrainings(res.data.data);
        setLoading(false);
      });
  };

  const navigateToTraining = (id) => {
    navigate("/strength/" + id);
  };

  const deleteTraining = async (id) => {
    await deleteStrengthTraining(id);
    await fetchData();
  };

  const createTraining = () => {
    navigate("/create-new-strength-training");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on rows per page change
  };

  // Paginated trainings
  const paginatedTrainings = trainings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.HeaderContainer}>
        <div className={styles.Header}>
          <h2>Aerobic Trainings</h2>
        </div>

        <div className={styles.ExportButton}>
          <Button size='large' onClick={exportTrainingsToFile}> Export </Button>
        </div>
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <CreateStrengthTraining isModalOpen={open} onCloseModal={handleCloseModal} />
          </Box>
        </Modal>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Training Name</TableCell>
              <TableCell align="left">Training Date</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTrainings.map((training, index) => (
              <TableRow
                key={training.strenghtTrainingId}
              >
                <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell> {/* Adjust index */}
                <TableCell align="left">{training.trainingName}</TableCell>
                <TableCell align="left">{new Date(training.trainingDate).toLocaleDateString()}</TableCell>
                <TableCell align="left">
                  <Button color="primary" onClick={() => { navigateToTraining(training.strenghtTrainingId) }}>
                    <FontAwesomeIcon icon={faEye} title='View' className={styles.IconsSize} />
                  </Button>
                  <Button color="primary" onClick={() => { deleteTraining(training.strenghtTrainingId) }}>
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

StrengthTrainings.propTypes = {};

StrengthTrainings.defaultProps = {};

export default StrengthTrainings;