import { motion } from "framer-motion";
import "../ComponentCss/main.css";
import { FiSearch } from "react-icons/fi";
import Hero from "../ComponentImages/hero.png";

export default function Main({
  searchQuery,
  setSearchQuery,
  setLocationFilter,
  setJobType,
  setSalaryRange,
  setSortBy,
}) {
  return (
    <motion.section
      className="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="hero">

        {/* LEFT */}
        <motion.div
          className="hero-text"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          <motion.h1 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
            Find Your Dream Job
          </motion.h1>

          <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            Explore thousands of job opportunities and take the next step in your career.
          </motion.p>

          {/* SEARCH */}
          <motion.div
            className="textbox"
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.02 }}
          >
            <FiSearch className="icon" />
            <input
              type="text"
              placeholder="Search job title or company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>

          {/* FILTERS */}
          <motion.div
            className="filters"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <select onChange={(e) => setLocationFilter(e.target.value)}>
              <option value="">Location</option>
              <option value="remote">Remote</option>
              <option value="usa">USA</option>
            </select>

            <select onChange={(e) => setJobType(e.target.value)}>
              <option value="">Job Type</option>
              <option value="full_time">Full Time</option>
              <option value="contract">Contract</option>
            </select>

            <select onChange={(e) => setSalaryRange(e.target.value)}>
              <option value="">Salary</option>
              <option value="paid">Paid Only</option>
            </select>

            <select onChange={(e) => setSortBy(e.target.value)}>
              <option value="">Sort</option>
              <option value="latest">Latest</option>
            </select>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={Hero}
            alt="Hero"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

      </div>
    </motion.section>
  );
}
