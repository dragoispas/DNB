// src/components/LoginRoute.tsx
import React, { ComponentType } from 'react';
import { Navigate, useLocation, Route } from 'react-router-dom';

interface LoginRouteProps {
    component: ComponentType<any>;
}

const LoginRoute: React.FC<LoginRouteProps> = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('authToken') !== null;
    const location = useLocation();

    return isAuthenticated ? (
        <Navigate to="/" state={{ from: location }} />
    ) : (
        <Component {...rest} />
    );
};

export default LoginRoute;
