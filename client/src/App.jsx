import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import Profile from './pages/Profile';
import ChatHistory from './pages/ChatHistory';
import About from './pages/About';
import Features from './pages/Features';

// Simulated auth state - replace with actual auth logic
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
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