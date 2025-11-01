import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

// Components
import { ProtectedRoute } from './components/UI/ProtectedRoute';
import { Header } from './components/UI/Header';
import { AuthPage } from './components/UI/AuthPage'; 

// Admin Components
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { AssignmentForm } from './components/Admin/AssignmentForm'; 
import { AssignmentSubmissions } from './components/Admin/AssignmentSubmissions';

// Student Components
import { StudentDashboard } from './components/Student/StudentDashboard';
import { AssignmentList } from './components/Student/AssignmentList';


const AppLayout = () => {
  const { isAuthenticated, user } = useAuth();

  const getHomePage = () => {
    if (!isAuthenticated) {
      return (
        <div className="text-center mt-20">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Assignment Dashboard!</h1>
          <p className="text-lg text-gray-600">Please <Link to="/login" className="text-blue-600 hover:underline">log in</Link> to continue.</p>
        </div>
      );
    }

    return user.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />;
  };

  return (
    <>
      <Header />
      <main className="p-4">
        <Routes>
          {/* Public Authentication Route (Handles both Sign In and Sign Up) */}
          <Route path="/login" element={<AuthPage />} />

          {/* Root/Home Route */}
          <Route path="/" element={getHomePage()} />

          {/* --- Admin Routes - Protected --- */}
          <Route 
            path="/admin" 
            element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/admin/new" 
            element={<ProtectedRoute requiredRole="admin"><AssignmentForm /></ProtectedRoute>} 
          />
          <Route 
            path="/admin/submissions/:assignmentId" 
            element={<ProtectedRoute requiredRole="admin"><AssignmentSubmissions /></ProtectedRoute>} 
          />

          {/* --- Student Routes - Protected --- */}
          <Route 
            path="/student" 
            element={<ProtectedRoute requiredRole="student"><StudentDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/assignments" 
            element={<ProtectedRoute requiredRole="student"><AssignmentList /></ProtectedRoute>} 
          />

          {/* Catch-all for 404 */}
          <Route path="*" element={<h1 className="text-center mt-10 text-xl font-bold">404 - Page Not Found</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <AppLayout />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}