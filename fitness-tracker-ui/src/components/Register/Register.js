import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { registerUser } from '../../Services/UserService';
import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await registerUser({username: username, email: email, password: password, firstname: firstname, lastname: lastname });
    if (response.isSuccess === true)
    {
      toast.success('Registration successful!', {
        position: 'bottom-left',
        duration: 5000,  // 5 seconds
        style: {
            background: 'green',
            color: 'green',
        },
    });
      navigate("/login");
    }
    else
    {
      toast.error('Registration failed!', {
        position: 'bottom-left',
        duration: 5000,  // 5 seconds
        style: {
            background: '#f44336',
            color: '#fff',
        },
    });
    }

  }

  return(
  <div className={styles.Login}>
    <br></br>
    <h2>Register</h2>
    <br></br><br></br>
    <form onSubmit={handleRegister}>
        Username: <br></br>
        <TextField  value={username} onChange={e => setUsername(e.target.value)} type="text" variant='outlined' /> <br></br>
        Password: <br></br>
        <TextField value={password} onChange={e => setPassword(e.target.value)} type="password" variant='outlined' /> <br></br>
        Email: <br></br>
        <TextField  value={email} onChange={e => setEmail(e.target.value)} type="text" variant='outlined' /> <br></br>
        Firstname: <br></br>
        <TextField value={firstname} onChange={e => setFirstname(e.target.value)} type="text" variant='outlined' /> <br></br>
        Lastname: <br></br>
        <TextField  value={lastname} onChange={e => setLastname(e.target.value)} type="text" variant='outlined' /> <br></br>

        <Button variant="outlined" color="secondary" type="submit">Register</Button>
    </form>
    <Toaster position="top-right" reverseOrder={false} />
  </div>
  )
}



export default Register;
