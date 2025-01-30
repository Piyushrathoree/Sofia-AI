import axios from "axios";

const assistant = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required!" });
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
    res.json({ success: true, data: responseData });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ success: false, error: "Failed to fetch response." });
  }
};

export { assistant };
