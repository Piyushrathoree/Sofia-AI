import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Hero from 'src/components/Hero';
import AuthSection from 'src/components/AuthSection';
import Footer from 'src/components/Footer';

function LandingPage({ onLogin }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="bg-white">
      <Hero />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <AuthSection onLogin={onLogin} />
      </motion.div>
      <Footer />
    </div>
  );
}

export default LandingPage;