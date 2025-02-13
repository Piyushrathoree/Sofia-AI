import { History } from "../models/chatHistory.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// AI Assistant Function (Handles AI Responses & Saves to Conversation)
const assistant = async (req, res) => {
    // Extract prompt and optionally conversationId from request body
    const { prompt, conversationId } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required!" });
    }

    // Ensure the user is authenticated
    if (!req.user) {
        return res
            .status(401)
            .json({ error: "Unauthorized: User not authenticated" });
    }

    // Helper function: retry fetching AI response up to 3 times
    async function fetchWithRetry(retries = 3, delay = 5000) {
        for (let i = 0; i < retries; i++) {
            try {
                // Create an instance of the GoogleGenerativeAI using your API key
                const genAI = new GoogleGenerativeAI(
                    process.env.GEMINI_API_KEY
                );
                // Get the generative model (adjust the model name as needed)
                const model = genAI.getGenerativeModel({
                    model: "gemini-2.0-flash",
                });
                // Generate content using the prompt
                const result = await model.generateContent(prompt);
                // Return the AI response text
                return result.response.text();
            } catch (error) {
                if (error.response?.status === 503 && i < retries - 1) {
                    console.log(`Model overloaded, retrying... (${i + 1})`);
                    await new Promise((resolve) => setTimeout(resolve, delay));
                } else {
                    throw error;
                }
            }
        }
    }

    try {
        // Get the AI response text (e.g., "detailed response text" from the model)
        const responseData = await fetchWithRetry();
        console.log("AI response received:", responseData);

        if (!responseData) {
            return res
                .status(500)
                .json({ success: false, error: "AI response is empty." });
        }

        // Build a new message object with the user prompt and AI response
        const newMessage = {
            userPrompt: prompt,
            aiResponse: responseData,
            timestamp: new Date(),
        };

        let conversation;
        if (conversationId) {
            // Update an existing conversation: push the new message into the messages array
            conversation = await History.findOneAndUpdate(
                { _id: conversationId, userId: req.user._id },
                { $push: { messages: newMessage } },
                { new: true }
            );
            if (!conversation) {
                return res
                    .status(404)
                    .json({ success: false, error: "Conversation not found" });
            }
        } else {
            // Create a new conversation document with the first message
            conversation = new History({
                userId: req.user._id,
                messages: [newMessage],
            });
            await conversation.save();
        }

        console.log("Chat history saved:", conversation);
        return res.json({
            success: true,
            conversationId: conversation._id,
            aiResponse: responseData,
        });
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        return res
            .status(500)
            .json({ success: false, error: "Failed to fetch response." });
    }
};

// Get Chat History for a Specific User
const getChatHistory = async (req, res) => {
    try {
        const userId = req.user._id
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Fetch all conversation documents for the user, sorted by creation date (newest first)
        const chatHistory = await History.find({ userId }).sort({
            createdAt: -1,
        });
        if (!chatHistory.length) {
            return res.json({
                success: true,
                data: [],
                message: "No chat history found.",
            });
        }

        res.json({ success: true, data: chatHistory });
    } catch (error) {
        console.error("Error fetching chat history:", error);
        return res
            .status(500)
            .json({ success: false, error: "Failed to fetch chat history." });
    }
};

export { assistant, getChatHistory };
