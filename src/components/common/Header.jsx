import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold">Real Estate App</h1>
                <nav>
                    <ul className="flex space-x-6">
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
                    </ul>
                </nav>
            </div>
        </header>
    );
}