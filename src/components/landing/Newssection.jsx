'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import NewsCard from '@/src/components/landing/Newscard';
import { fetchUrl, optimizeCloudinaryUrl } from "@/src/config/api-config";


export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await fetchUrl('/articles?populate=*');
     
      console.log('Données des actualités:', data);
      
      setNews(data.data || data);
      
      console.log('Articles définis dans l’état:', data.data || data); 
      
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  console.log('État des actualités:', news);

  if (loading) {
    return (
      <section className="bg-gray-50 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
              Latest News and Resources
            </h2>
          </div>
          <div className="text-center py-16">
            <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Chargement des actualités...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-50 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
              Latest News and Resources
            </h2>
          </div>
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">Erreur: {error}</p>
            <button 
              onClick={fetchNews}
              className="bg-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/30"
            >
              Réessayer
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Séparer l'article principal (grand) et les articles secondaires (petits)
  const featuredArticle = news[0];
  const secondaryArticles = news.slice(1, 4);

  return (
    <section className="">
      <div className="">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 3xl:gap-[50px] items-start">
          {/* Grand article à gauche */}
          {featuredArticle && (
            <NewsCard
              article={featuredArticle}
              variant="large"
            />
          )}

          {/* Colonne des petits articles à droite */}
          <div className="flex flex-col gap-6">
            {secondaryArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                variant="small"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
