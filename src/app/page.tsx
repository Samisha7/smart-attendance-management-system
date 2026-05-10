"use client";

import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import Skeleton from '@/components/Skeleton';
import { 
  Users, 
  UserCheck, 
  UserX, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };
        
        const [statsRes, activityRes] = await Promise.all([
          fetch('/api/dashboard/overview', { headers }),
          fetch('/api/dashboard/recent-activity?limit=5', { headers })
        ]);

        const statsData = await statsRes.json();
        const activityData = await activityRes.json();

        setStats(statsData.overview);
        setRecentActivity(activityData.recentAttendance || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { 
      title: 'Total Students', 
      value: stats?.totalStudents || 0, 
      icon: Users, 
      color: 'var(--primary)',
      trend: '+12%',
      isUp: true
    },
    { 
      title: "Today's Present", 
      value: stats?.todayStats?.present || 0, 
      icon: UserCheck, 
      color: 'var(--success)',
      trend: '+5%',
      isUp: true
    },
    { 
      title: "Today's Absent", 
      value: stats?.todayStats?.absent || 0, 
      icon: UserX, 
      color: 'var(--danger)',
      trend: '-2%',
      isUp: false
    },
    { 
      title: 'Attendance Rate', 
      value: stats ? `${Math.round((stats.monthStats.present / (stats.monthStats.total || 1)) * 100)}%` : '0%', 
      icon: TrendingUp, 
      color: 'var(--info)',
      trend: '+3%',
      isUp: true
    },
  ];

  return (
    <PageLayout>
      <div className="dashboard-header fade-in">
        <div className="header-text">
          <h1>Dashboard Overview</h1>
          <p>Welcome back! Here's what's happening with your classes today.</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">Generate Report</button>
        </div>
      </div>

      <div className="stats-grid">
        {loading ? (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="stat-card">
              <Skeleton circle width="48px" height="48px" />
              <div className="stat-content" style={{ width: '100%' }}>
                <Skeleton width="60%" height="14px" className="mb-2" />
                <Skeleton width="40%" height="24px" />
              </div>
            </div>
          ))
        ) : (
          statCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="stat-card fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="stat-icon" style={{ backgroundColor: `${card.color}20`, color: card.color }}>
                  <Icon size={24} />
                </div>
                <div className="stat-content">
                  <span className="stat-title">{card.title}</span>
                  <div className="stat-value-row">
                    <span className="stat-value">{card.value}</span>
                    <div className={`stat-trend ${card.isUp ? 'up' : 'down'}`}>
                      {card.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      <span>{card.trend}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="dashboard-grid fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="card main-chart">
          <div className="card-header">
            <h3>Attendance Trends</h3>
            <select className="select-sm">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="chart-placeholder">
            <TrendingUp size={48} className="placeholder-icon" />
            <p>Chart data visualization will be implemented here</p>
          </div>
        </div>

        <div className="card recent-activity">
          <div className="card-header">
            <h3>Recent Activity</h3>
            <button className="text-btn">View All</button>
          </div>
          <div className="activity-list">
            {loading ? (
              [1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="activity-item">
                  <Skeleton circle width="8px" height="8px" className="mt-2" />
                  <div className="activity-info" style={{ width: '100%' }}>
                    <Skeleton width="100%" height="14px" className="mb-2" />
                    <Skeleton width="30%" height="12px" />
                  </div>
                </div>
              ))
            ) : recentActivity.length > 0 ? (
              recentActivity.map((activity, i) => (
                <div key={i} className="activity-item">
                  <div className={`activity-dot ${activity.status}`}></div>
                  <div className="activity-info">
                    <p className="activity-text">
                      <strong>{activity.student?.firstName} {activity.student?.lastName}</strong> was marked <strong>{activity.status}</strong> in <strong>{activity.subject}</strong>
                    </p>
                    <span className="activity-time">{new Date(activity.markedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted text-center py-4">No recent activity today</p>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }

        .header-text h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-main);
        }

        .header-text p {
          color: var(--text-muted);
        }

        .btn-primary {
          background: var(--primary);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.2s;
          box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);
        }

        .btn-primary:hover {
          background: var(--primary-hover);
          transform: translateY(-1px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          transition: transform 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .stat-icon {
          padding: 0.75rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-content {
          flex: 1;
        }

        .stat-title {
          font-size: 0.875rem;
          color: var(--text-muted);
          font-weight: 500;
          display: block;
          margin-bottom: 0.5rem;
        }

        .stat-value-row {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
        }

        .stat-trend.up {
          background: #ecfdf5;
          color: #10b981;
        }

        .stat-trend.down {
          background: #fef2f2;
          color: #ef4444;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .card-header h3 {
          font-size: 1.125rem;
          font-weight: 600;
        }

        .select-sm {
          padding: 0.4rem 0.75rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          font-size: 0.875rem;
          color: var(--text-muted);
          background: white;
          outline: none;
        }

        .chart-placeholder {
          height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          background: #f8fafc;
          border-radius: 12px;
          border: 2px dashed var(--border);
        }

        .placeholder-icon {
          opacity: 0.2;
          margin-bottom: 1rem;
        }

        .text-btn {
          color: var(--primary);
          font-weight: 600;
          font-size: 0.875rem;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          display: flex;
          gap: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .activity-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .activity-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 6px;
        }

        .activity-dot.present { background: var(--success); }
        .activity-dot.absent { background: var(--danger); }
        .activity-dot.late { background: var(--warning); }
        .activity-dot.excused { background: var(--info); }

        .activity-text {
          font-size: 0.875rem;
          line-height: 1.4;
          margin-bottom: 0.25rem;
        }

        .activity-time {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </PageLayout>
  );
}
