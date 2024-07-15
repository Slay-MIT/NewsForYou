'use client';

import { useState, useEffect, useCallback } from 'react';
import { getTopHeadlines } from '../app/api/news';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSync, FaNewspaper } from 'react-icons/fa';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  category: string;
  content: string;
}

const categories = ['general', 'business', 'technology', 'sports', 'entertainment', 'health', 'science'];

export default function NewsList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);

  const fetchNews = useCallback(async (forceRefresh = false) => {
    const currentTime = Date.now();
    if (!forceRefresh && articles.length > 0 && currentTime - lastFetchTime < 300000) { // 5 minutes
      return;
    }

    setIsLoading(true);
    let allNews: Article[] = [];
    if (selectedCategory === 'all') {
      const promises = categories.map(category => getTopHeadlines(category));
      const results = await Promise.all(promises);
      allNews = results.flat();
    } else {
      allNews = await getTopHeadlines(selectedCategory);
    }
    const filteredNews = allNews.filter((article: { title: any; urlToImage: any; }) => article.title && article.urlToImage);
    const personalizedNews = getPersonalizedArticles(filteredNews);
    setArticles(personalizedNews);
    setIsLoading(false);
    setLastFetchTime(currentTime);
  }, [selectedCategory, articles, lastFetchTime]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    const handleRouteChange = () => {
      if (window.location.pathname === '/') {
        fetchNews(false);
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [fetchNews]);

  function getPersonalizedArticles(articles: Article[]) {
    const preferences: { [key: string]: number } = JSON.parse(localStorage.getItem('newsPreferences') || '{}');
    const totalClicks = Object.values(preferences).reduce((a: number, b: number) => a + b, 0);
    
    if (totalClicks === 0) return articles;
  
    return articles.sort((a, b) => {
      const scoreA = preferences[a.category] || 0;
      const scoreB = preferences[b.category] || 0;
      return scoreB - scoreA;
    });
  }

  function truncateText(text: string | null | undefined, maxLength: number = 100) {
    if (!text) return ''; 
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    router.push(`/?category=${category}`, { scroll: false });
    setArticles([]);  // Clear articles to force a refresh for the new category
    fetchNews(true);
  };

  const handleRefresh = () => {
    fetchNews(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="mb-12 text-center">
        <h1 className="text-7xl font-Bodoni_Moda_SC text-gray-800 dark:text-white mb-4 flex items-center justify-center">
          <FaNewspaper className="mr-4" />
          News For You
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">Stay informed with personalized news</p>
      </div>
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <select 
          value={selectedCategory} 
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="text-slate-800 dark:text-white w-full md:w-auto p-3 border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 transition-all duration-300"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <button 
          onClick={handleRefresh}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center transition-all duration-300"
        >
          <FaSync className="mr-2" />
          Refresh
        </button>
      </div>
      {isLoading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your personalized news...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Link href={`/article/${encodeURIComponent(article.url)}?category=${selectedCategory}`} key={index}>
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer h-full flex flex-col transition-all duration-300 hover:shadow-xl"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <div className="relative h-48 w-full">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 m-2">
                    <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <h2 className="text-xl text-slate-900 dark:text-white font-bold mb-3 line-clamp-2">{article.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{truncateText(article.description)}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}