import { useEffect, useState } from "react";
import { getNews } from "../services/api";
import "../App.css";
function News() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await getNews();
        setArticles(data);
    };

    return (
        <div>
            <h2>Latest News</h2>

            {articles.map((item, index) => (
                <div key={index} className="card-hover" style={{ marginBottom: "20px" }}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <a href={item.url} target="_blank" rel="noreferrer">
                        Read more
                    </a>
                </div>
            ))}
        </div>
    );
}

export default News;