import axiosInstance from "../../axiosConfig";
import {setUserId} from "../../auth";


export async function authenticate(url, data, onSuccess, onError) {
    try {
        const response = await axiosInstance.post(url, data);
        if (response && response.status === 200) {
            onSuccess(response);
        }
    } catch (err) {
        onError(err);
    }
}


export const fetchData = async (url, setData, token, page = 0) => {
    const response = await fetch(`${url}?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status === 206) {
        const userId = response.headers.get('UserId');
        setUserId(userId);
    }
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setData(data);
    }
};

export const postData = async (url, data, callback, token) => {
    const response = await fetch( url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (response.status === 206) {
        const userId = response.headers.get('UserId');
        setUserId(userId);
    }
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
        const responseData = await response.json();
        callback(responseData);
    }
};

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