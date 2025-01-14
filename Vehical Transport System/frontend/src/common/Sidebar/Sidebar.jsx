import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="w-64 bg-blue-800 p-5 text-white fixed top-0 bottom-0 opacity-95">
      <Link to="/" className="text-white no-underline">
        <h2 className="mb-6 text-2xl">Maintenance and Repair Management</h2>
      </Link>
      <ul className="list-none p-0">
        <Link to="/Service" className="text-white no-underline">
          <li className="mb-4 mt-6 text-lg">Service Management</li>
        </Link>
        <Link to="/Repair" className="text-white no-underline">
          <li className="mb-4 text-lg">Repair Management</li>
        </Link>
        <Link to="/Breakdown" className="text-white no-underline">
          <li className="mb-4 text-lg">Breakdown Management</li>
        </Link>
      </ul>
    </div>
  );
}

export default SideBar;
