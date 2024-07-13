'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import NewsList from '../components/NewsList';
import DarkModeToggle from '../components/DarkModeToggle';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <main className="mx-auto px-4 py-8 min-h-screen dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* <h1 className="text-7xl mb-8 font-Bodoni_Moda_SC">News For You</h1> */}
      <NewsList />
      {/* <DarkModeToggle /> */}
    </main>
  );
}