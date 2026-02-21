import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillDelete, AiOutlineHeart } from "react-icons/ai";
import { FiBriefcase, FiSettings, FiLogOut } from "react-icons/fi";
import "../ComponentCss/SavedJobs.css";
import profileImg from "../ComponentImages/profile.png";

export default function SavedJobs({ savedJobs, toggleSaveJob }) {
  const navigate = useNavigate();

  const [appliedJobs, setAppliedJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("saved");

  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    avatar: ""
  });

  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirm: ""
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab) setActiveTab(tab);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      navigate("/login");
      return;
    }

    setUser(currentUser);

    setEditUser({
      name: currentUser.name,
      email: currentUser.email,
      avatar: currentUser.avatar || ""
    });

    const applied =
      JSON.parse(localStorage.getItem(`appliedJobs_${currentUser.email}`)) || [];

    setAppliedJobs(applied);
  }, [navigate]);

  /* ================= REMOVE SAVED JOB (SYNCED WITH APP) ================= */
  const removeSavedJob = (job) => {
    toggleSaveJob(job);
  };

  const removeAppliedJob = (id) => {
    const updated = appliedJobs.filter(j => j.id !== id);
    setAppliedJobs(updated);
    localStorage.setItem(`appliedJobs_${user.email}`, JSON.stringify(updated));
  };

  /* ================= LOGOUT FIXED ================= */
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  const handleSaveAccount = () => {
    const updatedUser = { ...user, ...editUser };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUser(updatedUser);

    alert("Account updated successfully");
  };

  const handleChangePassword = () => {
    if (!passwords.old || !passwords.new || !passwords.confirm) {
      alert("Fill all password fields");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(u => u.email === user.email);

    if (foundUser.password !== passwords.old) {
      alert("Old password is incorrect");
      return;
    }

    const updatedUsers = users.map(u =>
      u.email === user.email ? { ...u, password: passwords.new } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Password changed successfully");

    setPasswords({
      old: "",
      new: "",
      confirm: ""
    });
  };

  const jobsToDisplay =
    activeTab === "saved"
      ? savedJobs
      : activeTab === "applied"
      ? appliedJobs
      : [];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  return (
    <motion.section
      className="saved-jobs-page"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="dashboard-layout">

        {/* SIDEBAR */}
        <motion.aside
          className="user-sidebar"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="user-profile"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <img
              src={user?.avatar || profileImg}
              className="user-avatar"
              alt="profile"
            />
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
          </motion.div>

          <ul className="user-menu">
            <li
              className={activeTab === "saved" ? "active" : ""}
              onClick={() => setActiveTab("saved")}
            >
              <AiOutlineHeart /> Saved Jobs
            </li>

            <li
              className={activeTab === "applied" ? "active" : ""}
              onClick={() => setActiveTab("applied")}
            >
              <FiBriefcase /> Applied Jobs
            </li>

            <li
              className={activeTab === "settings" ? "active" : ""}
              onClick={() => setActiveTab("settings")}
            >
              <FiSettings /> Account Settings
            </li>
          </ul>

          <div className="logout-wrapper">
            <button className="logout-btn" onClick={handleLogout}>
              <FiLogOut /> Log Out
            </button>
          </div>
        </motion.aside>

        {/* CONTENT */}
        <div className="saved-jobs-content">

          {activeTab === "settings" ? (
            <div className="settings-tab">
              <h2 className="page-title">Account Settings</h2>

              <div className="settings-form">
                <h3>Profile</h3>

                <label>
                  Name
                  <input
                    type="text"
                    value={editUser.name}
                    onChange={(e) =>
                      setEditUser({ ...editUser, name: e.target.value })
                    }
                  />
                </label>

                <label>
                  Email
                  <input type="text" value={editUser.email} disabled />
                </label>

                <button className="save-btn" onClick={handleSaveAccount}>
                  Save Changes
                </button>
              </div>

              <div className="settings-form">
                <h3>Change Password</h3>

                <label>
                  Old Password
                  <input
                    type="password"
                    value={passwords.old}
                    onChange={(e) =>
                      setPasswords({ ...passwords, old: e.target.value })
                    }
                  />
                </label>

                <label>
                  New Password
                  <input
                    type="password"
                    value={passwords.new}
                    onChange={(e) =>
                      setPasswords({ ...passwords, new: e.target.value })
                    }
                  />
                </label>

                <label>
                  Confirm Password
                  <input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) =>
                      setPasswords({ ...passwords, confirm: e.target.value })
                    }
                  />
                </label>

                <button className="save-btn" onClick={handleChangePassword}>
                  Update Password
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="page-title">
                {activeTab === "saved" ? "My Saved Jobs" : "My Applied Jobs"}
              </h2>

              {jobsToDisplay.length === 0 ? (
                <p className="empty-text">No jobs yet.</p>
              ) : (
                <motion.div
                  className="saved-jobs-grid"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {jobsToDisplay.map((job) => (
                    <motion.div
                      className="saved-job-card"
                      key={job.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="card-header">
                        {job.company_logo ? (
                          <img
                            src={job.company_logo}
                            alt="logo"
                            className="company-logo"
                          />
                        ) : (
                          <div className="logo-placeholder">
                            {job.company_name?.charAt(0)}
                          </div>
                        )}

                        <div>
                          <h3 className="job-title">{job.title}</h3>
                          <p className="company">{job.company_name}</p>
                          <p className="location">
                            {job.candidate_required_location || "Remote"}
                          </p>
                        </div>
                      </div>

                      <div className="salary-row">
                        <span className="salary">
                          {job.salary || "Salary not disclosed"}
                        </span>

                        {job.job_type && (
                          <span className="badge">{job.job_type}</span>
                        )}
                      </div>

                      <p className="description">
                        {job.description
                          ? job.description.replace(/<[^>]+>/g, "").slice(0, 90)
                          : "No description available"}
                        ...
                      </p>

                      <div className="card-actions">
                        <motion.button
                          className="view-btn"
                          onClick={() => navigate(`/job/${job.id}`)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.button>

                        <motion.button
                          className="delete-btn"
                          onClick={() =>
                            activeTab === "saved"
                              ? removeSavedJob(job)
                              : removeAppliedJob(job.id)
                          }
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <AiFillDelete />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
}