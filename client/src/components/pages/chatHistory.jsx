import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChatHistory() {
  const [activeChat, setActiveChat] = useState(null);
  const navigate = useNavigate();
  
  // Simulated chat history data
  const chatHistory = [
    {
      id: 1,
      date: '2024-02-10',
      preview: 'Discussion about React development',
      messages: [
        { role: 'user', content: 'How do I use React hooks?' },
        { role: 'assistant', content: 'React hooks are functions that allow you to use state and other React features in functional components...' }
      ]
    },
    {
      id: 2,
      date: '2024-02-09',
      preview: 'Project planning discussion',
      messages: [
        { role: 'user', content: 'Can you help me plan my project?' },
        { role: 'assistant', content: 'Of course! Let\'s break down your project into manageable steps...' }
      ]
    }
  ];

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
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <motion.h1 
            variants={itemVariants}
            className="text-3xl font-bold text-text"
          >
            Chat History
          </motion.h1>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/profile')}
            className="px-4 py-2 bg-dark rounded-lg text-text/60 hover:text-text transition-colors border border-primary/10"
          >
            ← Back to Profile
          </motion.button>
        </div>

        <div className="grid md:grid-cols-[300px,1fr] gap-6">
          {/* Chat List */}
          <motion.div variants={itemVariants} className="space-y-4">
            {chatHistory.map((chat) => (
              <motion.div
                key={chat.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveChat(chat)}
                className={`p-4 rounded-xl cursor-pointer transition-colors ${
                  activeChat?.id === chat.id
                    ? 'bg-primary/20 border border-primary/30'
                    : 'bg-dark hover:bg-primary/10 border border-primary/10'
                }`}
              >
                <p className="text-sm text-text/60 mb-1">{chat.date}</p>
                <p className="text-text font-medium">{chat.preview}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Chat Details */}
          <motion.div
            variants={itemVariants}
            className="bg-dark rounded-xl border border-primary/10 p-6"
          >
            {activeChat ? (
              <div className="space-y-6">
                <div className="pb-4 border-b border-gray-dark">
                  <h2 className="text-xl font-semibold text-text">{activeChat.preview}</h2>
                  <p className="text-text/60">{activeChat.date}</p>
                </div>
                <div className="space-y-4">
                  {activeChat.messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.role === 'user'
                            ? 'bg-primary text-darker ml-4'
                            : 'bg-gray-dark text-text mr-4'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-text/60">
                Select a chat to view the conversation
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default ChatHistory