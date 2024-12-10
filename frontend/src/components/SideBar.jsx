// eslint-disable-next-line no-unused-vars
import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

const SideBar = ({ isSideBarOpen, componentHeight, height }) => {
  const sidebarHeight = componentHeight > height ? `${componentHeight}px` : '100vh';

  return (
    <motion.div
      className="w-64 bg-gray-800 text-white p-4 absolute md:relative"
      style={{ height: sidebarHeight }}
      initial={{ x: -300 }} // Sidebar starts off-screen
      animate={{ x: isSideBarOpen ? 0 : -300 }} // Animate in/out based on isSideBarOpen
      transition={{ duration: 0.3, ease: "linear" }} // Smooth animation
    >
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${isActive ? "bg-gray-700 text-blue-400" : "hover:bg-gray-700"}`
            }
          >
            Display Tasks
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${isActive ? "bg-gray-700 text-blue-400" : "hover:bg-gray-700"}`
            }
          >
            Create Task
          </NavLink>
        </li>
      </ul>
    </motion.div>
  );
};

export default SideBar;
