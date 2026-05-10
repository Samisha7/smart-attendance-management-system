# 🎓 Smart Attendance Management System (Next.js Edition)

A premium, full-stack digital attendance management system designed for educational institutions. This application enables teachers to efficiently track student attendance, manage student records, and visualize academic performance with modern analytics.

![Dashboard Preview](https://via.placeholder.com/1200x600/6366f1/ffffff?text=Smart+Attendance+System+Dashboard)

## ✨ Key Features

### 🚀 Modern Dashboard
- **Real-time Overview**: Instant access to total student counts and daily attendance percentages.
- **Activity Feed**: Live stream of the most recent attendance updates across all classes.
- **Trend Visualization**: Interactive charts showing attendance fluctuations over time.

### 📝 Attendance Marking
- **Efficient Workflow**: Select Department, Semester, and Subject to instantly load class lists.
- **One-Click Marking**: Color-coded controls to mark students as Present, Absent, Late, or Excused.
- **Notes & Remarks**: Add specific context to any student's attendance record.

### 👥 Student Management
- **Centralized Directory**: Searchable list of all students with detailed profile information.
- **Status Tracking**: Monitor active and inactive student profiles with visual indicators.
- **Quick Actions**: Easy access to edit student details or view individual attendance history.

### 📊 Advanced Analytics
- **Departmental Stats**: Compare attendance performance across different academic departments.
- **Custom Reports**: Generate daily summaries, student-specific reports, and monthly trends.
- **Data Export**: Export attendance data for administrative use.

## 🛠️ Technology Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with secure password hashing
- **Styling**: Premium Vanilla CSS with Glassmorphism aesthetics
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- MongoDB instance (Local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Samisha7/smart-attendance-management-system.git
   cd smart-attendance-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔐 Demo Credentials

For testing purposes, you can use the following demo account:
- **Email**: `teacher@demo.com`
- **Password**: `password123`

## 📁 Project Structure

```
├── src/
│   ├── app/            # Next.js App Router (Pages & API)
│   ├── components/     # Reusable UI Components
│   ├── lib/            # Utilities (DB connection, Auth)
│   ├── models/         # Mongoose TypeScript Models
│   └── scripts/        # Seeding and utility scripts
├── old-version/        # Legacy Express/Vanilla JS code
├── public/             # Static assets
└── .env                # Environment variables (gitignored)
```

## 📝 License

This project is licensed under the MIT License.
