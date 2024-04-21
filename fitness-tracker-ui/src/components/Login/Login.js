import React from 'react';
import PropTypes from 'prop-types';
import styles from './Login.module.css';
import TextField from '@mui/material/TextField';
import { FormControl, FormLabel } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import loginUser from '../../Services/UserService';

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      console.log(username, password)
      loginUser({username: username, password: password});
    }
  }

  return(
  <div className={styles.Login}>
    <form onSubmit={handleLogin}>
        Username: <br></br>
        <TextField  value={username} onChange={e => setUsername(e.target.value)} type="text" variant='outlined' /> <br></br>
        Password: <br></br>
        <TextField value={password} onChange={e => setPassword(e.target.value)} type="text" variant='outlined' /> <br></br>

        <Button variant="outlined" color="secondary" type="submit">Login</Button>
    </form>
  </div>
  )
}




Login.propTypes = {};

Login.defaultProps = {};

export default Login;
