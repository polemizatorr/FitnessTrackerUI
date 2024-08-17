import React from 'react';
import PropTypes from 'prop-types';
import styles from './ErrorPage.module.css';

const ErrorPage = () => (
  <div className={styles.ErrorPage} data-testid="ErrorPage">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
  </div>
);

ErrorPage.propTypes = {};

ErrorPage.defaultProps = {};

export default ErrorPage;
