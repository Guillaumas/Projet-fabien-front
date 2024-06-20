import axiosInstance from "../../axiosConfig";

export const fetchData = async (url, setData, token, page = 0) => {
    const response = await axiosInstance.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page,
        },
    });
    setData(response.data.content ? response.data.content : response.data);

};

export const postData = async (url, data, token, callback) => {
    const response = await axiosInstance.post(url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response && response.data) {
        callback(response.data);
    }
};

export async function deleteData(url, onSuccess, token) {
    const response = await axiosInstance.delete(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response && response.data) {
        onSuccess(response.data);
    }
};

export async function updateData(url, data, token, onSuccess) {
    const response = await axiosInstance.put(url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response && response.data) {
        onSuccess(response.data);
    }
};