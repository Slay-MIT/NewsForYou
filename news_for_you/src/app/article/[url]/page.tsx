'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  category: string;
  content: string;
  author: string;
  publishedAt: string;
}

export default function ArticlePage({ params }: { params: { url: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        setIsLoading(true);
        const decodedUrl = decodeURIComponent(params.url);
        const storedArticles = JSON.parse(sessionStorage.getItem('articles') || '[]');
        const foundArticle = storedArticles.find((a: Article) => a.url === decodedUrl);
        if (foundArticle) {
          setArticle(foundArticle);
          updateUserPreferences(foundArticle.category);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        setError('Error fetching article');
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticle();
  }, [params.url]);

  function updateUserPreferences(category: string) {
    const preferences = JSON.parse(localStorage.getItem('newsPreferences') || '{}');
    preferences[category] = (preferences[category] || 0) + 1;
    localStorage.setItem('newsPreferences', JSON.stringify(preferences));
  }

  function truncateText(text: string | null | undefined, maxLength: number = 1000) {
    if (!text) return ''; 
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white">Error: {error}</div>;
  }

  if (!article) {
    return <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white">Article not found</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=" mx-auto px-9 py-8 dark:bg-gray-900 dark:text-white min-h-screen"
    >
      <button 
        onClick={() => router.back()} 
        className="text-blue-500 hover:underline mb-4 block"
      >
        &larr; Back to Home
      </button>
      <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2">
        {article.category}
      </span>
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      {article.author && <p className="text-gray-600 dark:text-gray-400 mb-2">By {article.author}</p>}
      {article.publishedAt && <p className="text-gray-600 dark:text-gray-400 mb-4">Published on {new Date(article.publishedAt).toLocaleDateString()}</p>}
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full max-w-2xl h-auto mb-4 rounded-lg shadow-md"
        />
      )}
      <p className="text-xl mb-4">{article.description}</p>
      <div className="prose dark:prose-invert max-w-none">{truncateText(article.content)}</div>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline mt-4 block"
      >
        Read full article on original website
      </a>
    </motion.div>
  );
}