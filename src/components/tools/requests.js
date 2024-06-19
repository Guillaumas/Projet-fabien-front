import axiosInstance from "../../axiosConfig";
import {useAuth0} from "@auth0/auth0-react";


export async function
authenticate(url, data, onSuccess, onError) {
    try {
        const response = await axiosInstance.post(url, data);
        if (response && response.status === 200) {
            onSuccess(response);
        }
    } catch (err) {
        onError(err);
    }
}*/

export async function fetchData(url, setData, token) {
    const response = await axiosInstance.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
  
export async function fetchData(url, setData) {
    const response = await axiosInstance.get(url);
    if (response && response.data) {
        setData(response.data);
    }
}

export async function postData(url, data, onSuccess, token) {
    const response = await axiosInstance.post(url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response && response.data) {
        onSuccess(response.data);
    }
}

export async function deleteData(url, onSuccess) {
    const response = await axiosInstance.delete(url);
    if (response && response.data) {
        onSuccess(response.data);
    }
}

export async function updateData(url, data, onSuccess) {
    const response = await axiosInstance.put(url, data);
    if (response && response.data) {
        onSuccess(response.data);
    }
}