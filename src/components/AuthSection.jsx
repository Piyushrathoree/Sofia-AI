import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Login from './auth/Login';
import SignUp from './auth/SignUp';

function AuthSection() {
  const [activeTab, setActiveTab] = useState('login');

  useEffect(() => {
    const handleSwitchForm = (e) => {
      setActiveTab(e.detail);
    };

    window.addEventListener('switchAuthForm', handleSwitchForm);
    
    // Check URL params for initial form state
    const urlParams = new URLSearchParams(window.location.search);
    const formType = urlParams.get('form');
    if (formType) {
      setActiveTab(formType);
    }

    return () => {
      window.removeEventListener('switchAuthForm', handleSwitchForm);
    };
  }, []);

  const handleSwitchToSignup = () => {
    setActiveTab('signup');
  };

  const handleSwitchToLogin = () => {
    setActiveTab('login');
  };

  return (
    <div id="auth-section" className="py-20 bg-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-bold text-text mb-4">Get Started Today</h2>
            <p className="text-text/60">Join MindMeld AI and start your journey</p>
          </motion.div>

          <div className="flex justify-center space-x-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSwitchToLogin}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'login'
                  ? 'bg-primary text-darker'
                  : 'bg-dark text-text/60 hover:text-primary'
              }`}
            >
              Log In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSwitchToSignup}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'signup'
                  ? 'bg-primary text-darker'
                  : 'bg-dark text-text/60 hover:text-primary'
              }`}
            >
              Sign Up
            </motion.button>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'login' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === 'login' ? 20 : -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'login' ? (
              <Login onSwitchToSignup={handleSwitchToSignup} />
            ) : (
              <SignUp onSwitchToLogin={handleSwitchToLogin} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AuthSection;