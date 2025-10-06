import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import StudentAuth from './pages/StudentAuth';
import CollegeSelection from './pages/CollegeSelection';
import BranchSelection from './pages/BranchSelection';
import YearSelection from './pages/YearSelection';
import SemesterSelection from './pages/SemesterSelection';
import SubjectSelection from './pages/SubjectSelection';
import Resources from './pages/Resources';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import ProtectedRoute from './components/Common/ProtectedRoute';
import ErrorBoundary from './components/Common/ErrorBoundary'; // ADD THIS
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';
import AdminSetup from './pages/AdminSetup';

function App() {
  return (
    <ErrorBoundary> {/* ADD ERROR BOUNDARY */}
      <AuthProvider>
        <AppProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/student-auth" element={<StudentAuth />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/colleges" element={<ProtectedRoute><CollegeSelection /></ProtectedRoute>} />
                <Route path="/branches" element={<ProtectedRoute><BranchSelection /></ProtectedRoute>} />
                <Route path="/years" element={<ProtectedRoute><YearSelection /></ProtectedRoute>} />
                <Route path="/semesters" element={<ProtectedRoute><SemesterSelection /></ProtectedRoute>} />
                <Route path="/subjects" element={<ProtectedRoute><SubjectSelection /></ProtectedRoute>} />
                <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
                <Route path="/admin-dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
                // Add this route inside your Routes component:
                <Route path="/admin-setup" element={<AdminSetup />} />
              </Routes>
              <ToastContainer position="bottom-right" />
            </div>
          </Router>
        </AppProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;