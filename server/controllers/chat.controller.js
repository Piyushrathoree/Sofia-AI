import { History } from "../models/chatHistory.model.js";

// AI Assistant Function (Handles DeepSeek Responses via OpenRouter API & Saves to History)
const assistant = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required!" });
    }

    if (!req.user) {
        return res
            .status(401)
            .json({ error: "Unauthorized: User not authenticated" });
    }

    // Use the provided API key (for testing only)
    const apiKey =
        process.env.API_KEY;

    try {
        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "deepseek/deepseek-r1:free",
                    messages: [
                        {
                            role: "user",
                            content: prompt,
                        },
                    ],
                }),
            }
        );

        const responseData = await response.json();

        // Check if the API returned an error (e.g., missing credentials)
        if (!response.ok) {
            console.error("API Error:", responseData);
            return res
                .status(response.status)
                .json({ error: responseData.error });
        }

        // Extract the AI response
        const aiResponse =
            responseData.choices?.[0]?.message?.content ||
            "No response from DeepSeek via OpenRouter API.";

        // Save the chat history
        const chatHistory = new History({
            userId: req.user._id,
            messages: [{ userPrompt: prompt, aiResponse }],
        });

        await chatHistory.save();
        console.log("Chat history saved:", chatHistory);

        res.json({ success: true, data: aiResponse });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch response.",
        });
    }
};

// Get Chat History for a Specific User
const getChatHistory = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res
                .status(400)
                .json({ success: false, error: "User ID is required." });
        }

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
        res.status(500).json({
            success: false,
            error: "Failed to fetch chat history.",
        });
    }
};

export { assistant, getChatHistory };
