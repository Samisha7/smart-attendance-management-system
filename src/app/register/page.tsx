"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, Mail, Lock, User, Briefcase, ArrowRight, Loader2, Check, X } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Password validation rules
  const passwordRules = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'At least one number', met: /[0-9]/.test(formData.password) },
    { label: 'At least one special character', met: /[!@#$%^&*]/.test(formData.password) },
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all rules are met
    if (passwordRules.some(rule => !rule.met)) {
      toast.error('Please meet all password requirements');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Registration successful! Please login.');
        router.push('/login');
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass fade-in">
        <div className="login-header">
          <div className="logo-icon">
            <GraduationCap size={32} />
          </div>
          <h1>Create Account</h1>
          <p>Join the attendance management system</p>
        </div>

        <form onSubmit={handleRegister} className="login-form">
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input 
                type="text" 
                id="name" 
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input 
                type="email" 
                id="email" 
                placeholder="teacher@school.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="department">Department</label>
            <div className="input-wrapper">
              <Briefcase size={18} className="input-icon" />
              <input 
                type="text" 
                id="department" 
                placeholder="e.g. Computer Science"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required 
              />
            </div>
            
            <div className="password-requirements">
              {passwordRules.map((rule, i) => (
                <div key={i} className={`requirement ${rule.met ? 'met' : ''}`}>
                  {rule.met ? <Check size={14} /> : <X size={14} />}
                  <span>{rule.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <Loader2 className="spinner" size={20} /> : (
              <>
                <span>Sign Up</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Already have an account? <a href="/login">Sign In</a></p>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          padding: 2rem;
        }

        .login-card {
          width: 100%;
          max-width: 480px;
          padding: 2.5rem;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .logo-icon {
          width: 56px;
          height: 56px;
          background: var(--primary);
          color: white;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          box-shadow: 0 8px 12px -3px rgba(99, 102, 241, 0.4);
        }

        .login-header h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.25rem;
        }

        .login-header p {
          color: var(--text-muted);
          font-size: 0.875rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .input-group label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-main);
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-muted);
        }

        .input-wrapper input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: white;
          transition: all 0.2s;
          font-size: 1rem;
        }

        .input-wrapper input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .password-requirements {
          margin-top: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .requirement {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .requirement.met {
          color: #10b981;
        }

        .requirement svg {
          flex-shrink: 0;
        }

        .login-btn {
          margin-top: 1rem;
          background: var(--primary);
          color: white;
          padding: 0.875rem;
          border-radius: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.2s;
          box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);
        }

        .login-btn:hover:not(:disabled) {
          background: var(--primary-hover);
          transform: translateY(-1px);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-footer {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .login-footer a {
          color: var(--primary);
          font-weight: 600;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .spinner {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
