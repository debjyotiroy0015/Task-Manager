import React from "react";
import { TiThMenu } from "react-icons/ti";
const NavBar = ({ setIsSideBarOpen }) => {
  return (
    <nav className="w-full h-[15%] bg-slate-900 flex justify-between items-center pb-4 pt-4 pl-4 pr-4">
      <div className="logo text-white">TManager</div>
      <div className="logout-button text-white text-sm cursor-pointer hidden sm:block">
        Logout
      </div>
      <div className="logout-button text-white text-sm cursor-pointer sm:hidden">
        <TiThMenu size={20} onClick={() => setIsSideBarOpen((prev) => !prev)} />
      </div>
    </nav>
  );
};

export default NavBar;
