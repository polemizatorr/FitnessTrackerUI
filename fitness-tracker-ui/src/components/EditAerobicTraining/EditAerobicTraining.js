import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './EditAerobicTraining.module.css';
import { editAerobicTraining, getAerobicTraining } from '../../Services/TrainingsService';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditAerobicTraining = () => {

  const [training, setTraining] = useState({});
  const [loading, setLoading] = useState(true);

  const [activityType, setActivityType] = useState('');
  const [activityDurationMinutes, setActivityDurationMinutes] = useState('');
  const [calorieBurnt, setCalorieBurnt] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    getAerobicTraining(id)
      .then((res) => {
        setTraining(res.data);
        setLoading(false);
        setActivityType(res.data.activityType);
        setActivityDurationMinutes(res.data.activityDurationMinutes);
        setCalorieBurnt(res.data.calorieBurnt);
        setDate(res.data.date)
      })
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const activityData = {
      activityType,
      activityDurationMinutes,
      calorieBurnt: parseInt(calorieBurnt, 10),
      date,
    };

    // Try Catch?
    await editAerobicTraining(id, activityData);

    navigate("/aerobic");
    // You can send this data to your server or API here
  };

  if (loading) {
    return(
      <p>Loading...</p>
    )
  }

  return (
    <><div className={styles.EditAerobicTraining}>
      <h2> Edit Training </h2>
    </div>
    
    <form onSubmit={handleSubmit}>
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
          <label htmlFor="activityDurationMinutes">Activity Duration (Minutes)</label>
          <input
            type="number"
            id="activityDurationMinutes"
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
          <label htmlFor="date">Date</label>
          <input
            type="datetime-local"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required />
        </div>
        <button type="submit">Submit</button>
      </form></>
  )
  
};

EditAerobicTraining.propTypes = {};

EditAerobicTraining.defaultProps = {};

export default EditAerobicTraining;
