import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CreateSet.module.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createSet } from '../../Services/TrainingsService';

const CreateSet = ({ isModalOpen, onCloseModal }) => {
  const navigate = useNavigate();
  const { id } = useParams();

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
    await createSet(id, formData);
    
    setTimeout(() => { onCloseModal(); }, 100);
    navigate('/strength/' + id);
  };

  return (
    <>
      <div className={styles.CreateSet}>
        <h2>Add Set</h2>
      </div>

      <form className={styles['form-container']} onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor="repetitionsNumber">
            Repetitions Number:
          </label>
          <input
            type="number"
            id="repetitionsNumber"
            name="repetitionsNumber"
            className={styles['form-input']}
            value={formData.repetitionsNumber}
            onChange={handleChange}
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="exerciseName">
            Exercise Name:
          </label>
          <input
            type="text"
            id="exerciseName"
            name="exerciseName"
            className={styles['form-input']}
            value={formData.exerciseName}
            onChange={handleChange}
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="exhaustionLevel">
            Exhaustion Level:
          </label>
          <input
            type="number"
            id="exhaustionLevel"
            name="exhaustionLevel"
            className={styles['form-input']}
            value={formData.exhaustionLevel}
            onChange={handleChange}
          />
        </div>
        <div className={styles['form-group']} style={{ marginBottom: '20px', marginTop: '10px' }}>
          <label htmlFor="weight">
            Weight:
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            className={styles['form-input']}
            value={formData.weight}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={styles['form-button']}>Submit</button>
      </form>
    </>
  );
};

CreateSet.propTypes = {};

CreateSet.defaultProps = {};

export default CreateSet;
