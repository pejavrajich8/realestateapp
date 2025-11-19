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
        <header className="bg-blue-600 text-white p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold">Real Estate App</h1>
                <nav>
                    <ul className="flex space-x-6 items-center">
                        <li>
                            <Link to="/" className="hover:underline hover:text-blue-200 transition-colors">Home</Link>
                        </li>
                        <li>
                            <Link to="/properties" className="hover:underline hover:text-blue-200 transition-colors">Properties</Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:underline hover:text-blue-200 transition-colors">About</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:underline hover:text-blue-200 transition-colors">Contact</Link>
                        </li>
                        {isAuthenticated ? (
                            <>
                                {user && user.email && (
                                    <li className="text-blue-200">
                                        {user.email}
                                    </li>
                                )}
                                <li>
                                    <button 
                                        onClick={handleLogout}
                                        className="hover:underline hover:text-blue-200 transition-colors bg-blue-700 px-3 py-1 rounded"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/login" className="hover:underline hover:text-blue-200 transition-colors">Login</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}