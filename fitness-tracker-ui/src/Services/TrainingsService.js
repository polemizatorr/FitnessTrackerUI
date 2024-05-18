import axios from "axios"

const API_URL = "https://localhost:7258/api";

export const getAerobicTrainings = () => {
    return axios.get(API_URL + "/AerobicTrainings")
    .then((res) => {
        return res;
    })
    .catch((err) => {
        console.log(err);
    })
}

export const getStrengthTrainings = () => {
    return axios.get(API_URL + "/StrengthTrainings")
    .then((res) => {
        return res;
    })
    .catch((err) => {
        console.log(err);
    })
}

