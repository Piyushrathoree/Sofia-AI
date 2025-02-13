import axios from "axios";
import { useState } from "react";

export default function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Now accepts an optional conversationId
  const fetchData = async (prompt, conversationId = null) => {
    setLoading(true);
    try {
      // Build the request body based on whether conversationId exists
      const requestBody = conversationId
        ? { prompt, conversationId }
        : { prompt };
      const response = await axios.post(
        "http://localhost:5000/api/chat/Ai", // Make sure this endpoint is correct
        requestBody,
        { withCredentials: true }
      );

      // Check if the API returned a successful response
      if (response.data.success && response.data) {
        return {
          success: true,
          data: response.data.aiResponse,
          conversationId: response.data.conversationId, // May be undefined if updating an existing conversation
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
