import axios from "axios"

const API_URL = "https://localhost:7258/api";

export const getAerobicTrainings = async () => {
    try {
        const res = await axios.get(API_URL + "/AerobicTrainings");
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const getAerobicTraining = async (id) => {
    try {
        const res = await axios.get(API_URL + "/AerobicTrainings/" + id);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const createAerobicTraining = async (aerobicTraining) => {

    const token = localStorage.getItem('token');
    console.log(JSON.stringify(localStorage));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
    };
    console.log(JSON.stringify(headers));
    try {
        const res = await axios.post(API_URL + "/AerobicTrainings", aerobicTraining, {
            headers: headers
          });
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const editAerobicTraining = async (id, aerobicTraining) => {
    try {
        const res = await axios.put(API_URL + "/AerobicTrainings/" + id, aerobicTraining);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const deleteAerobicTraining = async (id) => {
    try {
        const res = await axios.delete(API_URL + "/AerobicTrainings/" + id);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const getStrengthTrainings = async () => {
    try {
        const res = await axios.get(API_URL + "/StrengthTrainings");
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const getStrengthTraining = async (id) => {
    try {
        const res = await axios.get(API_URL + "/StrengthTrainings/" + id);
        return res;
    } catch (err) {
        console.log(err);
    }
}
