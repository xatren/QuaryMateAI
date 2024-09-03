import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsPage = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('YOUR_NEWS_API_ENDPOINT', {
                    params: {
                        q: 'latest',
                        apiKey: 'YOUR_NEWS_API_KEY',
                        language: 'en',
                    },
                });
                setNewsArticles(response.data.articles);
            } catch (err) {
                setError('Failed to fetch news.');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="news-page">
            <h2 className="text-xl font-bold mb-4">Latest News</h2>
            {newsArticles.length > 0 ? (
                newsArticles.map((article, index) => (
                    <div key={index} className="news-article mb-4">
                        <h3 className="font-semibold">{article.title}</h3>
                        <p>{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                            Read more
                        </a>
                    </div>
                ))
            ) : (
                <p>No news articles found.</p>
            )}
        </div>
    );
};

export default NewsPage;
