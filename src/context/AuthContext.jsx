import { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        
        if (savedUser && savedToken) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
                setToken(savedToken);
                setIsAuthenticated(true);
                
                authService.verifyToken(savedToken)
                    .then((data) => {
                        setUser(data.user);
                        localStorage.setItem('user', JSON.stringify(data.user));
                    })
                    .catch(() => {
                        logout();
                    });
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);
    };

    const logout = async () => {
        if (token) {
            await authService.logout(token);
        }
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const value = {
        user,
        token,
        isAuthenticated,
        loading,
        login,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
