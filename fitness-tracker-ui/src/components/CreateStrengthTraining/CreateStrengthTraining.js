import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CreateStrengthTraining.module.css';
import { createStrengthTraining } from '../../Services/TrainingsService';
import { useNavigate } from 'react-router';


const CreateStrengthTraining = ({isModalOpen, onCloseModal}) => {

  const [trainingName, setTrainingName] = useState('');
  const [trainingDate, setTrainingDate] = useState('');

  const navigate = useNavigate();
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    await createStrengthTraining({trainingName: trainingName, trainingDate: trainingDate});
    setTimeout(() => { onCloseModal(); }, 100);
    navigate("/strength");
  };

  return (
    <>
    <div className={styles.CreateStrengthTraining}>
      <h2>Add Strength Training</h2>
    </div>
    <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="trainingName">Training Name:</label>
          <input
            type="text"
            id="trainingName"
            value={trainingName}
            onChange={(e) => setTrainingName(e.target.value)}
            required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="trainingDate">Training Date:</label>
          <input
            type="date"
            id="trainingDate"
            value={trainingDate}
            onChange={(e) => setTrainingDate(e.target.value)}
            required />
        </div>
        <button type="submit">Submit</button>
      </form>
      </>
  );
};

CreateStrengthTraining.propTypes = {};

CreateStrengthTraining.defaultProps = {};

export default CreateStrengthTraining;
