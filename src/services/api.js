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


export const getProfile = async () => {
    const res = await API.get("/profile"); // your backend endpoint
    return res.data;
};

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

// 🗑️ DELETE ARTICLE
export const deleteArticle = async (id) => {
    try {
        const response = await API.delete(`/articles/${id}`);
        return response.data; // { message: "Article deleted successfully" }
    } catch (error) {
        console.error("Error deleting article:", error);
        throw error;
    }
};


// ✏️ UPDATE ARTICLE
export const updateArticle = async (id, data) => {
    try {
        const response = await API.put(`/articles/${id}`, data);
        return response.data; // updated article
    } catch (error) {
        console.error("Error updating article:", error);
        throw error;
    }
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
