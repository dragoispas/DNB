// src/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionsPage from '../pages/TransactionsPage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import PrivateRoute from '../components/PrivateRoute';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PrivateRoute component={TransactionsPage} />} />
                <Route path="/profile" element={<PrivateRoute component={ProfilePage} />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
