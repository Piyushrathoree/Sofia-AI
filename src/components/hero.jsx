import { motion } from 'framer-motion';

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-darker grid-pattern">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center">
          <motion.div
            variants={itemVariants}
            className="inline-block mb-4 px-6 py-2 rounded-full bg-dark border border-primary/20"
          >
            <span className="text-primary">✨ Welcome to the future of AI conversation</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-text"
          >
            Your AI Companion for
            <br />
            <span className="text-gradient">Limitless Conversations</span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-text/80 mb-10 max-w-2xl mx-auto"
          >
            Experience the next generation of AI conversation. MindMeld brings you human-like interactions powered by advanced artificial intelligence.
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-darker rounded-lg font-semibold hover:bg-secondary transition-colors duration-300 glow"
            >
              Try for Free →
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center"
          >
            {[
              { number: "10M+", label: "Conversations" },
              { number: "99.9%", label: "Accuracy" },
              { number: "24/7", label: "Availability" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg bg-dark/50 backdrop-blur-sm border border-primary/10"
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-text/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;