import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { registerUser } from '../../Services/UserService';
import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Tooltip from '@mui/material/Tooltip';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = (formData) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username || formData.username.trim().length === 0) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 4) {
      errors.username = 'Username must be at least 4 characters';
    } else if (formData.username.length > 32) {
      errors.username = 'Username must be at most 32 characters';
    }

    if (!formData.email || formData.email.trim().length === 0) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.password || formData.password.trim().length === 0) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (!formData.firstname || formData.firstname.trim().length === 0) {
      errors.firstname = 'First name is required';
    } else if (formData.firstname.length < 4) {
      errors.firstname = 'First name must be at least 4 characters';
    } else if (formData.firstname.length > 32) {
      errors.firstname = 'First name must be at most 32 characters';
    }

    if (!formData.lastname || formData.lastname.trim().length === 0) {
      errors.lastname = 'Last name is required';
    } else if (formData.lastname.length < 4) {
      errors.lastname = 'Last name must be at least 4 characters';
    } else if (formData.lastname.length > 32) {
      errors.lastname = 'Last name must be at most 32 characters';
    }

    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const formData = {
      username,
      email,
      password,
      firstname,
      lastname
    };

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    const response = await registerUser(formData);
    if (response.isSuccess === true) {
      toast.success('Registration successful!', {
        position: 'bottom-left',
        duration: 5000,
        style: {
          background: '#4caf50',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        icon: '✅',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  };

  return(
    <div className={styles.Login}>
      <br></br>
      <h2>Register</h2>
      <br></br><br></br>
      <form onSubmit={handleRegister}>
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
            data-cy="username-input"
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
            data-cy="password-input"
          />
        </Tooltip>
        <br></br>
        Email: <br></br>
        <Tooltip
          title={validationErrors.email || ''}
          open={!!validationErrors.email}
          placement="top"
          arrow
        >
          <TextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="text"
            variant='outlined'
            error={!!validationErrors.email}
            data-cy="email-input"
          />
        </Tooltip>
        <br></br>
        Firstname: <br></br>
        <Tooltip
          title={validationErrors.firstname || ''}
          open={!!validationErrors.firstname}
          placement="top"
          arrow
        >
          <TextField
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
            type="text"
            variant='outlined'
            error={!!validationErrors.firstname}
            data-cy="firstname-input"
          />
        </Tooltip>
        <br></br>
        Lastname: <br></br>
        <Tooltip
          title={validationErrors.lastname || ''}
          open={!!validationErrors.lastname}
          placement="top"
          arrow
        >
          <TextField
            value={lastname}
            onChange={e => setLastname(e.target.value)}
            type="text"
            variant='outlined'
            error={!!validationErrors.lastname}
            data-cy="lastname-input"
          />
        </Tooltip>
        <br></br>

        <Button variant="outlined" color="secondary" type="submit">Register</Button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Register;
