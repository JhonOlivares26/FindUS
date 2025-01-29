import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirigir desde la raíz a la página de login */}
        <Route path="/" element={<Navigate to="/login" />} />
      
        <Route path="/login" sensitive={true} element={<LoginPage />} />
        {/* Agrega más rutas aquí según sea necesario */}
      </Routes>
    </Router>
  );
};

export default App;

