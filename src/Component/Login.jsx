import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../ComponentCss/signUp.css";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const email = form.email.toLowerCase().trim();

    const foundUser = users.find(
      (u) =>
        u.email.toLowerCase().trim() === email &&
        u.password === form.password
    );

    if (!foundUser) {
      alert("Invalid credentials ❌");
      return;
    }

    const userData = {
      name: foundUser.name,
      email: foundUser.email.toLowerCase().trim(),
    };

    localStorage.setItem("currentUser", JSON.stringify(userData));

    setUser(userData);   // 🔥 THIS WAS MISSING

    alert("Login successful ✅");

    navigate("/");
  };

  return (
    <motion.div
      className="signup-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.form
        className="signup-card"
        onSubmit={handleSubmit}
        initial={{ y: 40 }}
        animate={{ y: 0 }}
      >
        <h2>Welcome back</h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button>Log In</button>

        <p>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </motion.form>
    </motion.div>
  );
}