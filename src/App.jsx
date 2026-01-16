import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PlansPage from './pages/PlansPage'
import ContactPage from './pages/ContactPage'
import RegisterPage from './pages/RegisterPage'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="plans" element={<PlansPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Route>
        </Routes>
    )
}

export default App
