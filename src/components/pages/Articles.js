import { useEffect, useState, useCallback } from "react";
import { getArticles, deleteArticle } from "../../api/article";
import "../../App.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Article() {
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState("technology");
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    // 🔥 Fetch function
    const fetchArticles = useCallback(async () => {
        setLoading(true);

        let data;

        if (search !== "") {
            // 🔍 Search mode → category ignore
            data = await getArticles(search);
        }
        else if (category === "all") {
            // 🌐 All mode
            data = await getArticles();
        }
        else {
            setSearch(category); // 🔥 Clear search when category is selected
            data = await getArticles(search);
        }

        setArticles(data || []);
        setLoading(false);
    }, [category, search]);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    // 🗑️ DELETE
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;

        try {
            const res = await deleteArticle(id);
            toast.success(res.message);
            fetchArticles();

        } catch (err) {
            toast.error(err.response?.data?.detail);
        }
    };

    // ✏️ EDIT → redirect
    const handleEdit = (id) => {
        navigate(`/edit-article/${id}`);
    };

    return (
        <div style={{ background: "#f5f5f5", minHeight: "100vh", padding: "30px" }}>

            {/* 🔥 Main Container */}
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "auto",
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                }}
            >

                {/* 📰 Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2>Latest Articles</h2>

                    {/* 🔍 Search Bar */}
                    <div>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") fetchArticles(); }}
                            style={{
                                padding: "8px",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                                marginRight: "10px"
                            }}
                        />
                        <button
                            onClick={fetchArticles}
                            style={{
                                padding: "8px 12px",
                                borderRadius: "6px",
                                background: "#f4a742",
                                border: "none",
                                color: "white",
                                cursor: "pointer"
                            }}
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* 📂 Categories */}
                <div style={{ marginTop: "15px" }}>
                    {["all", "technology", "business", "health", "sports"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setCategory(cat);
                                setSearch(""); // 🔥 search clear on category click
                            }}
                            style={{
                                marginRight: "10px",
                                padding: "6px 12px",
                                borderRadius: "20px",
                                border: "none",
                                cursor: "pointer",
                                background: category === cat ? "#f4a742" : "#eee",
                                color: category === cat ? "white" : "black"
                            }}
                        >
                            {cat.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* 📰 Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "20px",
                        marginTop: "20px"
                    }}
                >

                    {/* ⏳ Loading */}
                    {loading && <p>Loading...</p>}

                    {/*  No Data */}
                    {!loading && articles.length === 0 && (
                        <p>No articles found 😢</p>
                    )}

                    {/* 📰 Cards */}
                    {articles.map((item, index) => (

                        <div
                            key={index}
                            className="card-hover"
                            style={{
                                borderRadius: "12px",
                                overflow: "hidden",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                                background: "#fff"
                            }}
                        >
                            {/* 🖼 Image */}
                            {item.image_url && (
                                <img
                                    src={item.image_url}
                                    alt="news"
                                    style={{
                                        width: "100%",
                                        height: "180px",
                                        objectFit: "cover"
                                    }}
                                />
                            )}

                            {/* 📄 Content */}
                            <div style={{ padding: "15px" }}>
                                <h4 style={{ fontSize: "18px" }}>{item.title}</h4>

                                <p style={{ fontSize: "14px", color: "#555" }}>
                                    {item.content || item.description || "No description available."}
                                </p>

                                {/* 🔥 ACTION BUTTONS ROW */}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginTop: "15px"
                                    }}
                                >
                                    {/* Read More */}
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            color: "#f4a742",
                                            textDecoration: "none",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        Read More →
                                    </a>

                                    {/* Save Button (Styled) */}
                                    <button style={{
                                        className: "save-btn",
                                        background: "transparent",
                                        border: "none",
                                        fontSize: "18px",
                                        cursor: "pointer"
                                    }}>
                                        ⭐
                                    </button>

                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => handleEdit(item.id)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Article;