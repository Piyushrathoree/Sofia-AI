import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useFetch from "../hooks/useFetch";

function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [prompt, setPrompt] = useState("");
  const [loadingResponse, setLoadingResponse] = useState(false); // ✅ Track response waiting
  const messagesEndRef = useRef(null);

  const { fetchData } = useFetch(); // ✅ Using API call properly

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
  
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: prompt.trim(),
    };
  
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoadingResponse(true); // ✅ Show "Thinking..." while waiting
  
    try {
      console.log(prompt);
      
      const response = await fetchData(prompt); // ✅ Correct API call
  
      console.log("AI Response:", response);
  
      setLoadingResponse(false); // ✅ Stop showing "Thinking..."
  
      // ✅ Extract AI response text safely
      let aiResponseText = response.success
        ? response.data
        : "AI model is experiencing high usage. Please try again later.";
  
      // Add AI message to the chat
      const aiMessage = {
        id: messages.length + 2,
        role: "assistant",
        content: aiResponseText,
      };
  
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error handling AI response:", error);
      setLoadingResponse(false);
  
      // ✅ Show the actual API error message instead of a generic one
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
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
    <div className="min-h-screen pt-20 bg-darker">
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
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
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

          {/* prompt Area */}
          <div className="border-t border-gray-dark p-4">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-darker max-w-[80%] text-text rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary border border-gray-dark"
                disabled={loadingResponse}
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
