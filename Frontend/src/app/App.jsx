import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignupPage from '../pages/SignupPage/SignupPage';

const App = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path='/' element={<h1>Home</h1>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Any Routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;