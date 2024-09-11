import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsPage = ({ newsData, language }) => {
    if (!newsData || newsData.length === 0) {
        return <div>{language === 'tr' ? 'Üzgünüz, bu sorgu için haber bulunamadı.' : 'Sorry, no news found for this query.'}</div>;
    }

    return (
        <div className="news-page">
            <h1>{language === 'tr' ? 'Haberler' : 'News'}</h1>
            <div className="news-list">
                {newsData.map((article, index) => (
                    <div key={index} className="news-item" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px 0' }}>
                        <h3 style={{ fontSize: '1.5em', margin: '0' }}>{article.title}</h3>
                        <p style={{ color: '#555' }}>{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>
                            {language === 'tr' ? 'Devamını Oku' : 'Read More'}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
