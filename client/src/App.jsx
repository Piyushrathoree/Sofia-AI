import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import LandingPage from "./components/pages/LandingPage";
import ChatPage from "./components/pages/ChatPage";
import Profile from './components/pages/Profile';
import ChatHistory from "./components/pages/ChatHistory";
import About from "./components/pages/About";
import Features from "./components/pages/Features";
import {jwtDecode} from "jwt-decode";
// Simulated auth state - replace with actual auth logic
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          return true;
        }
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
    return false;
  };

  useEffect(() => {
    setIsAuthenticated(checkAuthToken());
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
          <Route 
            path="/chat-history" 
            element={
              isAuthenticated ? 
                <ChatHistory /> : 
                <Navigate to="/" replace />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
        </Routes>
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#0d1117',
              color: '#e6edf3',
              border: '1px solid rgba(137, 87, 229, 0.2)',
            },
            success: {
              iconTheme: {
                primary: '#8957e5',
                secondary: '#0d1117',
              },
            },
            error: {
              iconTheme: {
                primary: '#f87171',
                secondary: '#0d1117',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;