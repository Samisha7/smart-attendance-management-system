"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  BarChart3, 
  LogOut,
  GraduationCap
} from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Students', href: '/students', icon: Users },
    { name: 'Attendance', href: '/attendance', icon: CheckSquare },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <GraduationCap size={24} />
        </div>
        <h1 className="logo-text">Smart Attend</h1>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <button onClick={handleLogout} className="logout-btn">
        <LogOut size={20} />
        <span>Logout</span>
      </button>

      <style jsx>{`
        .sidebar {
          height: 100vh;
          width: 260px;
          position: fixed;
          left: 0;
          top: 0;
          background: var(--sidebar-bg);
          color: white;
          display: flex;
          flex-direction: column;
          padding: 2rem 1.5rem;
          z-index: 100;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          padding: 0 0.5rem;
        }

        .logo-icon {
          padding: 0.5rem;
          background: var(--primary);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius);
          color: var(--sidebar-text);
          opacity: 0.7;
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .nav-item:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-item.active {
          opacity: 1;
          background: var(--primary);
          color: white;
          box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius);
          color: #94a3b8;
          transition: all 0.2s ease;
          margin-top: auto;
          font-weight: 500;
        }

        .logout-btn:hover {
          color: #f87171;
          background: rgba(239, 68, 68, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
