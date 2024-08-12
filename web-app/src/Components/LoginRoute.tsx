// src/components/LoginRoute.tsx

import { ComponentType } from "react";
import { useLocation, Navigate } from "react-router-dom";

interface LoginRouteProps {
  component: ComponentType<any>;
}

const LoginRoute: React.FC<LoginRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const isAuthenticated = localStorage.getItem("authToken") !== null;
  const location = useLocation();

  return isAuthenticated ? (
    <Navigate to="/" state={{ from: location }} />
  ) : (
    <Component {...rest} />
  );
};

export default LoginRoute;
