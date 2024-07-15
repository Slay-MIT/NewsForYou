'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { FaGoogle, FaNewspaper } from 'react-icons/fa';
import { motion } from 'framer-motion';

function LoginContent() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-700 to-slate-900">
        <div className="text-white text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  const handleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-slate-700 to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 max-w-md w-full bg-white dark:bg-gray-800 shadow-2xl rounded-lg"
      >
        <div className="flex justify-center mb-8">
          <FaNewspaper className="text-7xl text-blue-500 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
          Welcome to 
        </h1>
        <h1 className='text-5xl font-bold text-center text-gray-800 dark:text-gray-200 mb-7 font-Bodoni_Moda_SC'>
          News For You
          </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Get personalized news tailored just for you.
        </p>
        <button
          onClick={handleSignIn}
          className="w-full px-4 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center justify-center"
        >
          <FaGoogle className="mr-2" />
          Sign in with Google
        </button>
      </motion.div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}