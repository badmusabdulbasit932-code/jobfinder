import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../ComponentCss/PostJob.css";

const PostJob = ({ user }) => {
  const [form, setForm] = useState({
    title: "",
    company_name: "",
    candidate_required_location: "",
    salary: "",
    job_type: "Full-time",
    description: "",
    url: ""
  });

  const [previewJob, setPreviewJob] = useState(null);
  const [postedJobs, setPostedJobs] = useState([]);

  // ✅ Load jobs PER USER (frontend only)
  useEffect(() => {
    if (!user?.email) return;
    const key = `postedJobs_${user.email}`;
    const jobs = JSON.parse(localStorage.getItem(key)) || [];
    setPostedJobs(jobs);
  }, [user]);

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Preview without saving
  const handlePreview = () => {
    const temp = {
      ...form,
      id: "preview-" + Date.now()
    };
    setPreviewJob(temp);
  };

  // ✅ Post Job (save to localStorage)
  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      ...form,
      id: "posted-" + Date.now()
    };

    const key = `postedJobs_${user?.email}`;
    const existingJobs =
      JSON.parse(localStorage.getItem(key)) || [];

    const updated = [newJob, ...existingJobs];

    localStorage.setItem(key, JSON.stringify(updated));
    setPostedJobs(updated);
    setPreviewJob(newJob);

    alert("Job posted successfully ✅");
  };

  // ✅ Remove posted job
  const removeJob = (id) => {
    const key = `postedJobs_${user?.email}`;
    const filtered = postedJobs.filter((job) => job.id !== id);

    localStorage.setItem(key, JSON.stringify(filtered));
    setPostedJobs(filtered);
  };

  return (
    <div className="post-job-page">
      <motion.div
        className="post-job-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Post a New Job</h2>
        <p className="subtitle">
          Fill in the details below to create a new job listing.
        </p>

        <form onSubmit={handleSubmit}>
          {/* ================= JOB DETAILS ================= */}
          <h3>Job Details</h3>

          <div className="form-grid">
            <div>
              <label>Job Title</label>
              <input
                name="title"
                placeholder="e.g., Senior Software Engineer"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Company Name</label>
              <input
                name="company_name"
                placeholder="e.g., Tech Innovations Inc."
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Location</label>
              <input
                name="candidate_required_location"
                placeholder="e.g., Remote"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Salary Range</label>
              <input
                name="salary"
                placeholder="e.g., $120,000 - $160,000 / year"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Job Type</label>
              <select name="job_type" onChange={handleChange}>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Remote</option>
              </select>
            </div>
          </div>

          {/* ================= DESCRIPTION ================= */}
          <h3>Job Description</h3>

          <div className="form-column">
            <div>
              <label>Full Description / Requirements</label>
              <textarea
                name="description"
                placeholder="Detail the responsibilities, qualifications, and benefits."
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          {/* ================= APPLICATION ================= */}
          <h3>Application Information</h3>

          <div className="form-column">
            <div>
              <label>Application URL</label>
              <input
                name="url"
                placeholder="https://company.com/apply"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="form-actions">
            <button
              type="button"
              className="preview-btn"
              onClick={handlePreview}
            >
              Preview Job
            </button>

            <button type="submit" className="post-btn">
              Post Job
            </button>
          </div>
        </form>

        {/* ✅ PREVIEW AREA (keeps design structure) */}
        {previewJob && (
          <div className="preview-section">
            <h3>Preview</h3>
            <h4>{previewJob.title}</h4>
            <p>{previewJob.company_name}</p>
            <p>{previewJob.candidate_required_location}</p>
            <p>{previewJob.salary}</p>
            <p>{previewJob.description}</p>
          </div>
        )}

        {/* ✅ USER POSTED JOBS */}
        {postedJobs.length > 0 && (
          <div className="preview-section">
            <h3>Your Posted Jobs</h3>

            {postedJobs.map((job) => (
              <div key={job.id} className="job-preview-card">
                <h4>{job.title}</h4>
                <p>{job.company_name}</p>

                <button
                  className="preview-btn"
                  onClick={() => setPreviewJob(job)}
                >
                  Preview
                </button>

                <button
                  className="post-btn"
                  onClick={() => removeJob(job.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PostJob;
