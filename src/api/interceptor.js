import API from "./api";

// Request interceptor (token attach)
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            // config.headers["ngrok-skip-browser-warning"] = "true";
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor (error handle)
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("access_token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);


export default API;





