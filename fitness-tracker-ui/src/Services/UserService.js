import axios from "axios"

const API_URL = "https://localhost:7258/api";

export const registerUser = (data) => {
    return axios.post(API_URL + "/security/register", data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })
}

export const loginUser = (data) => {
    return axios.post(API_URL + "/security/login", data)
    .then((res) => {
        if (res.statusCode == 200)
            {
                localStorage.setItem('token', res.data.value);
                localStorage.setItem('username', data.username);
            }        
    })
    .catch((err) => {
        console.log(err);
    })
}
