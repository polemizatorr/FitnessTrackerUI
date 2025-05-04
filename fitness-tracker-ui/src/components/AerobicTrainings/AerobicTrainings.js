import React, { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Box,
  CircularProgress
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import { getAerobicTrainingsForUser, deleteAerobicTraining, exportAllAerobicTrainings, editAerobicTraining, createAerobicTraining } from '../../Services/TrainingsService';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../AerobicTrainings/AerobicTrainings.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faTable, faList } from '@fortawesome/free-solid-svg-icons';

const AerobicTrainings = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const username = useSelector(state => state.auth.username);
  const navigate = useNavigate();
  const location = useLocation();

  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [viewMode, setViewMode] = useState('table');
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    activityType: '',
    activityDurationMinutes: '',
    calorieBurnt: '',
    activityDate: ''
  });
  const [isAddingTraining, setIsAddingTraining] = useState(false);
  const [newTrainingFormData, setNewTrainingFormData] = useState({
    activityType: '',
    activityDurationMinutes: '',
    calorieBurnt: '',
    activityDate: new Date().toISOString().split('T')[0]
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [newValidationErrors, setNewValidationErrors] = useState({});

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewModeChange = (event, newView) => {
    if (newView !== null) setViewMode(newView);
  };

  const handleEditClick = (training) => {
    setEditingId(training.aerobicTrainingId);
    const date = new Date(training.activityDate);
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    const formattedDate = adjustedDate.toISOString().split('T')[0];
    
    setEditFormData({
      activityType: training.activityType,
      activityDurationMinutes: training.activityDurationMinutes,
      calorieBurnt: training.calorieBurnt,
      activityDate: formattedDate
    });
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setValidationErrors({});
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveClick = async (id) => {
    const errors = validateTrainingForm(editFormData);

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

    try {
      await editAerobicTraining(id, editFormData);
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error("Error updating training:", error);
    }
  };

  const exportTrainingsToFile = async () => {
    const res = await exportAllAerobicTrainings();
    console.log(res);
  };

  const fetchData = async () => {
    try {
      const res = await getAerobicTrainingsForUser(username);
      setTrainings(res.data.data);
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

  const deleteTraining = async (id) => {
    await deleteAerobicTraining(id);
    fetchData();
  };

  const paginatedTrainings = rowsPerPage === -1
    ? trainings
    : trainings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleAddTrainingClick = () => {
    setIsAddingTraining(true);
    setNewTrainingFormData({
      activityType: '',
      activityDurationMinutes: '',
      calorieBurnt: '',
      activityDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleNewTrainingFormChange = (event) => {
    const { name, value } = event.target;
    setNewTrainingFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTrainingCancel = () => {
    setIsAddingTraining(false);
    setNewValidationErrors({});
  };

  const validateTrainingForm = (formData) => {
    const errors = {};
  
    if (!formData.activityType || formData.activityType.trim().length === 0) {
      errors.activityType = 'Activity type is required';
    } else if (formData.activityType.length > 50) {
      errors.activityType = 'Max 50 characters allowed';
    }
  
    if (!formData.activityDate) {
      errors.activityDate = 'Activity date is required';
    }
  
    if (!formData.activityDurationMinutes || isNaN(formData.activityDurationMinutes) || Number(formData.activityDurationMinutes) <= 0) {
      errors.activityDurationMinutes = 'Duration must be a number > 0';
    }
  
    if (!formData.calorieBurnt || isNaN(formData.calorieBurnt) || Number(formData.calorieBurnt) <= 0) {
      errors.calorieBurnt = 'Calories must be a number > 0';
    }
  
    return errors;
  };
 
  const handleAddTrainingSave = async () => {

    const errors = validateTrainingForm(newTrainingFormData);
    if (Object.keys(errors).length > 0) {
      setNewValidationErrors(errors);
      return;
    }

    setNewValidationErrors({});
    try {
      const formattedData = {
        activityDate: newTrainingFormData.activityDate,
        activityType: newTrainingFormData.activityType,
        activityDurationMinutes: newTrainingFormData.activityDurationMinutes,
        calorieBurnt: newTrainingFormData.calorieBurnt
      };
      console.log(formattedData)
      const response = await createAerobicTraining(formattedData);
      setIsAddingTraining(false);
      fetchData();
    } catch (error) {
      console.error("Error adding training:", error);
    }
  };

  if (!isAuthenticated) return <div>User not authenticated</div>;
  if (loading) return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: 'background.default'
    }}>
      <CircularProgress size={60} thickness={4} />
    </Box>
  );

  return (
    <>
      <div className={styles.HeaderContainer}>
        <div className={styles.Header}>
          <h2>Aerobic Trainings</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Button size='large' onClick={exportTrainingsToFile}>Export</Button>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            aria-label="view mode"
            sx={{ 
              '& .MuiToggleButton-root': {
                padding: '8px 16px',
                gap: '8px',
                '& .MuiSvgIcon-root': {
                  marginRight: '8px'
                }
              }
            }}
          >
            <ToggleButton value="table" aria-label="table view">
              <FontAwesomeIcon icon={faTable} /> Table
            </ToggleButton>
            <ToggleButton value="collapsible" aria-label="collapsible view">
              <FontAwesomeIcon icon={faList} /> List
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>

      {viewMode === 'table' ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ 
                backgroundColor: '#f5f5f5',
                '& th': {
                  color: '#1976d2',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  padding: '12px 16px',
                  borderBottom: '2px solid #e0e0e0'
                }
              }}>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Training Name</TableCell>
                <TableCell align="left">Training Date</TableCell>
                <TableCell align="left">Duration</TableCell>
                <TableCell align="left">Calories</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {isAddingTraining && (
                <TableRow>
                  <TableCell align="left">New</TableCell>
                  
                  <TableCell align="left">
                    <Tooltip
                      title={newValidationErrors.activityType || ''}
                      open={!!newValidationErrors.activityType}
                      placement="top"
                      arrow
                    >
                      <TextField
                        name="activityType"
                        value={newTrainingFormData.activityType}
                        onChange={handleNewTrainingFormChange}
                        size="small"
                        fullWidth
                        placeholder="Enter training name"
                        error={!!newValidationErrors.activityType}
                      />
                    </Tooltip>
                  </TableCell>

                  <TableCell align="left">
                    <Tooltip
                      title={newValidationErrors.activityDate || ''}
                      open={!!newValidationErrors.activityDate}
                      placement="top"
                      arrow
                    >
                      <TextField
                        name="activityDate"
                        type="date"
                        value={newTrainingFormData.activityDate}
                        onChange={handleNewTrainingFormChange}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        error={!!newValidationErrors.activityDate}
                      />
                    </Tooltip>
                  </TableCell>

                  <TableCell align="left">
                    <Tooltip
                      title={newValidationErrors.activityDurationMinutes || ''}
                      open={!!newValidationErrors.activityDurationMinutes}
                      placement="top"
                      arrow
                    >
                      <TextField
                        name="activityDurationMinutes"
                        type="number"
                        value={newTrainingFormData.activityDurationMinutes}
                        onChange={handleNewTrainingFormChange}
                        size="small"
                        sx={{ width: '80px' }}
                        error={!!newValidationErrors.activityDurationMinutes}
                      />
                    </Tooltip>
                  </TableCell>

                  <TableCell align="left">
                    <Tooltip
                      title={newValidationErrors.calorieBurnt || ''}
                      open={!!newValidationErrors.calorieBurnt}
                      placement="top"
                      arrow
                    >
                      <TextField
                        name="calorieBurnt"
                        type="number"
                        value={newTrainingFormData.calorieBurnt}
                        onChange={handleNewTrainingFormChange}
                        size="small"
                        sx={{ width: '80px' }}
                        error={!!newValidationErrors.calorieBurnt}
                      />
                    </Tooltip>
                  </TableCell>

                  <TableCell align="left">
                    <Button
                      color="primary"
                      onClick={handleAddTrainingSave}
                      startIcon={<Save />}
                      size="small"
                    >
                      Save
                    </Button>
                    <Button
                      color="error"
                      onClick={handleAddTrainingCancel}
                      startIcon={<Cancel />}
                      size="small"
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              )}
              {paginatedTrainings.map((training, index) => (
                <TableRow 
                  key={training.aerobicTrainingId}
                  sx={{ 
                    '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                    '&:hover': { backgroundColor: '#f0f0f0' },
                    '& td': {
                      padding: '8px 16px',
                      borderBottom: '1px solid #e0e0e0',
                      color: '#333',
                      fontSize: '0.9rem',
                      height: '40px'
                    }
                  }}
                >
                  <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell align="left" sx={{ fontWeight: 500 }}>
                    {editingId === training.aerobicTrainingId ? (
                      <Tooltip
                      title={
                        isAddingTraining
                          ? newValidationErrors.activityType || ''
                          : editingId === training.aerobicTrainingId
                          ? validationErrors.activityType || ''
                          : ''
                      }
                      open={
                        (isAddingTraining && !!newValidationErrors.activityType) ||
                        (editingId === training.aerobicTrainingId && !!validationErrors.activityType)
                      }
                      placement="top"
                      arrow
                    >
                        <TextField
                          name="activityType"
                          value={editFormData.activityType}
                          onChange={handleEditFormChange}
                          size="small"
                          fullWidth
                          error={!!validationErrors.activityType}
                          sx={{ '& .MuiInputBase-root': { height: '32px' } }}
                        />
                      </Tooltip>
                    ) : (
                      training.activityType
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {editingId === training.aerobicTrainingId ? (
                      <Tooltip
                      title={
                        isAddingTraining
                          ? newValidationErrors.activityDate || ''
                          : editingId === training.aerobicTrainingId
                          ? validationErrors.activityDate || ''
                          : ''
                      }
                      open={
                        (isAddingTraining && !!newValidationErrors.activityDate) ||
                        (editingId === training.aerobicTrainingId && !!validationErrors.activityDate)
                      }
                      placement="top"
                      arrow
                    >
                      <TextField
                        name="activityDate"
                        type="date"
                        value={editFormData.activityDate}
                        onChange={handleEditFormChange}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{ '& .MuiInputBase-root': { height: '32px' } }}
                        error={!!validationErrors.activityDate}
                      />
                      </Tooltip>
                    ) : (
                      new Date(training.activityDate).toLocaleDateString()
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {editingId === training.aerobicTrainingId ? (
                      <Tooltip
                      title={
                        isAddingTraining
                          ? newValidationErrors.activityDurationMinutes || ''
                          : editingId === training.aerobicTrainingId
                          ? validationErrors.activityDurationMinutes || ''
                          : ''
                      }
                      open={
                        (isAddingTraining && !!newValidationErrors.activityDurationMinutes) ||
                        (editingId === training.aerobicTrainingId && !!validationErrors.activityDurationMinutes)
                      }
                      placement="top"
                      arrow
                    >
                      <TextField
                        name="activityDurationMinutes"
                        type="number"
                        value={editFormData.activityDurationMinutes}
                        onChange={handleEditFormChange}
                        size="small"
                        error={!!validationErrors.activityDurationMinutes}
                        sx={{ width: '80px', '& .MuiInputBase-root': { height: '32px' } }}
                      />
                      </Tooltip>
                    ) : (
                      training.activityDurationMinutes
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {editingId === training.aerobicTrainingId ? (
                      <Tooltip
                      title={
                        isAddingTraining
                          ? newValidationErrors.calorieBurnt || ''
                          : editingId === training.aerobicTrainingId
                          ? validationErrors.calorieBurnt || ''
                          : ''
                      }
                      open={
                        (isAddingTraining && !!newValidationErrors.calorieBurnt) ||
                        (editingId === training.aerobicTrainingId && !!validationErrors.calorieBurnt)
                      }
                      placement="top"
                      arrow
                    >
                      <TextField
                        name="calorieBurnt"
                        type="number"
                        value={editFormData.calorieBurnt}
                        onChange={handleEditFormChange}
                        size="small"
                        error={!!validationErrors.calorieBurnt}
                        sx={{ width: '80px', '& .MuiInputBase-root': { height: '32px' } }}
                      />
                      </Tooltip>
                    ) : (
                      training.calorieBurnt
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {editingId === training.aerobicTrainingId ? (
                      <>
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<Save />}
                          onClick={() => handleSaveClick(training.aerobicTrainingId)}
                          sx={{ minWidth: '100px' }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<Cancel />}
                          onClick={handleCancelClick}
                          sx={{ minWidth: '100px' }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<FontAwesomeIcon icon={faEdit} />}
                          onClick={() => handleEditClick(training)}
                          sx={{ minWidth: '100px' }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<FontAwesomeIcon icon={faTrash} />}
                          onClick={() => deleteTraining(training.aerobicTrainingId)}
                          sx={{ minWidth: '100px' }}
                        >
                          Delete
                        </Button>
                      </>
                    )}
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
      ) : (
        <>
          {isAddingTraining && (
            <Accordion
              expanded={false}
              onChange={() => {}} // prevent collapsing when creating new training
              sx={{
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                marginBottom: '1rem',
                overflow: 'hidden',
                '&:before': { display: 'none' },
                '& .MuiAccordionSummary-root': {
                  backgroundColor: '#f5f5f5',
                  borderBottom: '1px solid #e0e0e0',
                  '&:hover': {
                    backgroundColor: '#e8e8e8',
                  }
                }
              }}
            >
              <AccordionSummary
                sx={{
                  padding: '1rem 1.5rem',
                  '& .MuiAccordionSummary-content': { 
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  },
                }}
              >
                <Typography sx={{ 
                  fontSize: '1.1rem', 
                  fontWeight: 600,
                  color: '#1976d2'
                }}>
                  New Training
                </Typography>
                <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <Tooltip title={newValidationErrors.activityType || ''} open={!!newValidationErrors.activityType} placement="top" arrow>
                    <TextField
                      name="activityType"
                      value={newTrainingFormData.activityType}
                      onChange={handleNewTrainingFormChange}
                      size="small"
                      placeholder="Enter activity type"
                      error={!!newValidationErrors.activityType}
                      sx={{ width: '200px' }}
                    />
                  </Tooltip>
                  <Tooltip title={newValidationErrors.activityDate || ''} open={!!newValidationErrors.activityDate} placement="top" arrow>
                    <TextField
                      name="activityDate"
                      type="date"
                      value={newTrainingFormData.activityDate}
                      onChange={handleNewTrainingFormChange}
                      size="small"
                      error={!!newValidationErrors.activityDate}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Tooltip>
                  <Tooltip title={newValidationErrors.activityDurationMinutes || ''} open={!!newValidationErrors.activityDurationMinutes} placement="top" arrow>
                    <TextField
                      name="activityDurationMinutes"
                      value={newTrainingFormData.activityDurationMinutes}
                      onChange={handleNewTrainingFormChange}
                      size="small"
                      type="number"
                      placeholder="Duration (min)"
                      error={!!newValidationErrors.activityDurationMinutes}
                      sx={{ width: '120px' }}
                    />
                  </Tooltip>
                  <Tooltip title={newValidationErrors.calorieBurnt || ''} open={!!newValidationErrors.calorieBurnt} placement="top" arrow>
                    <TextField
                      name="calorieBurnt"
                      value={newTrainingFormData.calorieBurnt}
                      onChange={handleNewTrainingFormChange}
                      size="small"
                      type="number"
                      placeholder="Calories"
                      error={!!newValidationErrors.calorieBurnt}
                      sx={{ width: '120px' }}
                    />
                  </Tooltip>
                  <Button
                    color="primary"
                    onClick={handleAddTrainingSave}
                    startIcon={<Save />}
                    size="small"
                  >
                    Save
                  </Button>
                  <Button
                    color="error"
                    onClick={handleAddTrainingCancel}
                    startIcon={<Cancel />}
                    size="small"
                  >
                    Cancel
                  </Button>
                </Box>
              </AccordionSummary>
            </Accordion>
          )}
          {paginatedTrainings.map((training, index) => (
            <Accordion
              key={training.aerobicTrainingId}
              sx={{
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                marginBottom: '1rem',
                overflow: 'hidden',
                '&:before': { display: 'none' },
                '& .MuiAccordionSummary-root': {
                  backgroundColor: '#f5f5f5',
                  borderBottom: '1px solid #e0e0e0',
                  '&:hover': {
                    backgroundColor: '#e8e8e8',
                  }
                },
                '& .MuiAccordionDetails-root': {
                  padding: '1.5rem',
                  backgroundColor: 'white',
                }
              }}
            >
              <AccordionSummary
                sx={{
                  padding: '1rem 1.5rem',
                  '& .MuiAccordionSummary-content': { 
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  },
                }}
              >
                <Typography sx={{ 
                  fontSize: '1.1rem', 
                  fontWeight: 600,
                  color: '#1976d2'
                }}>
                  #{page * rowsPerPage + index + 1} - {editingId === training.aerobicTrainingId ? (
                    <Tooltip title={validationErrors.activityType || ''} open={!!validationErrors.activityType} placement="top" arrow>
                      <TextField
                        name="activityType"
                        value={editFormData.activityType}
                        onChange={handleEditFormChange}
                        size="small"
                        error={!!validationErrors.activityType}
                        sx={{ width: '200px' }}
                      />
                    </Tooltip>
                  ) : (
                    training.activityType
                  )}
                </Typography>
                <Typography sx={{ 
                  color: '#666',
                  fontSize: '0.9rem'
                }}>
                  {editingId === training.aerobicTrainingId ? (
                    <Tooltip title={validationErrors.activityDate || ''} open={!!validationErrors.activityDate} placement="top" arrow>
                      <TextField
                        name="activityDate"
                        type="date"
                        value={editFormData.activityDate}
                        onChange={handleEditFormChange}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        error={!!validationErrors.activityDate}
                        sx={{ width: '150px' }}
                      />
                    </Tooltip>
                  ) : (
                    new Date(training.activityDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })
                  )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Duration</Typography>
                    {editingId === training.aerobicTrainingId ? (
                      <Tooltip title={validationErrors.activityDurationMinutes || ''} open={!!validationErrors.activityDurationMinutes} placement="top" arrow>
                        <TextField
                          name="activityDurationMinutes"
                          type="number"
                          value={editFormData.activityDurationMinutes}
                          onChange={handleEditFormChange}
                          size="small"
                          error={!!validationErrors.activityDurationMinutes}
                          fullWidth
                        />
                      </Tooltip>
                    ) : (
                      <Typography variant="body1">{training.activityDurationMinutes} minutes</Typography>
                    )}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Calories</Typography>
                    {editingId === training.aerobicTrainingId ? (
                      <Tooltip title={validationErrors.calorieBurnt || ''} open={!!validationErrors.calorieBurnt} placement="top" arrow>
                        <TextField
                          name="calorieBurnt"
                          type="number"
                          value={editFormData.calorieBurnt}
                          onChange={handleEditFormChange}
                          size="small"
                          fullWidth
                          error={!!validationErrors.calorieBurnt}
                        />
                      </Tooltip>
                    ) : (
                      <Typography variant="body1">{training.calorieBurnt}</Typography>
                    )}
                  </Box>
                </Box>
                <Box sx={{ 
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'flex-end',
                  borderTop: '1px solid #e0e0e0',
                  paddingTop: '1rem',
                  marginTop: '1rem'
                }}>
                  {editingId === training.aerobicTrainingId ? (
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<Save />}
                        onClick={() => handleSaveClick(training.aerobicTrainingId)}
                        sx={{ minWidth: '100px' }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Cancel />}
                        onClick={handleCancelClick}
                        sx={{ minWidth: '100px' }}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<FontAwesomeIcon icon={faEdit} />}
                        onClick={() => handleEditClick(training)}
                        sx={{ minWidth: '100px' }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<FontAwesomeIcon icon={faTrash} />}
                        onClick={() => deleteTraining(training.aerobicTrainingId)}
                        sx={{ minWidth: '100px' }}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
          <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            count={trainings.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}

      <div style={{ position: 'fixed', bottom: '7em', right: '3em' }}>
        <Button
          variant="fab"
          color="primary"
          onClick={handleAddTrainingClick}
          className={styles.circularButton}
          sx={{
            border: '2px solid #1976d2',
            borderRadius: '50%',
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <FontAwesomeIcon icon={faPlus} title='Add New Training' size='2x' color='#1976d2' />
        </Button>
      </div>
    </>
  );
};

export default AerobicTrainings;
