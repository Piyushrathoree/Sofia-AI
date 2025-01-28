import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header.jsx';
import LandingPage from './components/pages/LandingPage.jsx';
import ChatPage from './components/pages/ChatPage.jsx';
import Profile from './components/pages/Profile.jsx';

// going to replace it with actual auth logic 
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
        </Routes>
      </div>
    </Router>
  );
}

export default App