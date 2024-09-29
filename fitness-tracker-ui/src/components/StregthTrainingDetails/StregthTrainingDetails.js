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
import PropTypes from 'prop-types';
import styles from './StregthTrainingDetails.module.css';
import { getStrengthTraining, deleteSet, createSet } from '../../Services/TrainingsService';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Divider from '@mui/material/Divider';
import CreateSet from '../CreateSet/CreateSet';

const StregthTrainingDetails = () => {
  const [training, setTraining] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Set default rows per page

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = () => {
    getStrengthTraining(id)
      .then((res) => {
        setTraining(res.data.data);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    fetchData(); // Refresh the data after modal close
    setOpen(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const createNewSet = async (strengthTrainingId, setData) => {
    await createSet(strengthTrainingId, setData);
  };

  const deleteSetById = async (id) => {
    await deleteSet(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on rows per page change
  };

  // Paginated sets
  const paginatedSets = training.sets ? training.sets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [];

  return (
    <div className={styles.StrengthTrainingDetails}>
      <p><strong>Training Name:</strong> {training.trainingName}</p>
      <p><strong>Training Date:</strong> {new Date(training.trainingDate).toLocaleDateString()}</p>

      <div className={styles.itemCollection}>
        <h2>Sets:</h2>

        <div>
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <CreateSet isModalOpen={open} onCloseModal={handleCloseModal} />
          </Box>
        </Modal>
      </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Repetitions Number</TableCell>
                <TableCell align="left">Exercise Name</TableCell>
                <TableCell align="left">Exhaustion Level&nbsp;(1 - 10)</TableCell>
                <TableCell align="left">Weight&nbsp;(kg)</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedSets.map((set, index) => (
                <TableRow
                  key={set.setId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell> {/* Adjust index */}
                  <TableCell align="left" component="th" scope="row">
                    {set.repetitionsNumber}
                  </TableCell>
                  <TableCell align="left">{set.exerciseName}</TableCell>
                  <TableCell align="left">{set.exhaustionLevel}</TableCell>
                  <TableCell align="left">{set.weight}</TableCell>
                  <TableCell align="left">
                    <Button color="primary" onClick={() => { deleteSetById(set.setId) }}>
                      <FontAwesomeIcon icon={faTrash} title='Delete' className={styles.IconsSize} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Add the Divider here */}
          <Divider style={{ margin: '16px 0', backgroundColor: 'gray' }} />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            count={training.sets ? training.sets.length : 0}
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
            <FontAwesomeIcon icon={faPlus} title='Add New Set' size='2x' color='#1976d2' />
          </Button>
        </div>

      </div>
    </div>
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

StregthTrainingDetails.propTypes = {};

StregthTrainingDetails.defaultProps = {};

export default StregthTrainingDetails;
