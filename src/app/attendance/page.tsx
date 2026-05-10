import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import Skeleton from '@/components/Skeleton';
import { toast } from 'sonner';
import { 
  CheckSquare, 
  Calendar, 
  BookOpen, 
  Users, 
  Search, 
  Save, 
  Check, 
  X, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

export default function AttendancePage() {
  const [departments, setDepartments] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [marking, setMarking] = useState(false);

  const [selection, setSelection] = useState({
    department: '',
    semester: '',
    subject: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [attendanceData, setAttendanceData] = useState<any>({});

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const token = localStorage.getItem('token');
      const deptRes = await fetch('/api/students/departments/list', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const deptData = await deptRes.json();
      setDepartments(deptData.departments || []);

      const subRes = await fetch('/api/attendance/subjects/list', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const subData = await subRes.json();
      setSubjects(subData.subjects || []);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const loadStudents = async () => {
    if (!selection.department || !selection.semester) {
      toast.error('Please select department and semester');
      return;
    }

    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/students?department=${selection.department}&semester=${selection.semester}&limit=100`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setStudents(data.students || []);
      
      // Initialize attendance data with 'present' for everyone
      const initialAttendance: any = {};
      (data.students || []).forEach((s: any) => {
        initialAttendance[s._id] = { status: 'present', notes: '' };
      });
      setAttendanceData(initialAttendance);
    } catch (error) {
      console.error('Error loading students:', error);
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = (studentId: string, status: string) => {
    setAttendanceData((prev: any) => ({
      ...prev,
      [studentId]: { ...prev[studentId], status }
    }));
  };

  const submitAttendance = async () => {
    if (!selection.subject) {
      toast.error('Please select or enter a subject');
      return;
    }

    setMarking(true);
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const token = localStorage.getItem('token');
          const attendees = Object.keys(attendanceData).map(id => ({
            studentId: id,
            status: attendanceData[id].status,
            notes: attendanceData[id].notes
          }));

          const res = await fetch('/api/attendance/mark', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              ...selection,
              attendees
            })
          });

          const data = await res.json();
          if (res.ok) {
            setStudents([]); // Clear list after success
            resolve('Success');
          } else {
            reject(data.message || 'Failed to mark attendance');
          }
        } catch (error) {
          reject('Something went wrong');
        }
      }),
      {
        loading: 'Saving attendance...',
        success: 'Attendance marked successfully!',
        error: (err) => err,
      }
    ).finally(() => setMarking(false));
  };

  return (
    <PageLayout>
      <div className="page-header fade-in">
        <div className="header-text">
          <h1>Mark Attendance</h1>
          <p>Fill class details to start marking student attendance.</p>
        </div>
      </div>

      <div className="selection-grid fade-in">
        <div className="card selection-card">
          <div className="card-header">
            <h3>Class Selection</h3>
          </div>
          <div className="selection-form">
            <div className="input-group">
              <label>Department</label>
              <select 
                value={selection.department} 
                onChange={(e) => setSelection({...selection, department: e.target.value})}
              >
                <option value="">Select Department</option>
                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
              </select>
            </div>
            
            <div className="input-group">
              <label>Semester</label>
              <select 
                value={selection.semester} 
                onChange={(e) => setSelection({...selection, semester: e.target.value})}
              >
                <option value="">Select Semester</option>
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="input-group">
              <label>Subject</label>
              <input 
                type="text" 
                placeholder="Enter subject name" 
                list="subjects-list"
                value={selection.subject}
                onChange={(e) => setSelection({...selection, subject: e.target.value})}
              />
              <datalist id="subjects-list">
                {subjects.map(sub => <option key={sub} value={sub} />)}
              </datalist>
            </div>

            <div className="input-group">
              <label>Date</label>
              <input 
                type="date" 
                value={selection.date}
                onChange={(e) => setSelection({...selection, date: e.target.value})}
              />
            </div>

            <button 
              className="btn-primary" 
              onClick={loadStudents}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load Students'}
            </button>
          </div>
        </div>

        <div className="card attendance-list-card">
          <div className="card-header list-header">
            <h3>Students List</h3>
            {students.length > 0 && (
              <div className="list-stats">
                <span>Total: {students.length}</span>
              </div>
            )}
          </div>

          {loading ? (
            <div className="attendance-table-container">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Student Info</th>
                    <th>Attendance Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i}>
                      <td>
                        <div className="student-info">
                          <Skeleton width="150px" height="16px" className="mb-1" />
                          <Skeleton width="100px" height="12px" />
                        </div>
                      </td>
                      <td>
                        <div className="status-selector">
                          <Skeleton width="80px" height="32px" borderRadius="8px" />
                          <Skeleton width="80px" height="32px" borderRadius="8px" />
                          <Skeleton width="80px" height="32px" borderRadius="8px" />
                        </div>
                      </td>
                      <td>
                        <Skeleton width="100%" height="32px" borderRadius="6px" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : students.length > 0 ? (
            <div className="attendance-table-container">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Student Info</th>
                    <th>Attendance Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td>
                        <div className="student-info">
                          <span className="student-name">{student.firstName} {student.lastName}</span>
                          <span className="student-meta">{student.studentId} | Roll: {student.rollNumber}</span>
                        </div>
                      </td>
                      <td>
                        <div className="status-selector">
                          <button 
                            className={`status-btn present ${attendanceData[student._id]?.status === 'present' ? 'active' : ''}`}
                            onClick={() => updateStatus(student._id, 'present')}
                          >
                            <Check size={16} />
                            <span>Present</span>
                          </button>
                          <button 
                            className={`status-btn absent ${attendanceData[student._id]?.status === 'absent' ? 'active' : ''}`}
                            onClick={() => updateStatus(student._id, 'absent')}
                          >
                            <X size={16} />
                            <span>Absent</span>
                          </button>
                          <button 
                            className={`status-btn late ${attendanceData[student._id]?.status === 'late' ? 'active' : ''}`}
                            onClick={() => updateStatus(student._id, 'late')}
                          >
                            <Clock size={16} />
                            <span>Late</span>
                          </button>
                        </div>
                      </td>
                      <td>
                        <input 
                          className="notes-input"
                          type="text" 
                          placeholder="Add note..." 
                          value={attendanceData[student._id]?.notes || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setAttendanceData((prev: any) => ({
                              ...prev,
                              [student._id]: { ...prev[student._id], notes: val }
                            }));
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="submit-bar">
                <button 
                  className="btn-success" 
                  onClick={submitAttendance}
                  disabled={marking}
                >
                  <Save size={20} />
                  <span>{marking ? 'Saving...' : 'Submit Attendance'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="table-placeholder">
              <CheckSquare size={48} className="placeholder-icon" />
              <p>Select class details to view student list</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .page-header { margin-bottom: 2rem; }
        .header-text h1 { font-size: 1.875rem; font-weight: 700; margin-bottom: 0.5rem; }
        .header-text p { color: var(--text-muted); }

        .selection-grid {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 1.5rem;
          align-items: start;
        }

        .card {
          background: white;
          border-radius: var(--radius);
          padding: 1.5rem;
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
        }

        .card-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .list-stats span {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--primary);
          background: #eef2ff;
          padding: 0.25rem 0.75rem;
          border-radius: 99px;
        }

        .selection-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input-group label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .input-group select, 
        .input-group input {
          padding: 0.75rem;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: #f8fafc;
          font-family: inherit;
          outline: none;
          transition: all 0.2s;
        }

        .input-group select:focus, 
        .input-group input:focus {
          border-color: var(--primary);
          background: white;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
          padding: 0.875rem;
          border-radius: 12px;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .attendance-table {
          width: 100%;
          border-collapse: collapse;
        }

        .attendance-table th {
          text-align: left;
          padding: 1rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
        }

        .attendance-table td {
          padding: 1rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .student-info {
          display: flex;
          flex-direction: column;
        }

        .student-name { font-weight: 600; color: var(--text-main); }
        .student-meta { font-size: 0.75rem; color: var(--text-muted); }

        .status-selector {
          display: flex;
          gap: 0.5rem;
        }

        .status-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid var(--border);
          background: white;
          color: var(--text-muted);
          transition: all 0.2s;
        }

        .status-btn.present.active { background: #ecfdf5; color: #10b981; border-color: #10b981; }
        .status-btn.absent.active { background: #fef2f2; color: #ef4444; border-color: #ef4444; }
        .status-btn.late.active { background: #fffbeb; color: #f59e0b; border-color: #f59e0b; }

        .notes-input {
          width: 100%;
          padding: 0.5rem;
          border-radius: 6px;
          border: 1px solid var(--border);
          font-size: 0.8rem;
          outline: none;
        }

        .submit-bar {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
        }

        .btn-success {
          background: var(--success);
          color: white;
          padding: 0.875rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.2s;
        }

        .btn-success:hover {
          filter: brightness(0.9);
          transform: translateY(-1px);
        }

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

        .placeholder-icon { opacity: 0.2; margin-bottom: 1rem; }

        @media (max-width: 1024px) {
          .selection-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </PageLayout>
  );
}
