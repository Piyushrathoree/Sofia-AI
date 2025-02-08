import axios from "axios";
import { useState } from "react";

export default function useGetUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/profile",
        { withCredentials: true }
      );

      // ✅ Fix: Access `response.data` correctly
      if (response.data.success && response.data.user) {
        return { success: true, data: response.data.user };
      } else {
        return { success: false, data: "Invalid user response format." };
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error);
      return {
        success: false,
        data: "An error occurred while fetching user data.",
        error,
      };
    } finally {
      setLoading(false);
    }
  };

  return { fetchUser, loading, error };
}
