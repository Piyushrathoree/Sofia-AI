import axios from "axios";
import React from "react";
export default function useValidate(){
const URL = "http://localhost:5000/api/user";
const [user, setUser] = React.useState(null);
async function registerUser(firstName, lastName, email, password) {
  if (!firstName || !email || !password)
    throw new Error("Please fill all fields");
  try {
    const response = await axios.post(`${URL}/register`, {
      firstName,
      lastName,
      email,
      password,
    });
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error); 
    throw new Error("Failed to register user");
  }
}

async function loginUser(email, password) {
  if (!email || !password) throw new Error("Please fill all fields");
  try {
    const response = await axios.post(`${URL}/login`, {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    document.cookie = `token=${response.data.token}; path=/; max-age=86400`; 
    const data =  response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to login user");
  }
}

async function getUser(userId) {
  if (!userId) throw new Error("User ID is required");
  try {
    const response = await axios.get(`${URL}/${userId}`);
    const data = response.data;
    setUser(data);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user");
  }
}
async function logoutUser() {
  try {
    await axios.post(`${URL}/logout`);
    console.log("Logged out successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to logout user");
  }
}

return { registerUser, loginUser, getUser , logoutUser , user};
}