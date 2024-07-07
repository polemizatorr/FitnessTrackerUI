// src/actions/authActions.js
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = (username) => ({
    type: LOGIN_SUCCESS,
    username: username,
});

export const logout = () => ({
    type: LOGOUT,
});