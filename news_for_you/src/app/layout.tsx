// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../components/ThemeProvider'
import { SessionProviderWrapper } from '../components/SessionProviderWrapper.tsx'
import ProfileButton from '../components/ProfileButton'
import ScrollRestoration from '../components/ScrollRestoration'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'News For You',
  description: 'Get the latest news tailored to your interests',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProviderWrapper>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <ScrollRestoration/>
            <ProfileButton />
            {children}
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}