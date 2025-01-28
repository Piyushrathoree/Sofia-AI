import { motion } from 'framer-motion';

function Header() {
  return (
    <header className="fixed w-full top-0 z-50 bg-darker/80 backdrop-blur-lg border-b border-gray-dark">
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "motion", stiffness: 100, damping: 20 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-gradient"
            >
              Sofia Ai
            </motion.div>
            
            <nav className="hidden md:flex space-x-8 ml-10">
              {['Features', 'About'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-text/80 hover:text-primary transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-text/80 hover:text-primary transition-colors"
            >
              Sign In
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-primary text-dark rounded-lg hover:bg-secondary transition-colors duration-300 glow"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.div>
    </header>
  );
}

export default Header;