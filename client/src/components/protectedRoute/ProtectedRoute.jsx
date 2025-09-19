import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = null }) => {
    const navigate = useNavigate();
    const [authChecked, setAuthChecked] = useState(false); // Track if auth check is complete

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token) {
            // Redirect to login if token or refresh token is missing
            navigate('/user/login', { replace: true });
        } else if (requiredRole && role !== requiredRole) {
            // Redirect to home if the user's role doesn't match the required role
            navigate('/', { replace: true });
        } else {
            setAuthChecked(true); // Mark auth check as complete
        }
    }, [navigate, requiredRole]);

    // Render nothing until auth check is complete
    if (!authChecked) {
        return null;
    }

    return children; // Render children if auth check passes
};

export default ProtectedRoute;