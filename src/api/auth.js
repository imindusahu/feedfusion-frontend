import API from "./api";

// profile fetch
export const getProfile = async () => {
    const res = await API.get("/profile"); // your backend endpoint
    return res.data;
};
// Login + store token
export const loginUser = async (data) => {
    const res = await API.post("/login", data);
    localStorage.setItem("access_token", res.data.access_token);
    return res;
};

// Register + redirect to login
export const registerUser = async (userData) => {
    return await API.post("/register", userData);
};

// Check login status
export const isAuthenticated = () => {
    return !!localStorage.getItem("access_token");
};

// Logout
export const logout = () => {
    localStorage.removeItem("access_token");
};