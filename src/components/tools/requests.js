import axiosInstance from "../../axiosConfig";

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
}


export async function fetchData(url, setData) {
    const response = await axiosInstance.get(url);
    if (response && response.data) {
        setData(response.data);
    }
}

export async function postData(url, data, onSuccess) {
    const response = await axiosInstance.post(url, data);
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