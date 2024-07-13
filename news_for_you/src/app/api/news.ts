import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export async function getTopHeadlines(category: string = '') {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country: 'in',
        category: category || 'general',
        apiKey: API_KEY,
      },
    });
    // Add category to each article
    const articlesWithCategory = response.data.articles.map((article: any) => ({
      ...article,
      category: category || 'general',
    }));
    return articlesWithCategory;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}