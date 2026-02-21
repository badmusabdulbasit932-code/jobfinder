import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import "../ComponentCss/jobDetails.css";

export default function JobDetails({ savedJobs = [], toggleSaveJob }) {  
  // ✅ default array prevents crash

  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch("https://corsproxy.io/?https://remotive.com/api/remote-jobs")
      .then(res => res.json())
      .then(data => {
        const selected = data.jobs.find(j => String(j.id) === String(id));
        setJob(selected);

        const others = data.jobs
          .filter(j => String(j.id) !== String(id))
          .slice(0, 4);

        setRelatedJobs(others);
      })
      .catch(console.error);
  }, [id]);

  if (!job) return <p>Loading...</p>;

  const isSaved = savedJobs.some(j => j.id === job.id);

  const handleApply = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const key = `appliedJobs_${user.email}`;
    const applied = JSON.parse(localStorage.getItem(key)) || [];

    if (!applied.some(j => j.id === job.id)) {
      applied.unshift(job);
      localStorage.setItem(key, JSON.stringify(applied));
    }

    window.open(job.url, "_blank");
  };

  return (
    <motion.div
      className="job-details-page"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="job-details-container">

        {/* LEFT */}
        <div className="job-left">

          <motion.div
            className="job-header-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <h2 className="job-title">{job.title}</h2>

            <div className="company-row">
              <img
                src={job.company_logo || "https://via.placeholder.com/50"}
                alt=""
              />

              <div>
                <p className="company-name">{job.company_name}</p>
                <span>
                  <CiLocationOn /> {job.candidate_required_location}
                </span>
              </div>
            </div>

            <div className="job-actions">

              <motion.button
                className="apply-btn"
                onClick={handleApply}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply Now
              </motion.button>

              <motion.button
                className="icon-btn"
                onClick={() => toggleSaveJob(job)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isSaved ? <AiFillHeart /> : <AiOutlineHeart />}
              </motion.button>

              <motion.button
                className="icon-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiShare2 />
              </motion.button>
            </div>

            <div className="job-footer">
              <p className="salary">{job.salary || "Salary not disclosed"}</p>
              <span>{job.job_type || "Full-time"}</span>
            </div>
          </motion.div>

          {/* DESCRIPTION */}
          <motion.div
            className="job-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <h3>Job Description</h3>

            <div
              dangerouslySetInnerHTML={{
                __html: showFullDescription
                  ? job.description
                  : job.description.slice(0, 1200) + "..."
              }}
            />

            <motion.p
              className="read-more"
              onClick={() => setShowFullDescription(!showFullDescription)}
              whileHover={{ scale: 1.03 }}
            >
              {showFullDescription ? "Read less" : "Read more"}
            </motion.p>
          </motion.div>
          {/* <div className="job-requirements">
            <h3>Requirements</h3>
            <ul>
              <li>Bachelor's or Master's degree in Computer Science, Engineering, or a related field</li>
              <li>5+ years of experience in software development, preferably in backend systems or platform engineering</li>
              <li>Proficiency in Python and Go, with experience in building high-performance, concurrent applications.</li>
              <li>Experience with cloud platforms (AWS, Azure, GCP) and containerization technologies (Docker, Kubernetes).</li>
              <li>Solid understanding of distributed systems, microservices architecture, and API design</li>
              <li>Familiarity with machine learning concepts and MLOps practices is a plus</li>
              <li>Excellent problem-solving skills and ability to work independently or as part of a team.</li>
            </ul>
          </div> */}
        </div>

        {/* RIGHT */}
        <motion.div
          className="job-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h3>Related Jobs</h3>

          {relatedJobs.map(item => (
            <motion.div
              key={item.id}
              className="related-job-card"
              onClick={() => navigate(`/job/${item.id}`)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <h4>{item.title}</h4>
              <p>{item.company_name}</p>
              <span>
                <CiLocationOn /> {item.candidate_required_location}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.div>
  );
}
