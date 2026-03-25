import React, { useEffect, useState, useCallback } from "react";
import { getNews } from "../services/api";

function Dashboard() {
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState("technology");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchArticles = useCallback(async () => {
        setLoading(true);

        const data = await getNews(category, search);

        setArticles(data || []);
        setLoading(false);
    }, [category, search]);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);


    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1 style={{ textAlign: "center" }}>📰 Smart News Dashboard</h1>

            {/* 🔍 Search */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Search news..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "300px",
                        borderRadius: "8px",
                        border: "1px solid gray",
                    }}
                />

                <button
                    onClick={fetchArticles}
                    style={{
                        marginLeft: "10px",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Search
                </button>
            </div>

            {/* 📂 Categories */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                {["technology", "business", "sports", "health"].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        style={{
                            margin: "5px",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            border: "none",
                            backgroundColor: category === cat ? "#28a745" : "#ddd",
                            color: category === cat ? "white" : "black",
                            cursor: "pointer",
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* 📰 News Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px",
                }}
            >
                {loading && (
                    <p style={{ textAlign: "center", fontSize: "18px" }}>
                        Loading news...</p>
                )}


                {articles.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            padding: "15px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                    >
                        {item.image && (
                            <img
                                src={item.image}
                                alt="news"
                                style={{
                                    width: "100%",
                                    height: "180px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                }}
                            />
                        )}

                        <h3 style={{ marginTop: "10px" }}>{item.title}</h3>
                        <p>{item.description}</p>

                        <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                display: "inline-block",
                                marginTop: "10px",
                                color: "#007bff",
                                textDecoration: "none",
                            }}
                        >
                            Read More →
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;