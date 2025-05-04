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
  Box,
  TablePagination,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  CircularProgress
} from '@mui/material';
import { ExpandMore, Save, Cancel } from '@mui/icons-material';
import { getStrengthTrainingsForUser, deleteStrengthTraining, exportAllStrengthTrainings, editStrengthTraining, editStrengthTrainingSet, createStrengthTrainingSet, createStrengthTraining, deleteSet } from '../../Services/TrainingsService';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../StrengthTrainings/StrengthTrainings.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faTable, faList, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';

const StrengthTrainings = () => {
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
    trainingName: '',
    trainingDate: ''
  });
  const [editFormErrors, setEditFormErrors] = useState({
    trainingName: false,
    trainingDate: false
  });
  const [editingSetId, setEditingSetId] = useState(null);
  const [editSetFormData, setEditSetFormData] = useState({
    setId: '',
    exerciseName: '',
    repetitionsNumber: '',
    weight: '',
    exhaustionLevel: ''
  });
  const [editSetValidationErrors, setEditSetValidationErrors] = useState({});
  const [addingSetId, setAddingSetId] = useState(null);
  const [newSetFormData, setNewSetFormData] = useState({
    setId: '',
    exerciseName: '',
    repetitionsNumber: '',
    weight: '',
    exhaustionLevel: ''
  });
  const [newSetValidationErrors, setNewSetValidationErrors] = useState({});
  const [expandedRow, setExpandedRow] = useState(null);
  const [isAddingTraining, setIsAddingTraining] = useState(false);
  const [newTrainingFormData, setNewTrainingFormData] = useState({
    trainingName: '',
    trainingDate: new Date().toISOString().split('T')[0]
  });

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewModeChange = (event, newView) => {
    if (newView !== null) setViewMode(newView);
  };

  const handleEditClick = (training) => {
    setEditingId(training.strenghtTrainingId);
    const date = new Date(training.trainingDate);
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    const formattedDate = adjustedDate.toISOString().split('T')[0];
    
    setEditFormData({
      trainingName: training.trainingName,
      trainingDate: formattedDate
    });
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setEditFormErrors(prev => ({
      ...prev,
      [name]: false
    }));
  };

  const validateTrainingForm = (formData) => {
    const errors = {};
  
    if (!formData.trainingName || formData.trainingName.trim().length === 0) {
      errors.trainingName = 'Training name is required';
    } else if (formData.trainingName.length > 50) {
      errors.trainingName = 'Max 50 characters allowed';
    }
  
    if (!formData.trainingDate) {
      errors.trainingDate = 'Training date is required';
    }
  
    return errors;
  };

  const handleSaveClick = async (id) => {
    const errors = validateTrainingForm(editFormData);
    if (Object.keys(errors).length > 0) {
      setEditFormErrors(errors);
      return;
    }

    setEditFormErrors({});
    try {
      await editStrengthTraining(id, editFormData);
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error("Error updating training:", error);
    }
  };

  const handleSetEditClick = (set) => {
    setEditingSetId(set.setId);
    setEditSetFormData({
      setId: set.setId,
      exerciseName: set.exerciseName,
      repetitionsNumber: set.repetitionsNumber,
      weight: set.weight,
      exhaustionLevel: set.exhaustionLevel
    });
  };

  const handleSetCancelClick = () => {
    setEditingSetId(null);
    setEditSetValidationErrors({});
  };

  const validateSetForm = (formData) => {
    const errors = {};
  
    if (!formData.exerciseName || formData.exerciseName.trim().length === 0) {
      errors.exerciseName = 'Exercise name is required';
    } else if (formData.exerciseName.length > 50) {
      errors.exerciseName = 'Max 50 characters allowed';
    }
  
    if (!formData.repetitionsNumber || formData.repetitionsNumber.toString().trim() === '') {
      errors.repetitionsNumber = 'Repetitions is required';
    } else if (!/^\d+$/.test(formData.repetitionsNumber.toString())) {
      errors.repetitionsNumber = 'Invalid value';
    } else if (Number(formData.repetitionsNumber) <= 0) {
      errors.repetitionsNumber = 'Repetitions must be a number > 0';
    }
  
    if (!formData.weight || formData.weight.toString().trim() === '') {
      errors.weight = 'Weight is required';
    } else if (!/^\d+$/.test(formData.weight.toString())) {
      errors.weight = 'Invalid value';
    } else if (Number(formData.weight) <= 0) {
      errors.weight = 'Weight must be a number > 0';
    }
  
    if (!formData.exhaustionLevel || formData.exhaustionLevel.toString().trim() === '') {
      errors.exhaustionLevel = 'Exhaustion level is required';
    } else if (!/^\d+$/.test(formData.exhaustionLevel.toString())) {
      errors.exhaustionLevel = 'Invalid value';
    } else if (Number(formData.exhaustionLevel) < 1 || Number(formData.exhaustionLevel) > 10) {
      errors.exhaustionLevel = 'Exhaustion level must be between 1 and 10';
    }
  
    return errors;
  };

  const handleSetFormChange = (event, setId) => {
    const { name, value } = event.target;
    setEditSetFormData(prev => ({
      ...prev,
      [name]: value,
      setId: setId
    }));
    // Clear error when user starts typing
    setEditSetValidationErrors(prev => ({
      ...prev,
      [name]: false
    }));
  };

  const handleSetSaveClick = async (setId) => {
    const errors = validateSetForm(editSetFormData);
    if (Object.keys(errors).length > 0) {
      setEditSetValidationErrors(errors);
      return;
    }

    setEditSetValidationErrors({});
    try {
      const dataToSend = {
        ...editSetFormData,
        setId: setId
      };
      await editStrengthTrainingSet(setId, dataToSend);
      setEditingSetId(null);
      fetchData();
    } catch (error) {
      console.error("Error updating set:", error);
    }
  };

  const handleAddSetClick = (trainingId) => {
    setAddingSetId(trainingId);
    setNewSetFormData({
      exerciseName: '',
      repetitionsNumber: '',
      weight: '',
      exhaustionLevel: ''
    });
  };

  const handleNewSetFormChange = (event) => {
    const { name, value } = event.target;
    setNewSetFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setNewSetValidationErrors(prev => ({
      ...prev,
      [name]: false
    }));
  };

  const handleAddSetCancel = () => {
    setAddingSetId(null);
    setNewSetValidationErrors({});
  };

  const handleAddSetSave = async (trainingId) => {
    const errors = validateSetForm(newSetFormData);
    if (Object.keys(errors).length > 0) {
      setNewSetValidationErrors(errors);
      return;
    }

    setNewSetValidationErrors({});
    try {
      await createStrengthTrainingSet(trainingId, newSetFormData);
      setAddingSetId(null);
      fetchData();
    } catch (error) {
      console.error("Error adding set:", error);
    }
  };

  const exportTrainingsToFile = async () => {
    const res = await exportAllStrengthTrainings();
    console.log(res);
  };

  const fetchData = async () => {
    try {
      const res = await getStrengthTrainingsForUser(username);
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
    await deleteStrengthTraining(id);
    fetchData();
  };

  const paginatedTrainings = rowsPerPage === -1
    ? trainings
    : trainings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleRowExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleAddTrainingClick = () => {
    setIsAddingTraining(true);
    setNewTrainingFormData({
      trainingName: '',
      trainingDate: new Date().toISOString().split('T')[0]
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
  };

  const handleAddTrainingSave = async () => {
    const errors = validateTrainingForm(newTrainingFormData);
    if (Object.keys(errors).length > 0) {
      setEditFormErrors(errors);
      return;
    }

    setEditFormErrors({});
    try {
      await createStrengthTraining(newTrainingFormData);
      setIsAddingTraining(false);
      fetchData();
    } catch (error) {
      console.error("Error adding training:", error);
    }
  };

  const handleDeleteSet = async (setId) => {
    try {
      await deleteSet(setId);
      fetchData();
    } catch (error) {
      console.error("Error deleting set:", error);
    }
  };

  const handleNumericInput = (event) => {

    if ([46, 8, 9, 27, 13, 110, 190].indexOf(event.keyCode) !== -1 ||

      (event.keyCode === 65 && event.ctrlKey === true) ||
      (event.keyCode === 67 && event.ctrlKey === true) ||
      (event.keyCode === 86 && event.ctrlKey === true) ||
      (event.keyCode === 88 && event.ctrlKey === true) ||

      (event.keyCode >= 35 && event.keyCode <= 39)) {
      return;
    }

    if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
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
          <h2>Strength Trainings</h2>
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
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {isAddingTraining && (
                <TableRow>
                  <TableCell align="left">New</TableCell>
                  <TableCell align="left">
                    <Tooltip
                      title={editFormErrors.trainingName || ''}
                      open={!!editFormErrors.trainingName}
                      placement="top"
                      arrow
                    >
                      <TextField
                        name="trainingName"
                        value={newTrainingFormData.trainingName}
                        onChange={handleNewTrainingFormChange}
                        size="small"
                        fullWidth
                        placeholder="Enter training name"
                        error={!!editFormErrors.trainingName}
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      name="trainingDate"
                      type="date"
                      value={newTrainingFormData.trainingDate}
                      onChange={handleNewTrainingFormChange}
                      size="small"
                      InputLabelProps={{ shrink: true }}
                    />
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
                <React.Fragment key={training.strenghtTrainingId}>
                  <TableRow>
                    <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell align="left">
                      {editingId === training.strenghtTrainingId ? (
                        <Tooltip
                          title={editFormErrors.trainingName || ''}
                          open={!!editFormErrors.trainingName}
                          placement="top"
                          arrow
                        >
                          <TextField
                            name="trainingName"
                            value={editFormData.trainingName}
                            onChange={handleEditFormChange}
                            size="small"
                            error={!!editFormErrors.trainingName}
                            sx={{ '& .MuiInputBase-root': { height: '32px' } }}
                          />
                        </Tooltip>
                      ) : (
                        training.trainingName
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {editingId === training.strenghtTrainingId ? (
                        <TextField
                          name="trainingDate"
                          type="date"
                          value={editFormData.trainingDate}
                          onChange={handleEditFormChange}
                          size="small"
                          InputLabelProps={{ shrink: true }}
                        />
                      ) : (
                        new Date(training.trainingDate).toLocaleDateString()
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {editingId === training.strenghtTrainingId ? (
                        <>
                          <Button
                            color="primary"
                            onClick={() => handleSaveClick(training.strenghtTrainingId)}
                            startIcon={<Save />}
                          >
                            Save
                          </Button>
                          <Button
                            color="error"
                            onClick={handleCancelClick}
                            startIcon={<Cancel />}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            color="primary"
                            onClick={() => handleEditClick(training)}
                          >
                            <FontAwesomeIcon icon={faEdit} title='Edit' className={styles.IconsSize} />
                          </Button>
                          <Button
                            color="primary"
                            onClick={() => handleRowExpand(training.strenghtTrainingId)}
                          >
                            <FontAwesomeIcon icon={expandedRow === training.strenghtTrainingId ? faEyeSlash : faEye} 
                              title={expandedRow === training.strenghtTrainingId ? 'Hide Sets' : 'View Sets'} 
                              className={styles.IconsSize} 
                            />
                          </Button>
                          <Button
                            color="primary"
                            onClick={() => deleteTraining(training.strenghtTrainingId)}
                          >
                            <FontAwesomeIcon icon={faTrash} title='Delete' className={styles.IconsSize} />
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                  {expandedRow === training.strenghtTrainingId && (
                    <TableRow>
                      <TableCell colSpan={4} sx={{ padding: 0, borderBottom: 'none' }}>
                        <Box sx={{ padding: '1rem', backgroundColor: '#fafafa' }}>
                          {training.sets && training.sets.length > 0 ? (
                            <TableContainer 
                              component={Paper} 
                              sx={{ 
                                borderRadius: '12px',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden'
                              }}
                            >
                              <Table size="small" sx={{ minWidth: 650 }}>
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
                                    <TableCell align="left">Exercise</TableCell>
                                    <TableCell align="left">Reps</TableCell>
                                    <TableCell align="left">Weight (kg)</TableCell>
                                    <TableCell align="left">Exhaustion</TableCell>
                                    <TableCell align="left">Actions</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {training.sets.map((set, setIndex) => (
              <TableRow
                                      key={set.setId}
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
                                      <TableCell align="left" sx={{ fontWeight: 500, padding: '8px 16px' }}>
                                        {editingSetId === set.setId ? (
                                          <Tooltip
                                            title={editSetValidationErrors.exerciseName || ''}
                                            open={!!editSetValidationErrors.exerciseName}
                                            placement="top"
                                            arrow
                                          >
                                            <TextField
                                              name="exerciseName"
                                              value={editSetFormData.exerciseName}
                                              onChange={(e) => handleSetFormChange(e, set.setId)}
                                              size="small"
                                              fullWidth
                                              error={!!editSetValidationErrors.exerciseName}
                                              sx={{ '& .MuiInputBase-root': { height: '32px' } }}
                                              onKeyDown={handleNumericInput}
                                            />
                                          </Tooltip>
                                        ) : (
                                          set.exerciseName
                                        )}
                                      </TableCell>
                                      <TableCell align="left" sx={{ padding: '8px 16px' }}>
                                        {editingSetId === set.setId ? (
                                          <Tooltip
                                            title={editSetValidationErrors.repetitionsNumber || ''}
                                            open={!!editSetValidationErrors.repetitionsNumber}
                                            placement="top"
                                            arrow
                                          >
                                            <TextField
                                              name="repetitionsNumber"
                                              type="number"
                                              value={editSetFormData.repetitionsNumber}
                                              onChange={(e) => handleSetFormChange(e, set.setId)}
                                              size="small"
                                              error={!!editSetValidationErrors.repetitionsNumber}
                                              sx={{ width: '80px', '& .MuiInputBase-root': { height: '32px' } }}
                                              inputProps={{ 
                                                min: 1,
                                                step: 1,
                                                inputMode: 'numeric',
                                                pattern: '[0-9]*'
                                              }}
                                              onKeyDown={handleNumericInput}
                                            />
                                          </Tooltip>
                                        ) : (
                                          set.repetitionsNumber
                                        )}
                                      </TableCell>
                                      <TableCell align="left" sx={{ padding: '8px 16px' }}>
                                        {editingSetId === set.setId ? (
                                          <Tooltip
                                            title={editSetValidationErrors.weight || ''}
                                            open={!!editSetValidationErrors.weight}
                                            placement="top"
                                            arrow
                                          >
                                            <TextField
                                              name="weight"
                                              type="number"
                                              value={editSetFormData.weight}
                                              onChange={(e) => handleSetFormChange(e, set.setId)}
                                              size="small"
                                              error={!!editSetValidationErrors.weight}
                                              sx={{ width: '80px', '& .MuiInputBase-root': { height: '32px' } }}
                                              inputProps={{ 
                                                min: 1,
                                                step: 1,
                                                inputMode: 'numeric',
                                                pattern: '[0-9]*'
                                              }}
                                              onKeyDown={handleNumericInput}
                                            />
                                          </Tooltip>
                                        ) : (
                                          set.weight
                                        )}
                                      </TableCell>
                                      <TableCell align="left" sx={{ padding: '8px 16px' }}>
                                        {editingSetId === set.setId ? (
                                          <Tooltip
                                            title={editSetValidationErrors.exhaustionLevel || ''}
                                            open={!!editSetValidationErrors.exhaustionLevel}
                                            placement="top"
                                            arrow
                                          >
                                            <TextField
                                              name="exhaustionLevel"
                                              type="number"
                                              value={editSetFormData.exhaustionLevel}
                                              onChange={(e) => handleSetFormChange(e, set.setId)}
                                              size="small"
                                              error={!!editSetValidationErrors.exhaustionLevel}
                                              sx={{ width: '80px', '& .MuiInputBase-root': { height: '32px' } }}
                                              inputProps={{ 
                                                min: 1,
                                                max: 10,
                                                step: 1,
                                                inputMode: 'numeric',
                                                pattern: '[0-9]*'
                                              }}
                                              onKeyDown={handleNumericInput}
                                            />
                                          </Tooltip>
                                        ) : (
                                          <Box 
                                            sx={{ 
                                              display: 'inline-flex',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              width: '24px',
                                              height: '24px',
                                              borderRadius: '50%',
                                              backgroundColor: set.exhaustionLevel >= 8 ? '#f44336' : 
                                                            set.exhaustionLevel >= 6 ? '#ff9800' : 
                                                            set.exhaustionLevel >= 4 ? '#ffeb3b' : 
                                                            '#4caf50',
                                              color: set.exhaustionLevel >= 4 ? 'white' : 'black',
                                              fontWeight: 600,
                                              fontSize: '0.8rem'
                                            }}
                                          >
                                            {set.exhaustionLevel}
                                          </Box>
                                        )}
                                      </TableCell>
                                      <TableCell align="left" sx={{ padding: '8px 16px' }}>
                                        {editingSetId === set.setId ? (
                                          <>
                                            <Button
                                              color="primary"
                                              onClick={() => handleSetSaveClick(set.setId)}
                                              startIcon={<Save />}
                                              size="small"
                                            >
                                              Save
                                            </Button>
                                            <Button
                                              color="error"
                                              onClick={handleSetCancelClick}
                                              startIcon={<Cancel />}
                                              size="small"
                                            >
                                              Cancel
                                            </Button>
                                          </>
                                        ) : (
                                          <>
                                            <Button
                                              color="primary"
                                              onClick={() => handleSetEditClick(set)}
                                              size="small"
                                            >
                                              <FontAwesomeIcon icon={faEdit} title='Edit' className={styles.IconsSize} />
                  </Button>
                                            <Button
                                              color="error"
                                              onClick={() => handleDeleteSet(set.setId)}
                                              size="small"
                                            >
                    <FontAwesomeIcon icon={faTrash} title='Delete' className={styles.IconsSize} />
                  </Button>
                                          </>
                                        )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
                            </TableContainer>
                          ) : (
                            <Typography 
                              color="text.secondary" 
                              sx={{ 
                                textAlign: 'center',
                                padding: '2rem',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                                color: '#666'
                              }}
                            >
                              No sets recorded for this training
                            </Typography>
                          )}
                          <Box sx={{ marginTop: '1rem' }}>
                            {addingSetId === training.strenghtTrainingId ? (
                              <Paper sx={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                                <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                  <Tooltip title={newSetValidationErrors.exerciseName || ''} open={!!newSetValidationErrors.exerciseName} placement="top" arrow>
                                    <TextField
                                      name="exerciseName"
                                      label="Exercise"
                                      value={newSetFormData.exerciseName}
                                      onChange={handleNewSetFormChange}
                                      size="small"
                                      error={!!newSetValidationErrors.exerciseName}
                                      sx={{ flex: 2 }}
                                    />
                                  </Tooltip>
                                  <Tooltip title={newSetValidationErrors.repetitionsNumber || ''} open={!!newSetValidationErrors.repetitionsNumber} placement="top" arrow>
                                    <TextField
                                      name="repetitionsNumber"
                                      label="Reps"
                                      type="number"
                                      value={newSetFormData.repetitionsNumber}
                                      onChange={handleNewSetFormChange}
                                      size="small"
                                      error={!!newSetValidationErrors.repetitionsNumber}
                                      sx={{ width: '100px' }}
                                      inputProps={{ 
                                        min: 1,
                                        step: 1,
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*'
                                      }}
                                    />
                                  </Tooltip>
                                  <Tooltip title={newSetValidationErrors.weight || ''} open={!!newSetValidationErrors.weight} placement="top" arrow>
                                    <TextField
                                      name="weight"
                                      label="Weight (kg)"
                                      type="number"
                                      value={newSetFormData.weight}
                                      onChange={handleNewSetFormChange}
                                      size="small"
                                      error={!!newSetValidationErrors.weight}
                                      sx={{ width: '120px' }}
                                      inputProps={{ 
                                        min: 1,
                                        step: 1,
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*'
                                      }}
                                    />
                                  </Tooltip>
                                  <Tooltip title={newSetValidationErrors.exhaustionLevel || ''} open={!!newSetValidationErrors.exhaustionLevel} placement="top" arrow>
                                    <TextField
                                      name="exhaustionLevel"
                                      label="Exhaustion"
                                      type="number"
                                      value={newSetFormData.exhaustionLevel}
                                      onChange={handleNewSetFormChange}
                                      size="small"
                                      error={!!newSetValidationErrors.exhaustionLevel}
                                      inputProps={{ 
                                        min: 1,
                                        max: 10,
                                        step: 1,
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*'
                                      }}
                                      sx={{ width: '120px' }}
                                    />
                                  </Tooltip>
                                  <Button
                                    color="primary"
                                    onClick={() => handleAddSetSave(training.strenghtTrainingId)}
                                    startIcon={<Save />}
                                    size="small"
                                  >
                                    Add
                                  </Button>
                                  <Button
                                    color="error"
                                    onClick={handleAddSetCancel}
                                    startIcon={<Cancel />}
                                    size="small"
                                  >
                                    Cancel
                                  </Button>
                                </Box>
                              </Paper>
                            ) : (
                              <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<FontAwesomeIcon icon={faPlus} />}
                                onClick={() => handleAddSetClick(training.strenghtTrainingId)}
                                sx={{ width: '100%' }}
                              >
                                Add New Set
                              </Button>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
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
                  <Tooltip
                    title={editFormErrors.trainingName || ''}
                    open={!!editFormErrors.trainingName}
                    placement="top"
                    arrow
                  >
                    <TextField
                      name="trainingName"
                      value={newTrainingFormData.trainingName}
                      onChange={handleNewTrainingFormChange}
                      size="small"
                      fullWidth
                      placeholder="Enter training name"
                      error={!!editFormErrors.trainingName}
                    />
                  </Tooltip>
                  <TextField
                    name="trainingDate"
                    type="date"
                    value={newTrainingFormData.trainingDate}
                    onChange={handleNewTrainingFormChange}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
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
              key={training.strenghtTrainingId}
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
                expandIcon={<ExpandMore />}
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
                  #{page * rowsPerPage + index + 1} - {editingId === training.strenghtTrainingId ? (
                    <Tooltip title={editFormErrors.trainingName || ''} open={!!editFormErrors.trainingName} placement="top" arrow>
                      <TextField
                        name="trainingName"
                        value={editFormData.trainingName}
                        onChange={handleEditFormChange}
                        size="small"
                        error={!!editFormErrors.trainingName}
                        sx={{ width: '200px' }}
                      />
                    </Tooltip>
                  ) : (
                    training.trainingName
                  )}
                </Typography>
                <Typography sx={{ 
                  color: '#666',
                  fontSize: '0.9rem'
                }}>
                  {editingId === training.strenghtTrainingId ? (
                    <TextField
                      name="trainingDate"
                      type="date"
                      value={editFormData.trainingDate}
                      onChange={handleEditFormChange}
                      size="small"
                      InputLabelProps={{ shrink: true }}
                    />
                  ) : (
                    new Date(training.trainingDate).toLocaleDateString()
                  )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {training.sets && training.sets.length > 0 ? (
                  <TableContainer 
                    component={Paper} 
                    sx={{ 
                      marginBottom: '1.5rem',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      overflow: 'hidden'
                    }}
                  >
                    <Table size="small" sx={{ minWidth: 650 }}>
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
                          <TableCell align="left">Exercise</TableCell>
                          <TableCell align="left">Reps</TableCell>
                          <TableCell align="left">Weight (kg)</TableCell>
                          <TableCell align="left">Exhaustion</TableCell>
                          <TableCell align="left">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {training.sets.map((set, setIndex) => (
                          <TableRow 
                            key={set.setId}
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
                            <TableCell align="left" sx={{ fontWeight: 500, padding: '8px 16px' }}>
                              {editingSetId === set.setId ? (
                                <Tooltip
                                  title={editSetValidationErrors.exerciseName || ''}
                                  open={!!editSetValidationErrors.exerciseName}
                                  placement="top"
                                  arrow
                                >
                                  <TextField
                                    name="exerciseName"
                                    value={editSetFormData.exerciseName}
                                    onChange={(e) => handleSetFormChange(e, set.setId)}
                                    size="small"
                                    fullWidth
                                    error={!!editSetValidationErrors.exerciseName}
                                    sx={{ '& .MuiInputBase-root': { height: '32px' } }}
                                    onKeyDown={handleNumericInput}
                                  />
                                </Tooltip>
                              ) : (
                                set.exerciseName
                              )}
                            </TableCell>
                            <TableCell align="left" sx={{ padding: '8px 16px' }}>
                              {editingSetId === set.setId ? (
                                <Tooltip
                                  title={editSetValidationErrors.repetitionsNumber || ''}
                                  open={!!editSetValidationErrors.repetitionsNumber}
                                  placement="top"
                                  arrow
                                >
                                  <TextField
                                    name="repetitionsNumber"
                                    type="number"
                                    value={editSetFormData.repetitionsNumber}
                                    onChange={(e) => handleSetFormChange(e, set.setId)}
                                    size="small"
                                    error={!!editSetValidationErrors.repetitionsNumber}
                                    sx={{ width: '80px', '& .MuiInputBase-root': { height: '32px' } }}
                                    inputProps={{ 
                                      min: 1,
                                      step: 1,
                                      inputMode: 'numeric',
                                      pattern: '[0-9]*'
                                    }}
                                    onKeyDown={handleNumericInput}
                                  />
                                </Tooltip>
                              ) : (
                                set.repetitionsNumber
                              )}
                            </TableCell>
                            <TableCell align="left" sx={{ padding: '8px 16px' }}>
                              {editingSetId === set.setId ? (
                                <Tooltip
                                  title={editSetValidationErrors.weight || ''}
                                  open={!!editSetValidationErrors.weight}
                                  placement="top"
                                  arrow
                                >
                                  <TextField
                                    name="weight"
                                    type="number"
                                    value={editSetFormData.weight}
                                    onChange={(e) => handleSetFormChange(e, set.setId)}
                                    size="small"
                                    error={!!editSetValidationErrors.weight}
                                    sx={{ width: '80px', '& .MuiInputBase-root': { height: '32px' } }}
                                    inputProps={{ 
                                      min: 1,
                                      step: 1,
                                      inputMode: 'numeric',
                                      pattern: '[0-9]*'
                                    }}
                                    onKeyDown={handleNumericInput}
                                  />
                                </Tooltip>
                              ) : (
                                set.weight
                              )}
                            </TableCell>
                            <TableCell align="left" sx={{ padding: '8px 16px' }}>
                              {editingSetId === set.setId ? (
                                <Tooltip
                                  title={editSetValidationErrors.exhaustionLevel || ''}
                                  open={!!editSetValidationErrors.exhaustionLevel}
                                  placement="top"
                                  arrow
                                >
                                  <TextField
                                    name="exhaustionLevel"
                                    type="number"
                                    value={editSetFormData.exhaustionLevel}
                                    onChange={(e) => handleSetFormChange(e, set.setId)}
                                    size="small"
                                    error={!!editSetValidationErrors.exhaustionLevel}
                                    sx={{ width: '80px', '& .MuiInputBase-root': { height: '32px' } }}
                                    inputProps={{ 
                                      min: 1,
                                      max: 10,
                                      step: 1,
                                      inputMode: 'numeric',
                                      pattern: '[0-9]*'
                                    }}
                                    onKeyDown={handleNumericInput}
                                  />
                                </Tooltip>
                              ) : (
                                <Box 
                                  sx={{ 
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    backgroundColor: set.exhaustionLevel >= 8 ? '#f44336' : 
                                                          set.exhaustionLevel >= 6 ? '#ff9800' : 
                                                          set.exhaustionLevel >= 4 ? '#ffeb3b' : 
                                                          '#4caf50',
                                    color: set.exhaustionLevel >= 4 ? 'white' : 'black',
                                    fontWeight: 600,
                                    fontSize: '0.8rem'
                                  }}
                                >
                                  {set.exhaustionLevel}
                                </Box>
                              )}
                            </TableCell>
                            <TableCell align="left" sx={{ padding: '8px 16px' }}>
                              {editingSetId === set.setId ? (
                                <>
                                  <Button
                                    color="primary"
                                    onClick={() => handleSetSaveClick(set.setId)}
                                    startIcon={<Save />}
                                    size="small"
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    color="error"
                                    onClick={handleSetCancelClick}
                                    startIcon={<Cancel />}
                                    size="small"
                                  >
                                    Cancel
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    color="primary"
                                    onClick={() => handleSetEditClick(set)}
                                    size="small"
                                  >
                                    <FontAwesomeIcon icon={faEdit} title='Edit' className={styles.IconsSize} />
                                  </Button>
                                  <Button
                                    color="error"
                                    onClick={() => handleDeleteSet(set.setId)}
                                    size="small"
                                  >
                                    <FontAwesomeIcon icon={faTrash} title='Delete' className={styles.IconsSize} />
                                  </Button>
                                </>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography 
                    color="text.secondary" 
                    sx={{ 
                      marginBottom: '1.5rem',
                      textAlign: 'center',
                      padding: '2rem',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '8px',
                      color: '#666'
                    }}
                  >
                    No sets recorded for this training
                  </Typography>
                )}
                <Box sx={{ marginTop: '1rem' }}>
                  {addingSetId === training.strenghtTrainingId ? (
                    <Paper sx={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Tooltip title={newSetValidationErrors.exerciseName || ''} open={!!newSetValidationErrors.exerciseName} placement="top" arrow>
                          <TextField
                            name="exerciseName"
                            label="Exercise"
                            value={newSetFormData.exerciseName}
                            onChange={handleNewSetFormChange}
                            size="small"
                            error={!!newSetValidationErrors.exerciseName}
                            sx={{ flex: 2 }}
                          />
                        </Tooltip>
                        <Tooltip title={newSetValidationErrors.repetitionsNumber || ''} open={!!newSetValidationErrors.repetitionsNumber} placement="top" arrow>
                          <TextField
                            name="repetitionsNumber"
                            label="Reps"
                            type="number"
                            value={newSetFormData.repetitionsNumber}
                            onChange={handleNewSetFormChange}
                            size="small"
                            error={!!newSetValidationErrors.repetitionsNumber}
                            sx={{ width: '100px' }}
                            inputProps={{ 
                              min: 1,
                              step: 1,
                              inputMode: 'numeric',
                              pattern: '[0-9]*'
                            }}
                          />
                        </Tooltip>
                        <Tooltip title={newSetValidationErrors.weight || ''} open={!!newSetValidationErrors.weight} placement="top" arrow>
                          <TextField
                            name="weight"
                            label="Weight (kg)"
                            type="number"
                            value={newSetFormData.weight}
                            onChange={handleNewSetFormChange}
                            size="small"
                            error={!!newSetValidationErrors.weight}
                            sx={{ width: '120px' }}
                            inputProps={{ 
                              min: 1,
                              step: 1,
                              inputMode: 'numeric',
                              pattern: '[0-9]*'
                            }}
                          />
                        </Tooltip>
                        <Tooltip title={newSetValidationErrors.exhaustionLevel || ''} open={!!newSetValidationErrors.exhaustionLevel} placement="top" arrow>
                          <TextField
                            name="exhaustionLevel"
                            label="Exhaustion"
                            type="number"
                            value={newSetFormData.exhaustionLevel}
                            onChange={handleNewSetFormChange}
                            size="small"
                            error={!!newSetValidationErrors.exhaustionLevel}
                            inputProps={{ 
                              min: 1,
                              max: 10,
                              step: 1,
                              inputMode: 'numeric',
                              pattern: '[0-9]*'
                            }}
                            sx={{ width: '120px' }}
                          />
                        </Tooltip>
                        <Button
                          color="primary"
                          onClick={() => handleAddSetSave(training.strenghtTrainingId)}
                          startIcon={<Save />}
                          size="small"
                        >
                          Add
                        </Button>
                        <Button
                          color="error"
                          onClick={handleAddSetCancel}
                          startIcon={<Cancel />}
                          size="small"
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Paper>
                  ) : (
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<FontAwesomeIcon icon={faPlus} />}
                      onClick={() => handleAddSetClick(training.strenghtTrainingId)}
                      sx={{ width: '100%' }}
                    >
                      Add New Set
                    </Button>
                  )}
                </Box>
                <Box sx={{ 
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'flex-end',
                  borderTop: '1px solid #e0e0e0',
                  paddingTop: '1rem',
                  marginTop: '1rem'
                }}>
                  {editingId === training.strenghtTrainingId ? (
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<Save />}
                        onClick={() => handleSaveClick(training.strenghtTrainingId)}
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
                        onClick={() => deleteTraining(training.strenghtTrainingId)}
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

export default StrengthTrainings;