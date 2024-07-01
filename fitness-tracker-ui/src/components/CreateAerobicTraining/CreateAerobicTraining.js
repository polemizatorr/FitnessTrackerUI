import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createAerobicTraining } from '../../Services/TrainingsService'
import './CreateAerobicTraining.module.css';
import { useNavigate } from 'react-router-dom';

const CreateAerobicTraining = () => {

  const [activityType, setActivityType] = useState('');
  const [activityDurationMinutes, setActivityDurationMinutes] = useState('');
  const [calorieBurnt, setCalorieBurnt] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const activityData = {
      activityType,
      activityDurationMinutes,
      calorieBurnt: parseInt(calorieBurnt, 10),
      date,
    };

    // Try Catch?
    createAerobicTraining(activityData);

    navigate("/aerobic");
    // You can send this data to your server or API here
  };

  return(
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="activityType">Activity Type</label>
        <input
          type="text"
          id="activityType"
          value={activityType}
          onChange={(e) => setActivityType(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="activityDuration">Activity Duration (Minutes)</label>
        <input
          type="number"
          id="activityDuration"
          value={activityDurationMinutes}
          onChange={(e) => setActivityDurationMinutes(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="calorieBurnt">Calorie Burnt</label>
        <input
          type="number"
          id="calorieBurnt"
          value={calorieBurnt}
          onChange={(e) => setCalorieBurnt(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input
          type="datetime-local"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
};

CreateAerobicTraining.propTypes = {};

CreateAerobicTraining.defaultProps = {};

export default CreateAerobicTraining;
