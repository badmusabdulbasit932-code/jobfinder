import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import "../ComponentCss/card.css";

export default function Card({
  jobs = [],
  searchQuery = "",
  locationFilter,
  jobType,
  salaryRange,
  sortBy,
  savedJobs = [],
  toggleSaveJob,
  limit,
  isLoggedIn
}) {
  const navigate = useNavigate();

  let filteredJobs = jobs.filter((job) => {
    const q = searchQuery.toLowerCase();

    if (
      q &&
      !job.title?.toLowerCase().includes(q) &&
      !job.company_name?.toLowerCase().includes(q)
    )
      return false;

    if (
      locationFilter &&
      !job.candidate_required_location
        ?.toLowerCase()
        .includes(locationFilter)
    )
      return false;

    if (
      jobType &&
      job.job_type
        ?.toLowerCase()
        .replace(/\s+/g, "_") !== jobType
    )
      return false;

    if (salaryRange === "paid" && !job.salary) return false;

    return true;
  });

  if (sortBy === "latest") filteredJobs = [...filteredJobs].reverse();
  if (limit) filteredJobs = filteredJobs.slice(0, limit);

  return (
    <section className="jobs">
      <h2>Latest Job Opportunities</h2>

      <div className="job-grid">
        {filteredJobs.map((job) => {
          const isSaved =
            isLoggedIn &&
            savedJobs.some((j) => j.id === job.id);

          return (
            <motion.div
              className="job-card"
              key={job.id}
              whileHover={{ y: -6 }}
            >
              <div className="card-top">
                <div>
                  <h3>{job.title}</h3>
                  <p className="company">{job.company_name}</p>
                </div>

                {isLoggedIn ? (
                  isSaved ? (
                    <AiFillHeart
                      className="heart active"
                      onClick={() => toggleSaveJob(job)}
                    />
                  ) : (
                    <AiOutlineHeart
                      className="heart"
                      onClick={() => toggleSaveJob(job)}
                    />
                  )
                ) : (
                  <AiOutlineHeart
                    className="heart"
                    onClick={() => navigate("/login")}
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
                {(job.description || "")
                  .replace(/<[^>]+>/g, "")
                  .slice(0, 90)}...
              </p>

              <motion.button
                className="details-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  isLoggedIn
                    ? navigate(`/job/${job.id}`)
                    : navigate("/login")
                }
              >
                View Details
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {limit && (
        <div className="view-all">
          <button
            onClick={() =>
              isLoggedIn
                ? navigate("/all-jobs")   // ✅ Correct route
                : navigate("/login")
            }
          >
            View All Jobs
          </button>
        </div>
      )}
    </section>
  );
}