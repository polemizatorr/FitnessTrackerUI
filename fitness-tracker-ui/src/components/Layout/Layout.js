import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';
import TopNavigation from '../TopNavigation/TopNavigation';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {


  return (
    <div className="main-layout">
      <>
      <div className="top-nav">
        <TopNavigation />
      </div>
      
      <div className="main-content">
        { children }
      </div>
      
      <div className='footer'>
        <Footer />
      </div>
      
      </>
    </div>
  
  )
};

Layout.propTypes = {};

Layout.defaultProps = {};

export default Layout;


// const Wrapper = ({ children }) => {
//   return <div className="wrapper">{children}</div>;
// };