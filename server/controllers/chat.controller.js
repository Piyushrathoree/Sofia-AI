import axios from 'axios';
const assistant = async (req ,res) =>{
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required!" });
    }
  
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        }
      );
  
      res.json({ success: true, data: response.data });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      res.status(500).json({ success: false, error: "Failed to fetch response." });
    }
}
export { assistant }