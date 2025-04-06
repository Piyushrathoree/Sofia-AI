import { motion } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";
import useValidate from "../../hooks/useValidate";
import toast from "react-hot-toast";
function SignUp({ onSwitchToLogin }) {
  const { registerUser } = useValidate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle sign up logic here
    if(!formData.firstName || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }
    try {
      await registerUser(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );
      toast.success("User Registered Successfully!! Please Login");
      setFormData({ firstName: "", lastName: "", email: "", password: "" }); // Reset form fields after successful registration
      onSwitchToLogin(); // Switch to login page after successful registration
    } catch (error) {
       toast.error(error.message );
       setFormData({ firstName: "", lastName: "", email: "", password: "" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-8 bg-dark rounded-xl border border-primary/20 shadow-2xl glow"
    >
      <h2 className="text-3xl font-bold text-text mb-6 text-center">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <motion.div whileFocus={{ scale: 1.01 }} className="col-span-1">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-text/60 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-darker border border-primary/20 rounded-lg focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all outline-none text-text"
              
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.01 }} className="col-span-1">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-text/60 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-darker border border-primary/20 rounded-lg focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all outline-none text-text"
              
            />
          </motion.div>
        </div>

        <motion.div whileFocus={{ scale: 1.01 }}>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text/60 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-darker border border-primary/20 rounded-lg focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all outline-none text-text"
            
          />
        </motion.div>

        <motion.div whileFocus={{ scale: 1.01 }}>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-text/60 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-darker border border-primary/20 rounded-lg focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all outline-none text-text"

          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 px-4 bg-primary text-darker rounded-lg font-semibold hover:bg-secondary transition-colors duration-300 mt-6 glow"
        >
          Sign Up
        </motion.button>
      </form>

      <p className="mt-4 text-center text-text/60">
        Already have an account?{" "}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={onSwitchToLogin}
          className="text-primary hover:text-secondary transition-colors"
        >
          Log in
        </motion.button>
      </p>
    </motion.div>
  );
}
SignUp.propTypes = {
  onSwitchToLogin: PropTypes.func.isRequired,
};

export default SignUp;
export default SignUp;
