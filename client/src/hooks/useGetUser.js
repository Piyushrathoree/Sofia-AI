import axios from "axios";
import { useState } from "react";

export default function useGetUser() {

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/profile",
        { withCredentials: true }
      );

      console.log("API Response:", response);

      if (response.success && response.user) {
        return { success: true, data: response.user };
      } else {
        return { success: false, data: "Invalid user response format." };
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error);
      return { success: false, data: "An error occurred while fetching user data.", error };
    } finally {
      setLoading(false);
    }
  };

  return { fetchUser, loading, error };
}