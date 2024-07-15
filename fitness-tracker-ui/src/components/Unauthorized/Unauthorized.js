import React from 'react';
import PropTypes from 'prop-types';
import styles from './Unauthorized.module.css';

const Unauthorized = () => (
  <div className={styles.Unauthorized}>
    <h1>401</h1>
      <h2>Unauthorized</h2>
      <p>Sorry, You are not authorized to access this page.</p>
  </div>
);

Unauthorized.propTypes = {};

Unauthorized.defaultProps = {};

export default Unauthorized;
