"use client";

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  PieChart, 
  TrendingUp, 
  Users,
  FileText,
  Search
} from 'lucide-react';

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);

  const reportTypes = [
    { title: 'Daily Report', icon: Calendar, color: '#6366f1', desc: 'Detailed attendance for a single day across all classes.' },
    { title: 'Student Report', icon: Users, color: '#10b981', desc: 'Individual attendance history and percentage for a student.' },
    { title: 'Class Analysis', icon: BarChart3, color: '#f59e0b', desc: 'Comparative analysis of attendance between departments.' },
    { title: 'Monthly Trends', icon: TrendingUp, color: '#0ea5e9', desc: 'Visualize attendance fluctuations over the month.' },
  ];

  return (
    <PageLayout>
      <div className="page-header fade-in">
        <div className="header-text">
          <h1>Reports & Analytics</h1>
          <p>Export attendance data and visualize academic performance.</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">
            <Download size={20} />
            <span>Bulk Export</span>
          </button>
        </div>
      </div>

      <div className="reports-grid">
        {reportTypes.map((report, i) => {
          const Icon = report.icon;
          return (
            <div key={i} className="report-card fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="card-top">
                <div className="icon-wrapper" style={{ backgroundColor: `${report.color}15`, color: report.color }}>
                  <Icon size={24} />
                </div>
                <div className="card-info">
                  <h3>{report.title}</h3>
                  <p>{report.desc}</p>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn-secondary-sm">Configure</button>
                <button className="btn-primary-sm">Generate</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="analytics-section fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="card main-analytics">
          <div className="card-header">
            <div className="header-title">
              <TrendingUp size={20} />
              <h3>Attendance Trends</h3>
            </div>
            <div className="header-filters">
              <select className="select-minimal">
                <option>Last 30 Days</option>
                <option>This Semester</option>
              </select>
            </div>
          </div>
          
          <div className="visual-container">
            <div className="bar-chart-mock">
              {[65, 80, 45, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                <div key={i} className="bar-wrapper">
                  <div className="bar" style={{ height: `${h}%` }}>
                    <div className="bar-tooltip">{h}%</div>
                  </div>
                  <span className="bar-label">W{i+1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card side-analytics">
          <div className="card-header">
            <h3>Quick Stats</h3>
          </div>
          <div className="mini-stats">
            <div className="mini-stat-item">
              <span className="label">Avg. Attendance</span>
              <span className="value">84.2%</span>
              <div className="progress-bar"><div className="progress" style={{ width: '84.2%', background: '#10b981' }}></div></div>
            </div>
            <div className="mini-stat-item">
              <span className="label">Top Department</span>
              <span className="value">CS (92%)</span>
              <div className="progress-bar"><div className="progress" style={{ width: '92%', background: '#6366f1' }}></div></div>
            </div>
            <div className="mini-stat-item">
              <span className="label">Total Records</span>
              <span className="value">1,284</span>
              <div className="progress-bar"><div className="progress" style={{ width: '100%', background: '#f59e0b' }}></div></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }

        .header-text h1 { font-size: 1.875rem; font-weight: 700; margin-bottom: 0.5rem; }
        .header-text p { color: var(--text-muted); }

        .btn-primary {
          background: var(--primary);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .reports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .report-card {
          background: white;
          border-radius: var(--radius);
          padding: 1.5rem;
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.2s;
        }

        .report-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .card-top {
          display: flex;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .card-info h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: 0.5rem; }
        .card-info p { font-size: 0.875rem; color: var(--text-muted); line-height: 1.4; }

        .card-footer {
          display: flex;
          gap: 0.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid #f1f5f9;
        }

        .btn-primary-sm {
          flex: 1;
          background: var(--primary);
          color: white;
          padding: 0.6rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .btn-secondary-sm {
          flex: 1;
          background: #f8fafc;
          border: 1px solid var(--border);
          color: var(--text-main);
          padding: 0.6rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .analytics-section {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .card {
          background: white;
          border-radius: var(--radius);
          padding: 2rem;
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-main);
        }

        .header-title h3 { font-size: 1.125rem; font-weight: 700; }

        .select-minimal {
          border: none;
          background: #f1f5f9;
          padding: 0.4rem 0.875rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-muted);
          outline: none;
        }

        .visual-container {
          height: 300px;
          display: flex;
          align-items: flex-end;
          padding-bottom: 2rem;
        }

        .bar-chart-mock {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
        }

        .bar-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .bar {
          width: 100%;
          background: linear-gradient(to top, var(--primary), #818cf8);
          border-radius: 6px 6px 0 0;
          position: relative;
          transition: all 0.3s;
        }

        .bar:hover {
          filter: brightness(1.1);
          cursor: pointer;
        }

        .bar-tooltip {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--sidebar-bg);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .bar:hover .bar-tooltip { opacity: 1; }

        .bar-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }

        .mini-stats { display: flex; flex-direction: column; gap: 1.5rem; }

        .mini-stat-item { display: flex; flex-direction: column; gap: 0.5rem; }

        .label { font-size: 0.875rem; color: var(--text-muted); font-weight: 500; }
        .value { font-size: 1.25rem; font-weight: 700; color: var(--text-main); }

        .progress-bar {
          height: 6px;
          background: #f1f5f9;
          border-radius: 99px;
          overflow: hidden;
        }

        .progress { height: 100%; border-radius: 99px; }

        @media (max-width: 1024px) {
          .analytics-section { grid-template-columns: 1fr; }
        }
      `}</style>
    </PageLayout>
  );
}
