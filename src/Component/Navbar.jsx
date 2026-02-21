// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// // import "../componentscss/navbar.scss";

// const Navbar = () => {
//   const user = JSON.parse(localStorage.getItem("loggedInUser"));
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("loggedInUser");
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <h2>JobFinder</h2>
//       {user && (
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/saved">Saved</Link></li>
//           <li onClick={logout}>Logout</li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;