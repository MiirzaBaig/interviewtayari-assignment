import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import InterviewForm from './components/InterviewForm';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
          {/* Navbar */}
          <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/submit-interview"
                element={
                  <PrivateRoute>
                    <InterviewForm />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>

          {/* Background Animation */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-40 -top-10 -left-10 animate-pulse"></div>
            <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-40 bottom-10 right-10 animate-pulse"></div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
