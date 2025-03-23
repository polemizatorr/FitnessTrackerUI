import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL;

// aerobic trainings
export const getAerobicTrainings = async () => {
    try {
        const res = await axios.get(API_URL + "/AerobicTrainings");
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const getAerobicTrainingsForUser = async (username) => {
    try {
        const res = await axios.get(API_URL + "/AerobicTrainings/user/" + username);
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

export const exportAllAerobicTrainings = async () => {

    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': "Bearer " + token
    };

    try {
        const res = await axios.get(API_URL + "/AerobicTrainings/export", { headers: headers, responseType: 'blob' })

        let date = getCurrentDate();
        const file = new Blob([res.data], { type: 'application/json' });
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = 'Aerobic Trainings ' + date + '.json';
        link.click();
        URL.revokeObjectURL(fileURL);
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

export const getStrengthTrainingsForUser = async (username) => {
    try {
        const res = await axios.get(API_URL + "/StrengthTrainings/user/" + username);
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

export const exportAllStrengthTrainings = async () => {

    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': "Bearer " + token
    };

    try {
        const res = await axios.get(API_URL + "/StrengthTrainings/export", { headers: headers, responseType: 'blob' })
        
        let date = getCurrentDate();
        const file = new Blob([res.data], { type: 'application/json' });
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = 'Strength Trainings ' + date + '.json';
        link.click();
        URL.revokeObjectURL(fileURL);
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

const getCurrentDate = () => {
    let now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const customDateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return customDateTimeString;
}
