// src/reducers/authReducer.js
import { LOGIN_SUCCESS, LOGOUT } from '../actions/authActions';

const initialState = {
    isAuthenticated: false,
    username: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                username: action.username,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                username: '',
            };
        default:
            return state;
    }
};

export default authReducer;