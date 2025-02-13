import { useState, useEffect } from "react";
import axios from "axios";

export default function useGetHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      try {
        const URL = "http://localhost:5000/api/chat";
        // Correct the URL string and remove the extra brace
        const response = await axios.get(`${URL}/history`, {
          withCredentials: true,
        });
        // response.data should contain your chat history
        setHistory(response.data.data); // assuming response.data.data holds the conversations
      } catch (err) {
        console.error("Error fetching history:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  return { history, loading, error };
}
