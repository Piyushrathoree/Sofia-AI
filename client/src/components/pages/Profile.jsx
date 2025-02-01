import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [activeSection, setActiveSection] = useState(null);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogout = () => {
    // Add logout logic here
    localStorage.removeItem('token');
    window.location.reload();
    navigate('/');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-28 px-4 bg-darker">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Profile Header */}
        <motion.div 
          variants={itemVariants}
          className="bg-dark rounded-2xl p-8 mb-8 border border-primary/10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary p-1"
              >
                <div className="w-full h-full rounded-full bg-dark flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
              </motion.div>
              <div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-3xl font-bold text-text mb-2"
                >
                  {formData.firstName} {formData.lastName}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-text/60"
                >
                  john.doe@example.com
                </motion.p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              Logout
            </motion.button>
          </div>
        </motion.div>

        {/* Settings Grid */}
        <div className="grid gap-6">
          {activeSection === null ? (
            <>
              {/* Name Settings Button */}
              <motion.div variants={itemVariants} className="bg-dark rounded-2xl overflow-hidden">
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(137, 87, 229, 0.1)' }}
                  onClick={() => setActiveSection('name')}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-text">Edit Profile</h2>
                    <p className="text-text/60 mt-1">Change your name</p>
                  </div>
                  <div className="text-primary text-2xl">→</div>
                </motion.button>
              </motion.div>

              {/* Password Settings Button */}
              <motion.div variants={itemVariants} className="bg-dark rounded-2xl overflow-hidden">
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(137, 87, 229, 0.1)' }}
                  onClick={() => setActiveSection('password')}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-text">Change Password</h2>
                    <p className="text-text/60 mt-1">Update your password</p>
                  </div>
                  <div className="text-primary text-2xl">→</div>
                </motion.button>
              </motion.div>

              {/* Chat History Button */}
              <motion.div variants={itemVariants} className="bg-dark rounded-2xl overflow-hidden">
                <motion.button
                  onClick={() => navigate('/chat-history')}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-primary/10 transition-colors"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-text">Chat History</h2>
                    <p className="text-text/60 mt-1">View your conversation history</p>
                  </div>
                  <div className="text-primary text-2xl">→</div>
                </motion.button>
              </motion.div>
            </>
          ) : (
            <AnimatePresence mode="wait">
              {activeSection === 'name' && (
                <motion.div
                  key="name-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-dark rounded-2xl p-6 border border-primary/10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-text">Edit Profile</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveSection(null)}
                      className="px-4 py-2 bg-darker rounded-lg text-text/60 hover:text-text transition-colors"
                    >
                      ← Back
                    </motion.button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text/60 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-darker rounded-lg border border-primary/20 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all outline-none text-text"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text/60 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-darker rounded-lg border border-primary/20 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all outline-none text-text"
                        />
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-4 bg-primary text-darker rounded-lg font-semibold hover:bg-secondary transition-colors duration-300 mt-6"
                    >
                      Save Changes
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {activeSection === 'password' && (
                <motion.div
                  key="password-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-dark rounded-2xl p-6 border border-primary/10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-text">Change Password</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveSection(null)}
                      className="px-4 py-2 bg-darker rounded-lg text-text/60 hover:text-text transition-colors"
                    >
                      ← Back
                    </motion.button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text/60 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-darker rounded-lg border border-primary/20 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all outline-none text-text"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text/60 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-darker rounded-lg border border-primary/20 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all outline-none text-text"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text/60 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-darker rounded-lg border border-primary/20 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all outline-none text-text"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-4 bg-primary text-darker rounded-lg font-semibold hover:bg-secondary transition-colors duration-300 mt-6"
                    >
                      Update Password
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;