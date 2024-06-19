let auth = localStorage.getItem('token');
let userId = null;

export const getToken = () => {
    return auth;
};

export const setToken = (newToken) => {
    auth = newToken;
    localStorage.setItem('token', newToken);
};

export const getUserId = () => {
    return userId;
};

export const setUserId = (id) => {
    userId = id;
};