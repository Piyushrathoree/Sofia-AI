import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { z } from "zod";
import axios from "axios";
import useGetUser from "../../hooks/useGetUser.js";

// Validation schemas
const nameSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(5, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Fallback data (Now empty, will be filled from backend)
const fallbackData = {
  firstName: "",
  lastName: "",
  email: "",
};
//new data for used for name changes
const newData = {
  firstName: "",
  lastName: "",
};
//similar for password changes
const newPasswordData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}

function Profile() {
  const [activeSection, setActiveSection] = useState(null);
  const [formData, setFormData] = useState(fallbackData);
  const [updatedData, setUpdatedData] = useState(newData);
  const [passwordFormData, setPasswordFormData] = useState(newPasswordData)
  const navigate = useNavigate();
  const { fetchUser } = useGetUser();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const result = await fetchUser();
    if (result.success) {
      setFormData({
        firstName: result.data.firstName || "",
        lastName: result.data.lastName || "",
        email: result.data.email || "",
      });
    } else {
      console.error("Failed to fetch user data:", result.data);
    }
  };
  const handleInputChange = (e) => {
    setUpdatedData((prev) => ({
      ...prev, // Keep previous values
      [e.target.name]: e.target.value, // Update only the changed field
    }));
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();
    try {
      const { firstName, lastName } = updatedData;
      nameSchema.parse({ firstName, lastName });

      const response = await axios.put(
        "http://localhost:5000/api/user/update",
        { firstName, lastName },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        setActiveSection(null);
        await loadUserData();
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error("Failed to update profile");
      }
    }
  };
  const handleNewPasswordChange = (e) => {
    setPasswordFormData((prev) => ({
     ...prev, // Keep previous values
      [e.target.name]: e.target.value, // Update only the changed field
    }));
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const { currentPassword, newPassword, confirmPassword } = passwordFormData;
      passwordSchema.parse({ currentPassword, newPassword, confirmPassword });

      const response = await axios.put(
        "http://localhost:5000/api/user/change-password",
        { currentPassword, newPassword },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Password updated successfully!");
        setActiveSection(null);
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } else {
        toast.error(response.data.message || "Failed to update password");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error("Failed to update password");
      }
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/logout",
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen pt-28 px-4 bg-darker">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Profile Header */}
        <motion.div
          variants={itemVariants}
          className="bg-dark rounded-2xl p-8 mb-8 border border-primary/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary p-1"
              >
                <div className="w-full h-full rounded-full bg-dark flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
              </motion.div>
              <div className="text-center sm:text-left">
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-3xl font-bold text-text mb-2"
                >
                  {formData.firstName} {formData.lastName}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-text/60"
                >
                  {formData.email}
                </motion.p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              Logout
            </motion.button>
          </div>
        </motion.div>

        {/* Settings Grid */}
        <div className="grid gap-6">
          {activeSection === null ? (
            <>
              {/* Name Settings Button */}
              <motion.div
                variants={itemVariants}
                className="bg-dark rounded-2xl overflow-hidden"
              >
                <motion.button
                  whileHover={{ backgroundColor: "rgba(137, 87, 229, 0.1)" }}
                  onClick={() => setActiveSection("name")}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-text">
                      Edit Profile
                    </h2>
                    <p className="text-text/60 mt-1">Change your name</p>
                  </div>
                  <div className="text-primary text-2xl">→</div>
                </motion.button>
              </motion.div>

              {/* Password Settings Button */}
              <motion.div
                variants={itemVariants}
                className="bg-dark rounded-2xl overflow-hidden"
              >
                <motion.button
                  whileHover={{ backgroundColor: "rgba(137, 87, 229, 0.1)" }}
                  onClick={() => setActiveSection("password")}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-text">
                      Change Password
                    </h2>
                    <p className="text-text/60 mt-1">Update your password</p>
                  </div>
                  <div className="text-primary text-2xl">→</div>
                </motion.button>
              </motion.div>

              {/* Chat History Button */}
              <motion.div
                variants={itemVariants}
                className="bg-dark rounded-2xl overflow-hidden"
              >
                <motion.button
                  onClick={() => navigate("/chat-history")}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-primary/10 transition-colors"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-text">
                      Chat History
                    </h2>
                    <p className="text-text/60 mt-1">
                      View your conversation history
                    </p>
                  </div>
                  <div className="text-primary text-2xl">→</div>
                </motion.button>
              </motion.div>
            </>
          ) : (
            <AnimatePresence mode="wait">
              {activeSection === "name" && (
                <motion.div
                  key="name-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-dark rounded-2xl p-6 border border-primary/10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-text">
                      Edit Profile
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveSection(null)}
                      className="px-4 py-2 bg-darker rounded-lg text-text/60 hover:text-text transition-colors"
                    >
                      ← Back
                    </motion.button>
                  </div>

                  <form onSubmit={handleUpdateName} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text/60 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="Enter the new name"
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-darker rounded-lg border border-primary/20 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all outline-none text-text"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text/60 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Enter the new sirname"
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-darker rounded-lg border border-primary/20 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all outline-none text-text"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text/60 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="w-full px-4 py-2 bg-darker/50 rounded-lg border border-primary/10 text-text/60 cursor-not-allowed"
                      />
                      <p className="text-xs text-text/40 mt-1">
                        Email cannot be changed
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3 px-4 bg-primary text-darker rounded-lg font-semibold hover:bg-secondary transition-colors duration-300 mt-6"
                    >
                      Save Changes
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {activeSection === "password" && (
                <motion.div
                  key="password-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-dark rounded-2xl p-6 border border-primary/10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-text">
                      Change Password
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveSection(null)}
                      className="px-4 py-2 bg-darker rounded-lg text-text/60 hover:text-text transition-colors"
                    >
                      ← Back
                    </motion.button>
                  </div>

                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text/60 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        placeholder="Enter your current password"
                        onChange={handleNewPasswordChange}
                        className="w-full px-4 py-2 bg-darker rounded-lg border border-primary/20 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all outline-none text-text"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text/60 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        placeholder="Enter your new password"
                        onChange={handleNewPasswordChange}
                        className="w-full px-4 py-2 bg-darker rounded-lg border border-primary/20 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all outline-none text-text"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text/60 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="confirm password"
                        onChange={handleNewPasswordChange}
                        className="w-full px-4 py-2 bg-darker rounded-lg border border-primary/20 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all outline-none text-text"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3 px-4 bg-primary text-darker rounded-lg font-semibold hover:bg-secondary transition-colors duration-300 mt-6"
                    >
                      Update Password
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;
