import React from 'react';
import PropTypes from 'prop-types';
import styles from './MyComponent.module.css';

const MyComponent = () => (
  <div className={styles.MyComponent}>
    MyComponent Component
  </div>
);

MyComponent.propTypes = {};

MyComponent.defaultProps = {};

export default MyComponent;
