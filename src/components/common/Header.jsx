import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        <h1 className="text-xl font-bold">Real Estate App</h1>
                    </Link>
                    <nav>
                        <ul className="flex space-x-8 items-center">
                            <li>
                                <Link to="/" className="hover:text-blue-200 transition-colors font-medium">Home</Link>
                            </li>
                            <li>
                                <Link to="/properties" className="hover:text-blue-200 transition-colors font-medium">Properties</Link>
                            </li>

                            {isAuthenticated ? (
                                <>
                                    {user && user.email && (
                                        <li className="bg-blue-500 bg-opacity-50 px-3 py-1.5 rounded-full text-sm">
                                            👤 {user.email}
                                        </li>
                                    )}
                                    <li>
                                        <button 
                                            onClick={handleLogout}
                                            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-sm"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link 
                                        to="/login" 
                                        className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-sm inline-block"
                                    >
                                        Login
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}