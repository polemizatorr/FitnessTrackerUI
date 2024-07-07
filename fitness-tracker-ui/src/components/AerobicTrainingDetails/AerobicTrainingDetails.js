import React from 'react';
import styles from './AerobicTrainingDetails.module.css';
import { getAerobicTraining } from '../../Services/TrainingsService';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AerobicTrainingDetails = () => {

  const [training, setTrainings] = useState({});
  const [loading, setLoading] = useState(true);

  const {id} = useParams();
  useEffect(() => {
    getAerobicTraining(id)
      .then((res) => {
        setTrainings(res.data);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return(
      <p>Loading...</p>
    )
  }

  return (
  <>  
    <div className="training-details">
      <h2>Training Details</h2>
      <p><strong>Activity Name:</strong> {training.activityType}</p>
      <p><strong>Activity Duration :</strong> {training.activityDurationMinutes} Mins</p>
      <p><strong>Calories Burnt:</strong> {training.calorieBurnt} kcal</p>
      <p><strong>Activity Date:</strong> {new Date(training.activityDate).toLocaleDateString()}</p>
    </div>
  </>
  )
};


AerobicTrainingDetails.propTypes = {};

AerobicTrainingDetails.defaultProps = {};

export default AerobicTrainingDetails;
