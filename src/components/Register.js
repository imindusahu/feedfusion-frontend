import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

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
            alert(res.data.message || "Registered successfully!");
            setForm({ username: "", password: "" });
            navigate("/login");
        } catch (err) {
            alert(err.response.data.detail || "Registration failed");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" name="username" className="form-control" placeholder="Username" value={form.username} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="password" name="password" className="form-control" placeholder="Password" value={form.password} onChange={handleChange} required />
                </div>
                <button className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;