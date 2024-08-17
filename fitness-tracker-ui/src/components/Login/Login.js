import React from 'react';
import styles from './Login.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { loginUser } from '../../Services/UserService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../actions/authActions';
import { Toaster, toast } from 'react-hot-toast';


const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username && password) {
      const response = await loginUser({username: username, password: password});
      if (response.isSuccess === true) 
      {
        dispatch(loginSuccess(username));
        navigate("/aerobic");
      }
      else 
      {
        toast.error('Login failed!', {
          position: 'bottom-left',
          duration: 5000,  // 5 seconds
          style: {
              background: '#f44336',
              color: '#fff',
          },
      });
      }
    }
  }

  return(
    
  <div className={styles.Login}>
    <br></br>
    <h2>Login</h2>
    <br></br>
    <form onSubmit={handleLogin}>
        Username: <br></br>
        <TextField  value={username} onChange={e => setUsername(e.target.value)} type="text" variant='outlined' /> <br></br>
        Password: <br></br>
        <TextField value={password} onChange={e => setPassword(e.target.value)} type="password" variant='outlined' /> <br></br>

        <Button variant="outlined" color="secondary" type="submit">Login</Button>
    </form>
    <Toaster position="top-right" reverseOrder={false} />
  </div>
  )
}

export default Login;
