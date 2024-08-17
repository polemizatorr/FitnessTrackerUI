import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CreateStrengthTraining.module.css';
import { createStrengthTraining } from '../../Services/TrainingsService';
import { useNavigate } from 'react-router';


const CreateStrengthTraining = () => {

  const [trainingName, setTrainingName] = useState('');
  const [trainingDate, setTrainingDate] = useState('');

  const navigate = useNavigate();
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic here

    await createStrengthTraining({trainingName: trainingName, trainingDate: trainingDate});
    navigate("/strength");
    // You can add further logic like sending data to an API, etc.
  };

  return (
    <>
    <div className={styles.CreateStrengthTraining}>
      CreateStrengthTraining Component
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
        <div>
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
