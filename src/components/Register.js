import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { toast } from "react-toastify";

const Register = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registerUser(form);
            toast.success(res.data.message || "Registered successfully!");
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.detail || "Registration failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Register</h2>

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

                    <button className="auth-btn">Register</button>
                </form>

                <span className="auth-link" onClick={() => navigate("/login")}>
                    Already have account? Login
                </span>
            </div>
        </div>
    );
};

export default Register;