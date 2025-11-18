import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import PropertyListPage from './pages/PropertyListPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import Login from './components/common/Login';
import ProtectedRoute from './components/common/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import './styles/index.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen flex flex-col">
                    <Header />
                    <main className="grow">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/properties" element={
                                <ProtectedRoute>
                                    <PropertyListPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/properties/:id" element={
                                <ProtectedRoute>
                                    <PropertyDetailsPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;