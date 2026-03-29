import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../../services/api";
import { toast } from "react-toastify";
function CreateArticle() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        content: "",
        image_url: "",
        source_url: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createArticle(form);
            toast.success("Article Created!");
            navigate("/articles");
        } catch (err) {
            console.error(err);
            toast.error(" Failed to create article");
        }
    };

    return (
        <div className="container mt-4">
            <h2>➕ Create New Article</h2>

            <form onSubmit={handleSubmit} className="mt-3">

                <input
                    className="form-control mb-2"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                <textarea
                    className="form-control mb-2"
                    name="content"
                    placeholder="Description|Content"
                    value={form.content}
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-2"
                    name="image_url"
                    placeholder="Image URL"
                    value={form.image_url}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    name="source_url"
                    placeholder="Article URL"
                    value={form.source_url}
                    onChange={handleChange}
                />

                <button className="btn btn-success">
                    Create Article
                </button>
            </form>
        </div>
    );
}

export default CreateArticle;