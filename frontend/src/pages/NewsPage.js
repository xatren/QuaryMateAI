import React from 'react';

const NewsPage = ({ newsData, language }) => {
    const labels = {
        en: {
            author: 'Author',
            title: 'Title',
            description: 'Description',
            source: 'Source',
            publishedAt: 'Published At',
        },
        tr: {
            author: 'Yazar',
            title: 'Başlık',
            description: 'Açıklama',
            source: 'Kaynak',
            publishedAt: 'Yayın Tarihi',
        }
    };

    const selectedLabels = labels[language];

    // Handle no news data case
    if (!newsData || newsData.length === 0) {
        return <div>{language === 'tr' ? 'Haber bulunamadı.' : 'No news available.'}</div>;
    }

    return (
        <div>
            {newsData.map((article, index) => (
                <div key={index} className="border-b mb-4 pb-4">
                    <h2 className="text-xl font-bold">{selectedLabels.title}: {article.title}</h2>
                    <p><strong>{selectedLabels.author}:</strong> {article.author || 'N/A'}</p>
                    <p><strong>{selectedLabels.description}:</strong> {article.description || 'N/A'}</p>
                    <p><strong>{selectedLabels.source}:</strong> {article.source.name}</p>
                    <p><strong>{selectedLabels.publishedAt}:</strong> {new Date(article.publishedAt).toLocaleString()}</p>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {language === 'tr' ? 'Tam haberi oku' : 'Read full article'}
                    </a>
                </div>
            ))}
        </div>
    );
};

export default NewsPage;
