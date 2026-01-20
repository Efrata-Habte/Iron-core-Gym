import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PlansPage from './pages/PlansPage'
import ContactPage from './pages/ContactPage'
import RegisterPage from './pages/RegisterPage'
import TrainersPage from './pages/TrainersPage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return user && user.role === 'admin' ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <NotificationProvider>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="plans" element={<PlansPage />} />
                        <Route path="contact" element={<ContactPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="trainers" element={<TrainersPage />} />
                        <Route
                            path="admin"
                            element={
                                <AdminRoute>
                                    <AdminPage />
                                </AdminRoute>
                            }
                        />
                    </Route>
                </Routes>
            </AuthProvider>
        </NotificationProvider>
    )
}

export default App
