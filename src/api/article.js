import API from "./api";

// ---------------- ARTICLES ----------------

export const getArticles = async (search = "") => {
    try {
        const response = await API.get("/articles", {
            params: {
                search: search
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
};


export const createArticle = async (data) => {
    try {

        return await API.post("/articles", data);
    } catch (error) {
        console.error("Error Creating Article:", error);
        return null;
    }
};

// 🗑️ DELETE ARTICLE
export const deleteArticle = async (id) => {
    try {
        const response = await API.delete(`/articles/${id}`);
        return response.data; // { message: "Article deleted successfully" }
    } catch (error) {
        console.error("Error deleting article:", error);
        throw error;
    }
};


// ✏️ UPDATE ARTICLE
export const updateArticle = async (id, data) => {
    try {
        const response = await API.put(`/articles/${id}`, data);
        return response.data; // updated article
    } catch (error) {
        console.error("Error updating article:", error);
        throw error;
    }
};
