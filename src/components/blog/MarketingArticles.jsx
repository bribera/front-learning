'use client'
import { useState, useEffect } from 'react';
import { fetchUrl } from '../../config/api-config';
import CardMarketing from './CardMarketing';



const MarketingArticles = () => {
 
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 

    useEffect(() => {
        fetchNews();
    }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      // Filtrer uniquement les articles de catégorie "marketing"
      const data = await fetchUrl('/articles?populate=*&filters[category][slug][$eq]=marketing&sort=publishedAt:desc&pagination[limit]=4');
      setNews(data.data || data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-gray-50 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Chargement ...</p>
          </div>
        </div>
      </section>
    );
  }


    return (
    <div className='px-[17px]'>
        <div  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[50px]">
            {news.map((article) => (
                <CardMarketing key={article.id} article={article} publishedAt={article.publishedAt}/>
            ))}
        </div>
    </div>
  )
}

export default MarketingArticles
