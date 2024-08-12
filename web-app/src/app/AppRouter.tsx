// src/AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRoute from "../Components/LoginRoute";
import PrivateRoute from "../Components/PrivateRoute";
import LoginPage from "../Pages/LoginPage";
import ProfilePage from "../Pages/ProfilePage";
import TransactionsPage from "../Pages/TransactionsPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute component={TransactionsPage} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute component={ProfilePage} />}
        />
        <Route path="/login" element={<LoginRoute component={LoginPage} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
