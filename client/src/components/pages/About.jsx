import { motion } from 'framer-motion';

function About() {
  return (
    <div className="pt-28 px-4 min-h-screen bg-darker">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-text mb-8">About MindMeld AI</h1>
          
          <div className="prose prose-invert">
            <div className="bg-dark rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-text/80 leading-relaxed mb-6">
                MindMeld AI is on a mission to revolutionize human-AI interaction by creating more natural, 
                intuitive, and meaningful conversations between humans and machines.
              </p>
            </div>

            <div className="bg-dark rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">The Technology</h2>
              <p className="text-text/80 leading-relaxed mb-6">
                Built on cutting-edge language models and neural networks, MindMeld AI understands context, 
                learns from interactions, and provides responses that feel natural and helpful.
              </p>
            </div>

            <div className="bg-dark rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <ul className="space-y-4 text-text/80">
                <li>🎯 Accuracy and reliability in every interaction</li>
                <li>🔒 Privacy and security by design</li>
                <li>🌱 Continuous learning and improvement</li>
                <li>🤝 User-centric approach in everything we do</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;