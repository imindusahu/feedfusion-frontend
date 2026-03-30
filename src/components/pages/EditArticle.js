import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticles, updateArticle, } from "../../services/api";
import { toast } from "react-toastify";

function EditArticle() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        content: "",
        image_url: "",
        source_url: ""
    });

    // 🔥 Fetch single article
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const articles = await getArticles();
                const article = articles.find(a => a.id === parseInt(id));

                if (article) {
                    setForm(article);
                }
            } catch (err) {
                toast.error("Failed to load article");
            }
        };

        fetchArticle();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateArticle(id, form);
            toast.success("Article Updated!");
            navigate("/articles");
        } catch (err) {
            toast.error(err.response?.data?.detail || "Update failed");
        }
    };

    return (
        <div className="container mt-4">
            <h2>✏️ Edit Article</h2>

            <form onSubmit={handleSubmit} className="mt-3">

                <input
                    className="form-control mb-2"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                <textarea
                    className="form-control mb-2"
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-2"
                    name="image_url"
                    value={form.image_url}
                    onChange={handleChange}
                />

                {form.image_url && (
                    <img
                        src={form.image_url}
                        alt="preview"
                        style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
                        className="mb-2"
                    />
                )}

                <input
                    className="form-control mb-2"
                    name="source_url"
                    value={form.source_url}
                    onChange={handleChange}
                />

                <button className="btn btn-primary">
                    Update Article
                </button>
            </form>
        </div>
    );
}

export default EditArticle;