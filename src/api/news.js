import API from "./api";

// ---------------- NEWS ----------------

export const getNews = async (category = "", search = "") => {
    try {
        const response = await API.get("/news", {
            params: {
                category,
                search: search
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
};
