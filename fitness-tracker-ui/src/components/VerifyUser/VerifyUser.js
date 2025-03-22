import React from 'react';
import styles from './VerifyUser.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { verifyUser } from '../../Services/UserService';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';


const Login = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleVerifyUser = async (e) => {
    e.preventDefault();
    if (username && password) {
      const response = await verifyUser({username: username, password: password});
      if (response.isSuccess === true) 
      {
        toast.success('Verification successful!', {
          position: 'bottom-left',
          duration: 5000,  // 5 seconds
          style: {
              background: '#f44336',
              color: '#fff',
          },
      });
        navigate("/login");
      }
      else 
      {
        toast.error('Verification failed!', {
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
    <h2>Please insert your credentials to verify your account</h2>
    <br></br>
    <form onSubmit={handleVerifyUser}>
        Username: <br></br>
        <TextField  value={username} onChange={e => setUsername(e.target.value)} type="text" variant='outlined' /> <br></br>
        Password: <br></br>
        <TextField value={password} onChange={e => setPassword(e.target.value)} type="password" variant='outlined' /> <br></br>

        <Button variant="outlined" color="secondary" type="submit">Verify Account</Button>
    </form>
    <Toaster position="top-right" reverseOrder={false} />
  </div>
  )
}

export default Login;
