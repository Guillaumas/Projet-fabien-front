import axiosInstance from "../../axiosConfig";


export async function authenticate(url, data, onSuccess, onError) {
    try {
        const response = await axiosInstance.post(url, data);
        if (response && response.status === 200) {
            onSuccess(response);
        }
    } catch (err) {
        onError(err);
    }
};


export const fetchData = async (url, setData, token, page = 1) => {
    const response = await fetch(`${url}?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    setData(data);
};

export const postData = async (url, data, callback, token, page = 1) => {
    const response = await fetch(`${url}?page=${page}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    callback(responseData);
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