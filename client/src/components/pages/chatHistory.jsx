import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetHistory from "../../hooks/useGetHistory";

function ChatHistory() {
  const [activeChat, setActiveChat] = useState(null);
  const navigate = useNavigate();
  const { history, loading, error } = useGetHistory();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
            onClick={() => navigate("/profile")}
            className="px-4 py-2 bg-dark rounded-lg text-text/60 hover:text-text transition-colors border border-primary/10"
          >
            ← Back to Profile
          </motion.button>
        </div>

        {loading && (
          <p className="text-text">Loading conversation history...</p>
        )}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid md:grid-cols-[300px,1fr] gap-6">
          {/* Chat List */}
          <motion.div variants={itemVariants} className="space-y-4">
            {history && history.length > 0 ? (
              history.map((chat) => (
                <motion.div
                  key={chat._id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveChat(chat)}
                  className={`p-4 rounded-xl cursor-pointer transition-colors ${
                    activeChat && activeChat._id === chat._id
                      ? "bg-primary/20 border border-primary/30"
                      : "bg-dark hover:bg-primary/10 border border-primary/10"
                  }`}
                >
                  <p className="text-sm text-text/60 mb-1">
                    {new Date(chat.createdAt).toLocaleString()}
                  </p>
                  <p className="text-text font-medium">
                    {chat.messages && chat.messages.length > 0
                      ? chat.messages[0].userPrompt
                      : "No preview available."}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className="text-text/60">No conversation history found.</p>
            )}
          </motion.div>

          {/* Chat Details */}
          <motion.div
            variants={itemVariants}
            className="bg-dark rounded-xl border border-primary/10 p-6"
          >
            {activeChat ? (
              <div className="space-y-6">
                <div className="pb-4 border-b border-gray-dark">
                  <h2 className="text-xl font-semibold text-text">
                    Conversation from{" "}
                    {new Date(activeChat.createdAt).toLocaleString()}
                  </h2>
                </div>
                <div className="space-y-4">
                  {activeChat.messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          msg.role === "user"
                            ? "bg-primary text-darker ml-4"
                            : "bg-gray-dark text-text mr-4"
                        }`}
                      >
                        <p className="text-sm">{msg.userPrompt}{" ?"}</p>
                       <br></br>
                        <p className="text-sm">{msg.aiResponse}</p>
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

export default ChatHistory;
