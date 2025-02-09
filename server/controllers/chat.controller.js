import axios from "axios";
import { History } from "../models/chatHistory.model.js";

// ✅ AI Assistant Function (Handles AI Responses & Saves to History)
const assistant = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required!" });
    }

    // ✅ Ensure user is authenticated
    if (!req.user) {
        return res
            .status(401)
            .json({ error: "Unauthorized: User not authenticated" });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    async function fetchWithRetry(retries = 3, delay = 5000) {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await axios.post(url, {
                    contents: [{ parts: [{ text: prompt }] }],
                });
                return response.data;
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
        const responseData = await fetchWithRetry();
console.log("working ....");
console.log(responseData.contents[0].parts[0].text);

        // ✅ Handle empty AI response
        if (
            !responseData 
        ) {
            return res
                .status(500)
                .json({ success: false, error: "AI response is empty." });
        }
console.log("working");

        const chatHistory = new History({
            userId: req.user._id, // ✅ Ensure the conversation is linked to the user
            messages: [
                {
                    userPrompt: prompt,
                    aiResponse: responseData.contents[0].parts[0].text,
                },
            ],
        });

        await chatHistory.save();
        console.log("Chat history saved:", chatHistory);

        res.json({ success: true, data: responseData });
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: "Failed to fetch response.",
        });
    }
};

// ✅ Get Chat History for a Specific User
const getChatHistory = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res
                .status(400)
                .json({ success: false, error: "User ID is required." });
        }

        // ✅ Fetch all chat history for the user, sorted by newest first
        const chatHistory = await History.find({ userId }).sort({
            createdAt: -1,
        });

        if (!chatHistory.length) {
            return res.json({ success: true, data: [], message: "No chat history found." });
        }

        res.json({ success: true, data: chatHistory });
    } catch (error) {
        console.error("Error fetching chat history:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch chat history.",
        });
    }
};

export { assistant, getChatHistory };
