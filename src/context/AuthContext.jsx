import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    saveUserToLocalStorage, 
    loadUserFromLocalStorage, 
    clearUserFromLocalStorage 
} from '../js/localStorage';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = loadUserFromLocalStorage();
        if (savedUser) {
            setUser(savedUser);
            setIsAuthenticated(true);
        }
    }, []);

    // Save user to localStorage whenever user state changes
    useEffect(() => {
        if (user && isAuthenticated) {
            saveUserToLocalStorage(user);
        } else {
            clearUserFromLocalStorage();
        }
    }, [user, isAuthenticated]);

    const login = (userData = null) => {
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        clearUserFromLocalStorage();
    };

    const value = {
        isAuthenticated,
        user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
