import React from 'react';
import styles from './Login.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { loginUser } from '../../Services/UserService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../actions/authActions';


const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      loginUser({username: username, password: password});
      dispatch(loginSuccess(username));
      navigate("/aerobic")
    }
  }

  return(
  <div className={styles.Login}>
    <form onSubmit={handleLogin}>
        Username: <br></br>
        <TextField  value={username} onChange={e => setUsername(e.target.value)} type="text" variant='outlined' /> <br></br>
        Password: <br></br>
        <TextField value={password} onChange={e => setPassword(e.target.value)} type="password" variant='outlined' /> <br></br>

        <Button variant="outlined" color="secondary" type="submit">Login</Button>
    </form>
  </div>
  )
}

export default Login;
