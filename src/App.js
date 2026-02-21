import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./Component/Header";
import Main from "./Component/main";
import Card from "./Component/card";
import AllJobs from "./Component/AllJobs";
import SavedJobs from "./Component/SavedJobs";
import JobDetails from "./Component/jobDetails";
import PostJob from "./Component/PostJob";
import Footer from "./Component/footer";
import SignUp from "./Component/SignUp";
import Login from "./Component/Login";
import ProtectedRoute from "./Component/ProtectedRoute";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  /* ================= AUTH ================= */

  const getUserFromStorage = () => {
    try {
      const stored = localStorage.getItem("currentUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState(getUserFromStorage());
  const isLoggedIn = !!user;
  const userKey = user?.email?.toLowerCase()?.trim();

  useEffect(() => {
    const syncAuth = () => {
      setUser(getUserFromStorage());
    };

    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  /* ================= UI ================= */

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  /* ================= FILTER STATES ================= */

  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [sortBy, setSortBy] = useState("");

  /* ================= USER DATA ================= */

  const [savedJobs, setSavedJobs] = useState([]);
  const [postedJobs, setPostedJobs] = useState([]);

  useEffect(() => {
    if (!userKey) {
      setSavedJobs([]);
      setPostedJobs([]);
      return;
    }

    const saved =
      JSON.parse(localStorage.getItem(`savedJobs_${userKey}`)) || [];

    const posted =
      JSON.parse(localStorage.getItem(`postedJobs_${userKey}`)) || [];

    setSavedJobs(saved);
    setPostedJobs(posted);
  }, [userKey]);

  /* ================= API JOBS ================= */

  const [apiJobs, setApiJobs] = useState([]);

  useEffect(() => {
    fetch("https://corsproxy.io/?https://remotive.com/api/remote-jobs")
      .then((res) => res.json())
      .then((data) => setApiJobs(data?.jobs || []))
      .catch(() => setApiJobs([]));
  }, []);

  /* ================= STATIC JOBS ================= */

  const staticJobs = [
    {
      id: "design-1",
      title: "Frontend Developer",
      company_name: "Google",
      candidate_required_location: "Remote",
      job_type: "Full Time",
      salary: "$4,000 - $6,000",
      description: "Build modern UI using React."
    }
  ];

  /* ================= ALL JOBS COMBINED ================= */

  const allJobs = [...postedJobs, ...staticJobs, ...apiJobs];

  /* ================= SAVE JOB ================= */

  const toggleSaveJob = (job) => {
    if (!isLoggedIn) {
      navigate("/signup");
      return;
    }

    const key = `savedJobs_${userKey}`;
    const saved = JSON.parse(localStorage.getItem(key)) || [];

    const updated = saved.some((j) => j.id === job.id)
      ? saved.filter((j) => j.id !== job.id)
      : [...saved, job];

    setSavedJobs(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  /* ================= ADD JOB ================= */

  const addJob = (job) => {
    if (!isLoggedIn) {
      navigate("/signup");
      return;
    }

    const key = `postedJobs_${userKey}`;
    const updated = [job, ...postedJobs];

    setPostedJobs(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <>
      {!hideLayout && (
        <Header
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
      )}

      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={
            <>
              <Main
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setLocationFilter={setLocationFilter}
                setJobType={setJobType}
                setSalaryRange={setSalaryRange}
                setSortBy={setSortBy}
                isLoggedIn={isLoggedIn}
              />

              <Card
                jobs={allJobs}
                searchQuery={searchQuery}
                locationFilter={locationFilter}
                jobType={jobType}
                salaryRange={salaryRange}
                sortBy={sortBy}
                savedJobs={savedJobs}
                toggleSaveJob={toggleSaveJob}
                limit={9}
                isLoggedIn={isLoggedIn}
              />
            </>
          }
        />

        {/* All Jobs Page */}
        <Route
          path="/all-jobs"
          element={
            <AllJobs
              searchQuery={searchQuery}
              savedJobs={savedJobs}
              toggleSaveJob={toggleSaveJob}
              postedJobs={postedJobs}
            />
          }
        />

        {/* Job Details Page */}
        <Route
          path="/job/:id"
          element={
            <JobDetails
              jobs={allJobs}
              toggleSaveJob={toggleSaveJob}
              savedJobs={savedJobs}
            />
          }
        />

        {/* Post Job Page */}
        <Route
          path="/post-job"
          element={
            <ProtectedRoute>
              <PostJob addJob={addJob} />
            </ProtectedRoute>
          }
        />

        {/* Saved Jobs */}
        <Route
          path="/saved-jobs"
          element={
            <ProtectedRoute>
              <SavedJobs
                savedJobs={savedJobs}
                toggleSaveJob={toggleSaveJob}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          }
        />

        {/* Auth */}
        <Route
          path="/signup"
          element={<SignUp setUser={setUser} />}
        />

        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />

      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}