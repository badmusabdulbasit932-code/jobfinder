import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import "../ComponentCss/card.css";

export default function AllJobs({
  searchQuery = "",
  savedJobs = [],
  toggleSaveJob,
  postedJobs = []
}) {
  const navigate = useNavigate();
  const [apiJobs, setApiJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchJobs = async () => {
      try {



        console.log("Error");
        const res = await fetch("/api/jobs");
        console.log("Hello");

        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await res.json();
        setApiJobs(data.jobs || []);
      } catch (error) {
        console.error("API Error:", error);
        setApiJobs([]); // fallback so app does not break
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const staticJobs = [
    {
      id: "design-1",
      title: "Frontend Developer",
      company_name: "Google",
      candidate_required_location: "Remote",
      job_type: "Full Time",
      salary: "$4,000 - $6,000",
      description: "Build and maintain modern user interfaces using React."
    },
    {
      id: "design-2",
      title: "UI/UX Designer",
      company_name: "Dribbble",
      candidate_required_location: "USA",
      job_type: "Contract",
      salary: "Salary not disclosed",
      description: "Design intuitive user experiences and clean interfaces."
    },
    {
      id: "design-3",
      title: "Backend Engineer",
      company_name: "Stripe",
      candidate_required_location: "Remote",
      job_type: "Full Time",
      salary: "$5,000+",
      description: "Develop scalable APIs and backend services."
    }
  ];

  let jobs = [...postedJobs, ...staticJobs, ...apiJobs];

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    jobs = jobs.filter(
      job =>
        job.title?.toLowerCase().includes(q) ||
        job.company_name?.toLowerCase().includes(q)
    );
  }

  const cardAnim = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", bounce: 0.35, duration: 0.6 }
    }
  };

  return (
    <section className="jobs">
      <h2>All Job Opportunities</h2>

      {loading && <p>Loading jobs...</p>}

      <div className="job-grid">
        {jobs.map(job => {
          const isSaved = savedJobs.some(j => j.id === job.id);

          return (
            <motion.div
              key={job.id}
              className="job-card"
              variants={cardAnim}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ y: -6 }}
            >
              <div className="card-top">
                <div className="title">
                  <h3>{job.title}</h3>
                  <p className="company">{job.company_name}</p>
                </div>

                {isSaved ? (
                  <AiFillHeart
                    className="heart active"
                    onClick={() => toggleSaveJob(job)}
                  />
                ) : (
                  <AiOutlineHeart
                    className="heart"
                    onClick={() => toggleSaveJob(job)}
                  />
                )}
              </div>

              <div className="location">
                <HiOutlineLocationMarker />
                {job.candidate_required_location || "Remote"}
                <span className="job-type">{job.job_type}</span>
              </div>

              <p className="salary">
                {job.salary || "Salary not disclosed"}
              </p>

              <p className="description">
                {job.description
                  ? job.description.replace(/<[^>]+>/g, "").slice(0, 100)
                  : "No description available"}
                ...
              </p>

              <motion.button
                className="details-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/job/${job.id}`)}
              >
                View Details
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}