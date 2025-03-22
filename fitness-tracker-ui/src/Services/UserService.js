import axios from "axios"

const API_URL = "https://localhost:7258/api";

export const registerUser = async (data) => {
    return await axios.post(API_URL + "/security/register", data)
    .then((res) => {
        if (res.data.statusCode === 200)
            {
                return { isSuccess: true, data: res.data };
            }      
            else 
            {
                return { isSuccess: false, message: res.data };
            }  
    })
    .catch((err) => {
        console.log(err);
    })
}

export const loginUser = async (data) => {
    return await axios.post(API_URL + "/security/login", data)
    .then((res) => {
        if (res.data.statusCode === 200)
        {
            localStorage.setItem('token', res.data.data);
            localStorage.setItem('username', data.username);
            return { isSuccess: true, data: res.data };
        }      
        else 
        {
            return { isSuccess: false, message: res.data };
        }  
    })
    .catch((err) => {
        console.log(err);
    })
}

export const verifyUser = async (data) => {
    return await axios.post(API_URL + "/security/verify", data)
    .then((res) => {
        if (res.data.statusCode === 200)
        {
            return { isSuccess: true, data: res.data };
        }      
        else 
        {
            return { isSuccess: false, message: res.data };
        }  
    })
    .catch((err) => {
        console.log(err);
    })
}
