import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './features/home/home';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirigir desde la raíz a la página de login */}
        <Route path="/" element={<Navigate to="/login" />} />  
        <Route path="/login" sensitive={true} element={<LoginPage />} />
        <Route path="/register" sensitive={true} element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;

