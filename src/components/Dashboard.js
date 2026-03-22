import React, { useEffect, useState } from "react";
import { getArticles, createArticle } from "../services/api";

const Dashboard = () => {
    const [articles, setArticles] = useState([]);
    const [form, setForm] = useState({ title: "", content: "" });

    const token = localStorage.getItem("token");

    const fetchArticles = async () => {
        try {
            const res = await getArticles(token);
            setArticles(res.data);
        } catch (err) {
            alert("Failed to fetch articles");
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createArticle(form, token);
            alert("Article created!");
            setForm({ title: "", content: "" });
            fetchArticles(); // refresh list
        } catch (err) {
            alert(err.response?.data?.detail || "Error creating article");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create Article</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="form-control mb-2"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="content"
                    placeholder="Content"
                    className="form-control mb-2"
                    value={form.content}
                    onChange={handleChange}
                    required
                />

                <button className="btn btn-success">Create</button>
            </form>

            <hr />

            <h2>Your Articles</h2>

            <ul className="list-group">
                {articles.map((article) => (
                    <li key={article.id} className="list-group-item">
                        <strong>{article.title}</strong>
                        <p>{article.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;