import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { toast } from "react-toastify";

const Login = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(form); // API call
            localStorage.setItem("access_token", res.data.access_token);
            toast.success("Login successful!");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.detail || "Login failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Sign In</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="auth-input"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="auth-input"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <button className="auth-btn">Sign In</button>
                </form>

                <span className="auth-link" onClick={() => navigate("/register")}>
                    Not registered? Click here
                </span>
            </div>
        </div>
    );
};

export default Login;