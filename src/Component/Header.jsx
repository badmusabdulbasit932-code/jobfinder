import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiBriefcase } from "react-icons/fi";
import { useState } from "react";
import profileImg from "../ComponentImages/profile.png";
import "../ComponentCss/Header.css";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // ✅ STATE MUST BE INSIDE THE COMPONENT
  const [menuOpen, setMenuOpen] = useState(false);

  const goToAccount = () => {
    navigate("/saved-jobs?tab=settings");
  };

  return (
    <motion.header
      className="main-div"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="child">
        
        {/* LOGO */}
        <nav>
          <h1>
            <span className="brief">
              <FiBriefcase />
            </span>
            JobFinder
          </h1>
        </nav>

        {/* HAMBURGER */}
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* MENU */}
        <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/saved-jobs" onClick={() => setMenuOpen(false)}>
            Saved Jobs
          </NavLink>

          <NavLink to="/post-job" onClick={() => setMenuOpen(false)}>
            Post Job
          </NavLink>
        </nav>
      </div>

      {/* RIGHT SIDE */}
      <div>
        {!user ? (
          <Link to="/login" className="sign">
            <button>Sign In</button>
          </Link>
        ) : (
          <motion.img
            src={profileImg}
            alt="Profile"
            onClick={goToAccount}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer"
            }}
          />
        )}
      </div>
    </motion.header>
  );
}
