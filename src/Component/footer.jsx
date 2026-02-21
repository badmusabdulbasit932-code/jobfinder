import { motion } from "framer-motion";
import "../ComponentCss/footer.css";
import { FiBriefcase } from "react-icons/fi";
import { SlSocialFacebook } from "react-icons/sl";
import { CiTwitter } from "react-icons/ci";
import { FiLinkedin } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { LuPhone } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.4 }}
    >
      <div className="footer-container">

        {/* ===== BRAND SECTION ===== */}
        <motion.div
          className="footer-brand"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          <h2>
            <span className="icons">
              <FiBriefcase />
            </span>
            JobFinder
          </h2>

          <p>
            Find your dream job with ease. Explore thousands of opportunities
            from top companies worldwide.
          </p>

          <nav>
            <SlSocialFacebook />
            <CiTwitter />
            <FiLinkedin />
            <IoLogoInstagram />
          </nav>
        </motion.div>

        {/* ===== LINKS SECTION ===== */}
        <motion.div
          className="footer-links"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h4>Company</h4>
            <a href="/">About</a>
            <a href="/">Careers</a>
            <a href="/">Contact</a>
          </div>

          <div>
            <h4>Support</h4>
            <a href="/">Help Center</a>
            <a href="/">Terms of Service</a>
            <a href="/">Privacy Policy</a>
          </div>

          <div>
            <h4>Resources</h4>
            <a href="/">Blog</a>
            <a href="/">Guides</a>
            <a href="/">Community</a>
          </div>
        </motion.div>

      </div>

      {/* ===== BOTTOM SECTION ===== */}
      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
      >
        <p>© 2026 JobFinder. All rights reserved.</p>

        <nav>
          <a href="/">
            <CiMail />
            info@jobfinder.com
          </a>
          <a href="/">
            <LuPhone />
            +2348154273894
          </a>
          <a href="/">
            <CiLocationOn />
            New York, NY
          </a>
        </nav>
      </motion.div>
    </motion.footer>
  );
}
