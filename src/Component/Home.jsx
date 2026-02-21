// import React, { useEffect, useState } from "react";
// import JobCard from "./JobCArd";
// import "../componentscss/home.scss";

// const Home = () => {
//   const [jobs, setJobs] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetch("https://corsproxy.io/?https://remotive.com/api/remote-jobs")
//       .then(res => res.json())
//       .then(data => setJobs(data.jobs));
//   }, []);

//   const filtered = jobs.filter(j =>
//     j.title.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="home">
//       <input
//         placeholder="Search jobs..."
//         onChange={e => setSearch(e.target.value)}
//       />

//       <div className="jobs">
//         {filtered.map(job => (
//           <JobCard key={job.id} job={job} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;