"use client";

import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { User, Mail, Hash, BookOpen, GraduationCap, Phone, Save, Loader2 } from 'lucide-react';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  student?: any; // If provided, we are in Edit mode
}

const StudentModal: React.FC<StudentModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  student 
}) => {
  const isEdit = !!student;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    rollNumber: '',
    department: '',
    semester: '1',
    phone: '',
    gender: 'male',
    isActive: true
  });

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        email: student.email || '',
        studentId: student.studentId || '',
        rollNumber: student.rollNumber || '',
        department: student.department || '',
        semester: student.semester?.toString() || '1',
        phone: student.phone || '',
        gender: student.gender || 'male',
        isActive: student.isActive !== undefined ? student.isActive : true
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        studentId: '',
        rollNumber: '',
        department: '',
        semester: '1',
        phone: '',
        gender: 'male',
        isActive: true
      });
    }
    setError('');
  }, [student, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const url = isEdit ? `/api/students/${student._id}` : '/api/students';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          semester: parseInt(formData.semester)
        })
      });

      const data = await res.json();

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to save student data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={isEdit ? 'Edit Student' : 'Add New Student'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="student-form">
        {error && <div className="form-error">{error}</div>}
        
        <div className="form-grid">
          <div className="input-group">
            <label><User size={16} /> First Name</label>
            <input 
              type="text" 
              required 
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              placeholder="e.g. John"
            />
          </div>

          <div className="input-group">
            <label><User size={16} /> Last Name</label>
            <input 
              type="text" 
              required 
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              placeholder="e.g. Doe"
            />
          </div>

          <div className="input-group">
            <label><Mail size={16} /> Email Address</label>
            <input 
              type="email" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="e.g. john@example.com"
            />
          </div>

          <div className="input-group">
            <label><Hash size={16} /> Student ID</label>
            <input 
              type="text" 
              required 
              value={formData.studentId}
              onChange={(e) => setFormData({...formData, studentId: e.target.value})}
              placeholder="e.g. STU12345"
            />
          </div>

          <div className="input-group">
            <label><Hash size={16} /> Roll Number</label>
            <input 
              type="text" 
              required 
              value={formData.rollNumber}
              onChange={(e) => setFormData({...formData, rollNumber: e.target.value})}
              placeholder="e.g. 101"
            />
          </div>

          <div className="input-group">
            <label><GraduationCap size={16} /> Department</label>
            <select 
              required 
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Information Technology">Information Technology</option>
            </select>
          </div>

          <div className="input-group">
            <label><BookOpen size={16} /> Semester</label>
            <select 
              required 
              value={formData.semester}
              onChange={(e) => setFormData({...formData, semester: e.target.value})}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                <option key={s} value={s.toString()}>Semester {s}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label><Phone size={16} /> Phone Number</label>
            <input 
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="e.g. +1234567890"
            />
          </div>
        </div>

        <div className="form-footer">
          <button type="button" className="btn-ghost" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <Loader2 className="spin" size={18} /> : <Save size={18} />}
            <span>{isEdit ? 'Update Student' : 'Register Student'}</span>
          </button>
        </div>
      </form>

      <style jsx>{`
        .student-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #64748b;
        }

        .input-group input, 
        .input-group select {
          padding: 0.75rem 1rem;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          font-family: inherit;
          font-size: 0.95rem;
          transition: all 0.2s;
          outline: none;
        }

        .input-group input:focus, 
        .input-group select:focus {
          border-color: var(--primary);
          background: white;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .form-error {
          padding: 0.75rem 1rem;
          background: #fef2f2;
          color: #ef4444;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid #fee2e2;
        }

        .form-footer {
          margin-top: 1rem;
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid #f1f5f9;
        }

        .btn-ghost {
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          color: #64748b;
          transition: all 0.2s;
        }

        .btn-ghost:hover {
          background: #f1f5f9;
          color: #1e293b;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
          padding: 0.75rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.2s;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Modal>
  );
};

export default StudentModal;
