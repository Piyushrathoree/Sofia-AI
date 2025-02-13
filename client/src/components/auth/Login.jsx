import { motion } from "framer-motion";
import { useState } from "react";
import useValidate from "../../hooks/useValidate.js";
import toast from "react-hot-toast";
function Login({ onSwitchToSignup }) {
  const { loginUser } = useValidate();
  const [formData, setFormData] = useState({
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
    await loginUser(formData.email, formData.password);
    toast.success("User successfully logged in");

    setTimeout(() => {
      setFormData({ email: "", password: "" });
      window.location.reload();
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-8 bg-dark rounded-xl border border-primary/20 shadow-2xl glow"
    >
      <h2 className="text-3xl font-bold text-text mb-6 text-center">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            required
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
            required
          />
        </motion.div>

        <div className="flex items-center justify-between">
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#forgot-password"
            className="text-sm text-primary hover:text-secondary transition-colors"
          >
            Forgot password?
          </motion.a>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 px-4 bg-primary text-darker rounded-lg font-semibold hover:bg-secondary transition-colors duration-300 mt-6 glow"
        >
          Log In
        </motion.button>
      </form>

      <p className="mt-4 text-center text-text/60">
        Don't have an account?{" "}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={onSwitchToSignup}
          className="text-primary hover:text-secondary transition-colors"
        >
          Sign up
        </motion.button>
      </p>
    </motion.div>
  );
}

export default Login;
