import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../CreateAerobicTraining/CreateAerobicTraining.module.css';
import { createAerobicTraining } from '../../Services/TrainingsService';
import './CreateAerobicTraining.module.css';
import { useNavigate } from 'react-router-dom';

const CreateAerobicTraining = () => {

  const [activityType, setActivityType] = useState('');
  const [activityDurationMinutes, setActivityDurationMinutes] = useState('');
  const [calorieBurnt, setCalorieBurnt] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const activityData = {
      activityType,
      activityDurationMinutes,
      calorieBurnt: parseInt(calorieBurnt, 10),
      activityDate,
    };

    // Try Catch?
    createAerobicTraining(activityData);

    navigate("/aerobic");
    // You can send this data to your server or API here
  };

  return(

    <>
    <div className={styles.CreateAerobicTraining}>
      <h2> Add Training </h2>
    </div><form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="activityType">Activity Type</label>
          <input
            type="text"
            id="activityType"
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
            required />
        </div>
        <div>
          <label htmlFor="activityDuration">Activity Duration (Minutes)</label>
          <input
            type="number"
            id="activityDuration"
            value={activityDurationMinutes}
            onChange={(e) => setActivityDurationMinutes(e.target.value)}
            required />
        </div>
        <div>
          <label htmlFor="calorieBurnt">Calorie Burnt</label>
          <input
            type="number"
            id="calorieBurnt"
            value={calorieBurnt}
            onChange={(e) => setCalorieBurnt(e.target.value)}
            required />
        </div>
        <div>
          <label htmlFor="activityDate">Date</label>
          <input
            type="datetime-local"
            id="activityDate"
            value={activityDate}
            onChange={(e) => setActivityDate(e.target.value)}
            required />
        </div>
        <button type="submit">Submit</button>
      </form></>
  )
};

CreateAerobicTraining.propTypes = {};

CreateAerobicTraining.defaultProps = {};

export default CreateAerobicTraining;
