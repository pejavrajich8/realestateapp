import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchContainer from '../components/property/SearchContainer';

export default function HomePage() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Check authentication on component mount
    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Welcome to the Real Estate App</h1>
                <SearchContainer />
            </div>
        </div>
    );
}