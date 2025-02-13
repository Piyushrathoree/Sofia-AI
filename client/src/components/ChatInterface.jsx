import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useFetch from "../hooks/useFetch.js";

function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [prompt, setPrompt] = useState("");
  const [loadingResponse, setLoadingResponse] = useState(false);
  // State to keep track of the current conversation; null means a new conversation will be created
  const [conversationId, setConversationId] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { fetchData } = useFetch();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Helper function to remove leading asterisks (*) from each line (if needed)
  const removeAsterisks = (text) => {
    return text.replace(/^\s*\*\s*/gm, "");
  };

  // Handler to start a new conversation
  const handleNewChat = () => {
    setMessages([
      {
        id: 1,
        role: "assistant",
        content: "New conversation started. How can I help you today?",
      },
    ]);
    setConversationId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Add the user's message
    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: prompt.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoadingResponse(true);
    inputRef.current?.focus();

    try {
      // Send prompt along with the current conversationId (or null if it's a new chat)
      const response = await fetchData(prompt, conversationId);
      setLoadingResponse(false);

      let aiResponseText = response.success
        ? response.data
        : "AI model is experiencing high usage. Please try again later.";

      // Optionally, remove any unwanted asterisks from the AI response
      aiResponseText = removeAsterisks(aiResponseText);

      const aiMessage = {
        id: messages.length + 2,
        role: "assistant",
        content: aiResponseText,
      };

      setMessages((prev) => [...prev, aiMessage]);

      // If this was a new conversation, store the returned conversationId
      if (!conversationId && response.conversationId) {
        setConversationId(response.conversationId);
      }

      inputRef.current?.focus();
    } catch (error) {
      console.error("Error handling AI response:", error);
      setLoadingResponse(false);
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          role: "automated message",
          content: errorMessage,
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-darker overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-dark rounded-lg shadow-lg border border-gray-dark h-[calc(100vh-120px)] flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-darker ml-4"
                        : "bg-gray-dark text-text mr-4"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loadingResponse && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-400 italic"
              >
                Thinking...
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Area */}
          <div className="border-t border-gray-dark p-4">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-darker max-w-[80%] text-text rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary border border-gray-dark"
                disabled={loadingResponse}
                ref={inputRef}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-primary text-darker px-6 py-2 rounded-lg font-medium hover:bg-secondary transition-colors duration-300"
                disabled={loadingResponse}
              >
                {loadingResponse ? "Thinking..." : "Send"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNewChat}
                className="bg-primary text-darker px-4 py-2 rounded-lg font-medium hover:bg-secondary transition-colors duration-300"
              >
                New Chat
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
