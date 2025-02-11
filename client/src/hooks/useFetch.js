import axios from "axios";
import { useState } from "react";

export default function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (prompt) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/chat/Ai", // Ensure this is correct
        { prompt: prompt },
        { withCredentials: true }
      );
      console.log(response);
      
      console.log("API Response:", response.data);
      if (
        response.data.success && response.data.data
      ) {
        return {
          success: true,
          data: response.data.data,
        };
      } else {
        return { success: false, data: "Invalid AI response format." };
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error);
      return {
        success: false,
        data: "An error occurred while fetching AI response.",
        error,
      };
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, loading, error };
}
