"use client";

import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import StudentModal from '@/components/StudentModal';
import Skeleton from '@/components/Skeleton';
import { toast } from 'sonner';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  GraduationCap,
} from 'lucide-react';

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterSem, setFilterSem] = useState('');
  const [pagination, setPagination] = useState<any>(null);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);

  useEffect(() => {
    fetchStudents();
  }, [searchTerm, filterDept, filterSem]);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        search: searchTerm,
        department: filterDept,
        semester: filterSem,
      });
      
      const res = await fetch(`/api/students?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setStudents(data.students || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (student: any) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    toast.promise(
      new Promise(async (resolve, reject) => {
        if (!window.confirm('Are you sure you want to deactivate this student?')) {
          reject('Cancelled');
          return;
        }

        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`/api/students/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });

          if (res.ok) {
            fetchStudents();
            resolve('Success');
          } else {
            const data = await res.json();
            reject(data.message || 'Failed to deactivate student');
          }
        } catch (error) {
          reject('Something went wrong');
        }
      }),
      {
        loading: 'Deactivating student...',
        success: 'Student deactivated successfully',
        error: (err) => err === 'Cancelled' ? 'Action cancelled' : err,
      }
    );
  };

  return (
    <PageLayout>
      <div className="page-header fade-in">
        <div className="header-text">
          <h1>Student Management</h1>
          <p>View and manage all registered students in the system.</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={handleAdd}>
            <Plus size={20} />
            <span>Add New Student</span>
          </button>
        </div>
      </div>

      <div className="table-container fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="table-filters">
          <div className="search-bar">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by name, ID or roll number..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <select 
              className="filter-select"
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
            >
              <option value="">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Information Technology">Information Technology</option>
            </select>

            <select 
              className="filter-select"
              value={filterSem}
              onChange={(e) => setFilterSem(e.target.value)}
            >
              <option value="">All Semesters</option>
              {[1,2,3,4,5,6,7,8].map(s => (
                <option key={s} value={s.toString()}>Semester {s}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="table-wrapper">
            <table className="students-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>ID / Roll</th>
                  <th>Department</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i}>
                    <td>
                      <div className="student-info">
                        <Skeleton circle width="40px" height="40px" />
                        <div className="student-details" style={{ width: '120px' }}>
                          <Skeleton width="100%" height="14px" className="mb-1" />
                          <Skeleton width="60%" height="12px" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="id-badge" style={{ width: '80px' }}>
                        <Skeleton width="100%" height="14px" className="mb-1" />
                        <Skeleton width="70%" height="12px" />
                      </div>
                    </td>
                    <td>
                      <Skeleton width="100px" height="14px" />
                    </td>
                    <td>
                      <div className="contact-info" style={{ width: '150px' }}>
                        <Skeleton width="100%" height="12px" className="mb-1" />
                        <Skeleton width="80%" height="12px" />
                      </div>
                    </td>
                    <td>
                      <Skeleton width="70px" height="24px" borderRadius="99px" />
                    </td>
                    <td>
                      <div className="action-group">
                        <Skeleton width="32px" height="32px" borderRadius="8px" />
                        <Skeleton width="32px" height="32px" borderRadius="8px" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : students.length > 0 ? (
          <div className="table-wrapper">
            <table className="students-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>ID / Roll</th>
                  <th>Department</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>
                      <div className="student-info">
                        <div className="student-avatar">
                          {student.firstName[0]}{student.lastName[0]}
                        </div>
                        <div className="student-details">
                          <span className="student-name">{student.firstName} {student.lastName}</span>
                          <span className="student-semester">Semester {student.semester}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="id-badge">
                        <span className="stu-id">{student.studentId}</span>
                        <span className="roll-no">Roll: {student.rollNumber}</span>
                      </div>
                    </td>
                    <td>
                      <div className="dept-info">
                        <GraduationCap size={14} />
                        <span>{student.department}</span>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div className="contact-item">
                          <Mail size={12} />
                          <span>{student.email}</span>
                        </div>
                        <div className="contact-item">
                          <Phone size={12} />
                          <span>{student.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${student.isActive ? 'active' : 'inactive'}`}>
                        {student.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="action-group">
                        <button className="action-btn edit" title="Edit" onClick={() => handleEdit(student)}>
                          <Edit size={18} />
                        </button>
                        <button className="action-btn delete" title="Deactivate" onClick={() => handleDelete(student._id)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="table-placeholder">
            <Users size={48} className="placeholder-icon" />
            <p>No students found matching your search</p>
          </div>
        )}
      </div>

      <StudentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          fetchStudents();
          toast.success(editingStudent ? 'Student updated successfully' : 'Student registered successfully');
        }}
        student={editingStudent}
      />

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .header-text h1 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
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
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .btn-primary:hover {
          background: var(--primary-hover);
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
        }

        .table-container {
          background: white;
          border-radius: var(--radius);
          padding: 1.5rem;
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
        }

        .table-filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .search-bar {
          flex: 1;
          min-width: 300px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0 1rem;
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: 12px;
          color: var(--text-muted);
        }

        .search-bar input {
          width: 100%;
          border: none;
          background: transparent;
          padding: 0.75rem 0;
          outline: none;
          font-family: inherit;
          color: var(--text-main);
        }

        .filter-group {
          display: flex;
          gap: 0.75rem;
        }

        .filter-select {
          padding: 0.75rem 1rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: white;
          font-family: inherit;
          font-weight: 500;
          color: var(--text-muted);
          outline: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-select:focus {
          border-color: var(--primary);
          color: var(--text-main);
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .students-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .students-table th {
          padding: 1rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          font-weight: 600;
          border-bottom: 1px solid var(--border);
        }

        .students-table td {
          padding: 1.25rem 1rem;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }

        .student-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .student-avatar {
          width: 40px;
          height: 40px;
          background: #eef2ff;
          color: var(--primary);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;
        }

        .student-details {
          display: flex;
          flex-direction: column;
        }

        .student-name {
          font-weight: 600;
          color: var(--text-main);
        }

        .student-semester {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .id-badge {
          display: flex;
          flex-direction: column;
        }

        .stu-id {
          font-weight: 600;
          font-size: 0.875rem;
          color: var(--text-main);
        }

        .roll-no {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .dept-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--text-main);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 99px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .status-badge.active { background: #ecfdf5; color: #10b981; }
        .status-badge.inactive { background: #fef2f2; color: #ef4444; }

        .action-group {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          color: var(--text-muted);
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn:hover { background: #f8fafc; }
        .action-btn.edit:hover { color: var(--primary); background: #eef2ff; }
        .action-btn.delete:hover { color: #ef4444; background: #fef2f2; }

        .table-placeholder {
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

        @media (max-width: 768px) {
          .table-filters { flex-direction: column; }
          .filter-group { width: 100%; }
          .filter-select { flex: 1; }
        }
      `}</style>
    </PageLayout>
  );
}
