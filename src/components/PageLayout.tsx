"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <style jsx>{`
          .loading-screen {
            height: 100vh;
            width: 100vw;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--background);
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid var(--border);
            border-top: 4px solid var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Navbar />
        <main className="content">
          {children}
        </main>
      </div>

      <style jsx>{`
        .app-container {
          display: flex;
          min-height: 100vh;
        }

        .main-wrapper {
          flex: 1;
          margin-left: 260px;
          display: flex;
          flex-direction: column;
        }

        .content {
          padding: 2rem;
          flex: 1;
          background: var(--background);
        }
      `}</style>
    </div>
  );
};

export default PageLayout;
