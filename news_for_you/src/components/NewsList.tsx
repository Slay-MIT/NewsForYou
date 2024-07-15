'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
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

function NewsListContent() {
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

  return (
    <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 px-4">
      {isLoading ? (
        <div className="col-span-full text-center text-xl">Loading...</div>
      ) : (
        articles.map(article => (
          <Link key={article.url} href={article.url} className="block">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">{truncateText(article.description, 150)}</p>
              </div>
            </motion.div>
          </Link>
        ))
      )}
    </div>
  );
}

export default function NewsList() {
  return (
    <Suspense fallback={<div>Loading news...</div>}>
      <NewsListContent />
    </Suspense>
  );
}
