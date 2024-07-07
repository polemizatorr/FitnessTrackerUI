import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CreateSet.module.css';
import './CreateSet.module.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createSet } from '../../Services/TrainingsService';

const CreateSet = () => {

  const navigate = useNavigate();
  const {id} = useParams();

  const [formData, setFormData] = useState({
    repetitionsNumber: 0,
    exerciseName: '',
    exhaustionLevel: 0,
    weight: 0,
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle form submission here, for example, sending the data to an API
    await createSet(id, formData);
    navigate('/strength/' + id);
    console.log(formData);
  };



  return (
    <>
    <div className={styles.CreateSet}>
      <h2> Add set </h2>
    </div>
    
    <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="repetitionsNumber">Repetitions Number:</label>
          <input
            type="number"
            id="repetitionsNumber"
            name="repetitionsNumber"
            value={formData.repetitionsNumber}
            onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="exerciseName">Exercise Name:</label>
          <input
            type="text"
            id="exerciseName"
            name="exerciseName"
            value={formData.exerciseName}
            onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="exhaustionLevel">Exhaustion Level:</label>
          <input
            type="number"
            id="exhaustionLevel"
            name="exhaustionLevel"
            value={formData.exhaustionLevel}
            onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="weight">Weight:</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form></>
  );
};

CreateSet.propTypes = {};

CreateSet.defaultProps = {};

export default CreateSet;
