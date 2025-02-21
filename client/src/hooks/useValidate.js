import axios from "axios";
import React from "react";

export default function useValidate() {
  const URL = "/api/user";
  const [user, setUser] = React.useState(null);
  async function registerUser(firstName, lastName, email, password) {
    if (!firstName || !email || !password)
      throw new Error("Please fill all fields");
    try {
      const response = await axios.post(`${URL}/register`, {
        firstName,
        lastName:"",
        email,
        password,
      });
      const data = response.data;
      
      return data;
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to register user");
    }
  }

  async function loginUser(email, password) {
    if (!email || !password) throw new Error("Please fill all fields");

    try {
      const response = await axios.post(`${URL}/login`, { email, password });

      // ✅ Ensure response contains expected data
      if (!response.data || !response.data.token) {
        throw new Error(response.data.message || "Invalid credentials");
      }

      // ✅ Store token properly
      const token = response.data.token;
      localStorage.setItem("token", token);
      document.cookie = `token=${token}; path=/; max-age=86400`;

      // add toast for login credentials not correct functionality

      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      // Assuming you have a toast library like react-toastify
      throw new Error(error.response?.data?.message || "Failed to login user");
    }
  }

  async function getUser(userId) {
    if (!userId) throw new Error("User ID is required");
    try {
      const response = await axios.get(`${URL}/${userId}`);
      const data = response.data;
      setUser(data);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get user");
    }
  }
  async function logoutUser() {
    try {
      await axios.post(`${URL}/logout`);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to logout user");
    }
  }

  return { registerUser, loginUser, getUser, logoutUser, user };
}
