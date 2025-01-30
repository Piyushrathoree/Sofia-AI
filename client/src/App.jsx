import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/pages/LandingPage';
import ChatPage from './components/pages/ChatPage';
import Profile from './components/pages/Profile';
import About from './components/pages/About';
import Features from './components/pages/Features';

// Simulated auth state - replace with actual auth logic
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Simulate authentication check
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  return { isAuthenticated, setIsAuthenticated };
};

function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-darker">
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
                <Navigate to="/chat" replace /> : 
                <LandingPage onLogin={() => setIsAuthenticated(true)} />
            } 
          />
          <Route 
            path="/chat" 
            element={
              isAuthenticated ? 
                <ChatPage /> : 
                <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/profile" 
            element={
              isAuthenticated ? 
                <Profile /> : 
                <Navigate to="/" replace />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;