import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../ComponentCss/signUp.css";

export default function SignUp({ setUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const email = form.email.toLowerCase().trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address ❌");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters ❌");
      return;
    }

    if (users.find((u) => u.email.toLowerCase().trim() === email)) {
      alert("Account already exists ❌");
      return;
    }

    const newUser = {
      name: form.name,
      email: email,
      password: form.password
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    const userData = {
      name: newUser.name,
      email: newUser.email
    };

    localStorage.setItem("currentUser", JSON.stringify(userData));

    setUser(userData);  // 🔥 THIS WAS MISSING

    alert("Account created successfully 🎉");

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
        <h2>Create an account</h2>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
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

        <button type="submit">Sign Up</button>

        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </motion.form>
    </motion.div>
  );
}