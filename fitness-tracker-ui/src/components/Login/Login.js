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
import Tooltip from '@mui/material/Tooltip';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.username || formData.username.trim().length === 0) {
      errors.username = 'Username is required';
    }

    if (!formData.password || formData.password.trim().length === 0) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const formData = {
      username,
      password
    };

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    const response = await loginUser(formData);
    if (response.isSuccess === true) {
      dispatch(loginSuccess(username));
      navigate("/aerobic");
    } else {
      toast.error('Login failed!', {
        position: 'bottom-left',
        duration: 5000,
        style: {
          background: '#f44336',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      });
    }
  }

  return(
    <div className={styles.Login}>
      <br></br>
      <h2>Login</h2>
      <br></br>
      <form onSubmit={handleLogin}>
        Username: <br></br>
        <Tooltip
          title={validationErrors.username || ''}
          open={!!validationErrors.username}
          placement="top"
          arrow
        >
          <TextField
            value={username}
            onChange={e => setUsername(e.target.value)}
            type="text"
            variant='outlined'
            error={!!validationErrors.username}
            data-cy="username-login-input"
          />
        </Tooltip>
        <br></br>
        Password: <br></br>
        <Tooltip
          title={validationErrors.password || ''}
          open={!!validationErrors.password}
          placement="top"
          arrow
        >
          <TextField
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            variant='outlined'
            error={!!validationErrors.password}
            data-cy="password-login-input"
          />
        </Tooltip>
        <br></br>

        <Button variant="outlined" color="secondary" type="submit">Login</Button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

export default Login;
