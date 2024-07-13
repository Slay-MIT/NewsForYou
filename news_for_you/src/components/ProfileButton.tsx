// src/components/ProfileButton.tsx
'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';

export default function ProfileButton() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session) return null;

  return (
    <div className="absolute top-4 right-4 z-50">
      <motion.div
        className="relative"
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <motion.button
          className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:shadow-lg transition-shadow duration-300"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <FaUser className="w-10 h-10 text-gray-600 dark:text-gray-300" />
          )}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 pr-2">
            {session.user?.name}
          </span>
        </motion.button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-1">
                <button
                  onClick={() => signOut()}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}