import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const loggedInUserId = localStorage.getItem("loggedInUserId");

  useEffect(() => {
    if (!loggedInUserId) {
      navigate("/", { replace: true });
    }
  }, [loggedInUserId, navigate]);

  return loggedInUserId ? <>{children} </> : null;
};
