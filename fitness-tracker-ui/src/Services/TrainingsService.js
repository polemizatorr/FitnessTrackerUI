import axios from "axios"

const API_URL = "https://localhost:7258/api";

// aerobic trainings
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
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
    };

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

// Strength trainings
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

export const createStrengthTraining = async (data) => {

    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
    };

    try {
        const res = await axios.post(API_URL + "/StrengthTrainings", data, { headers: headers });
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const deleteStrengthTraining = async (id) => {
    try {
        const res = await axios.delete(API_URL + "/StrengthTrainings/" + id);
        return res;
    } catch (err) {
        console.log(err);
    }
}

// Sets

export const createSet = async (strengthTrainingId, setData) => {

    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
    };
    console.log(setData);

    try {
        const res = await axios.post(API_URL + "/Sets/" + strengthTrainingId, setData, {headers: headers});
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const deleteSet = async (id) => {
    try {
        const res = await axios.delete(API_URL + "/Sets/" + id);
        return res;
    } catch (err) {
        console.log(err);
    }
}
