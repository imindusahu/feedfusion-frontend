import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // FastAPI backend URL

export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (loginData) => {
    return await axios.post(`${API_URL}/login`, loginData);
};

export const getArticles = async (token) => {
    return await axios.get(`${API_URL}/articles`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const createArticle = async (data, token) => {
    return await axios.post(`http://127.0.0.1:8000/articles`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};