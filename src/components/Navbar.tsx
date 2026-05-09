"use client";

import { Bell, User } from 'lucide-react';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      setUserName(parsed.name);
    }
  }, []);

  return (
    <header className="navbar">
      <div className="search-container">
        {/* Placeholder for search if needed */}
      </div>
      
      <div className="nav-actions">
        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </button>
        
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">{userName}</span>
            <span className="user-role">Teacher</span>
          </div>
          <div className="avatar">
            <User size={20} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          height: 70px;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--background);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-left: auto;
        }

        .icon-btn {
          position: relative;
          color: var(--text-muted);
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.2s;
        }

        .icon-btn:hover {
          background: var(--border);
          color: var(--text-main);
        }

        .notification-badge {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 8px;
          height: 8px;
          background: var(--danger);
          border-radius: 50%;
          border: 2px solid var(--background);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-left: 1.5rem;
          border-left: 1px solid var(--border);
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .user-name {
          font-size: 0.875rem;
          font-weight: 600;
        }

        .user-role {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .avatar {
          width: 40px;
          height: 40px;
          background: var(--primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
