import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});


// Automatically attach token to every request
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});


API.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(err);
    }
);


// ---------------- AUTH ----------------

export const registerUser = async (userData) => {
    return await API.post("/register", userData);
};

export const loginUser = async (loginData) => {
    return await API.post("/login", loginData);
};


// ---------------- ARTICLES ----------------

export const getArticles = async (search = "") => {
    try {
        const response = await API.get("/articles", {
            params: {
                search: search
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
};


export const createArticle = async (data) => {
    try {

        return await API.post("/articles", data);
    } catch (error) {
        console.error("Error Creating Article:", error);
        return null;
    }
};

export const deleteArticle = async (data) => {

};


// ---------------- NEWS ----------------

export const getNews = async (category = "", search = "") => {
    try {
        const response = await API.get("/news", {
            params: {
                category,
                search: search
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
};
