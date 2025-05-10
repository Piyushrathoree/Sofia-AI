import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Header({ isAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToAuth = (formType) => {
    if (location.pathname === '/') {
      const authSection = document.getElementById('auth-section');
      if (authSection) {
        authSection.scrollIntoView({ behavior: 'smooth' });
        // Dispatch custom event to switch form
        window.dispatchEvent(new CustomEvent('switchAuthForm', { detail: formType }));
      }
    } else {
      navigate('/?form=' + formType);
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-darker/80 backdrop-blur-lg border-b border-gray-dark">
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex justify-between items-center py-4">
          
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-gradient"
            >
              Sofia
            </motion.div>
        
          <div className="flex items-center space-x-6">
            <Link 
              to="/features"
              className="text-text/80 hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link 
              to="/about"
              className="text-text/80 hover:text-primary transition-colors"
            >
              About
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/chat"
                  className="text-text/80 hover:text-primary transition-colors"
                >
                  Chat
                </Link>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/profile')}
                  className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center cursor-pointer"
                >
                  <span className="text-lg">👤</span>
                </motion.div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToAuth('login')}
                  className="px-4 py-2 text-text/80 hover:text-primary transition-colors"
                >
                  Login
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToAuth('signup')}
                  className="px-4 py-2 bg-primary text-dark rounded-lg hover:bg-secondary transition-colors duration-300 glow"
                >
                  Get Started
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </header>
  );
}

export default Header;