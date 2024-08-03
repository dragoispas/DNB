// src/components/PrivateRoute.tsx
import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    component: ComponentType<any>;
    path?: string;
    exact?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('authToken') !== null;

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Component {...rest} />;
};

export default PrivateRoute;