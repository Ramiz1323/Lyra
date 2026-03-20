import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@features/auth/hooks/useAuth';
import LoginPage from '@pages/LoginPage/LoginPage';
import SignupPage from '@pages/SignupPage/SignupPage';
import HomePage from '@pages/HomePage/HomePage';
import ProtectedRoute from '@components/common/ProtectedRoute/ProtectedRoute';
import ChatPage from '@pages/ChatPage/ChatPage';

const App = () => {
  const { handleGetMe } = useAuth();
  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <Routes>
      {/* Main Routes */}
      <Route 
        path='/' 
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path='/chat' 
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        } 
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Any Routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;