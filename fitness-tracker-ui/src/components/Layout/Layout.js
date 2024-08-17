import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';
import TopNavigation from '../TopNavigation/TopNavigation';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {


  return (
  <>
  <TopNavigation />
  { children }


  <Footer />
  </>
  )
};

Layout.propTypes = {};

Layout.defaultProps = {};

export default Layout;


// const Wrapper = ({ children }) => {
//   return <div className="wrapper">{children}</div>;
// };