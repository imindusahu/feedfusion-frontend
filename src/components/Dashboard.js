import { useEffect, useState, useCallback } from "react";
import { getNews, createArticle } from "../services/api";
import { toast } from "react-toastify";
import "../App.css";


function News() {
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState("technology");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchArticles = useCallback(async () => {
        setLoading(true);

        let data;
        if (search.trim()) {
            data = await getNews("", search);
        } else {
            data = await getNews(category, "");
        }

        setArticles(data || []);
        setLoading(false);
    }, [category, search]);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    // SAVE HANDLER FIXED
    const handleSave = async (item) => {
        try {

            await createArticle({ title: item.title, content: item.description });
            toast.success("Article Saved!");
        } catch (err) {
            console.error(err);
            toast.error(" Failed to save");
        }
    };

    return (
        <div className="container mt-4">

            <h2 className="mb-3">📰 Latest News</h2>

            {/* Search */}
            <div className="d-flex mb-3">
                <input
                    className="form-control me-2"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-warning" onClick={fetchArticles}>
                    Search
                </button>
            </div>

            {/* Categories */}
            <div className="mb-3">
                {["technology", "business", "health", "sports"].map((cat) => (
                    <button
                        key={cat}
                        className={`btn me-2 ${category === cat ? "btn-warning" : "btn-outline-secondary"
                            }`}
                        onClick={() => {
                            setCategory(cat);
                            setSearch("");
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="row">
                {loading && <p>Loading...</p>}

                {articles.map((item, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">

                            {item.image && (
                                <img
                                    src={item.image}
                                    className="card-img-top"
                                    alt="news"
                                />
                            )}

                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>

                                <div className="mt-auto d-flex justify-content-between">
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-warning fw-bold"
                                    >
                                        Read More →
                                    </a>

                                    {/* CLEAN BUTTON */}
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => handleSave(item)}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default News;