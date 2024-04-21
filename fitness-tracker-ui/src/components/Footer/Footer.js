import React from 'react';
import PropTypes from 'prop-types';
import styles from './Footer.module.css';
import Box from '@mui/material/Box';

const Footer = () => (
  <div className={styles.Footer}>
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      { footerText }
    </Box>
  </div>
);

const copyright = String.fromCodePoint('0169');
const footerText = "Fitness Tracker 2024 " + copyright + " All Rights Reserved"

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
