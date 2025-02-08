import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Hero from '../Hero';
import AuthSection from '../AuthSection';
import Footer from '../Footer';

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
      <div>
        <h1>Landing Page Content</h1>
      </div>
    </div>
  );
}


export default LandingPage;