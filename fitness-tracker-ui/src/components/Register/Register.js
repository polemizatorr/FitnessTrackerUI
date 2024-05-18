import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { registerUser, loginUser } from '../../Services/UserService';
import styles from './Register.module.css';

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")

  const handleRegister = (e) => {
    e.preventDefault();
    registerUser({username: username, email: email, password: password, firstname: firstname, lastname: lastname });

  }

  return(
  <div className={styles.Login}>
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

        <Button variant="outlined" color="secondary" type="submit">Login</Button>
    </form>
  </div>
  )
}



export default Register;
