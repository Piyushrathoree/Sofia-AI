import { motion } from 'framer-motion';

function Features() {
  const features = [
    {
      title: "Natural Conversations",
      description: "Experience human-like interactions with advanced language understanding and contextual awareness.",
      icon: "💬"
    },
    {
      title: "Real-time Responses",
      description: "Get instant, accurate responses to your queries with minimal latency.",
      icon: "⚡"
    },
    {
      title: "Multi-turn Dialogue",
      description: "Maintain context across multiple messages for more meaningful conversations.",
      icon: "🔄"
    },
    {
      title: "Smart Suggestions",
      description: "Receive intelligent recommendations based on your conversation history.",
      icon: "💡"
    }
  ];

  return (
    <div className="pt-28 px-4 min-h-screen bg-darker">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-text mb-8">Features</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark rounded-lg p-6 border border-gray-dark"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-text mb-2">{feature.title}</h3>
                <p className="text-text/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-dark rounded-lg p-8 border border-gray-dark"
          >
            <h2 className="text-2xl font-semibold text-text mb-4">Technical Specifications</h2>
            <ul className="space-y-3 text-text/80">
              <li>• State-of-the-art language models</li>
              <li>• 99.9% uptime guarantee</li>
              <li>• End-to-end encryption</li>
              <li>• Real-time data processing</li>
              <li>• Cross-platform compatibility</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Features;