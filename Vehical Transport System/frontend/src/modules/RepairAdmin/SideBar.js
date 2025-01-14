import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="w-48 bg-gray-900 p-5 text-white fixed top-0 bottom-0 opacity-90">
      <Link to="/admin/*" className="block mb-5">
        <h2 className="text-lg font-semibold">Maintenance and Repair Management</h2>
      </Link>
      <ul className="list-none">
        <Link to="/Service" className="block mb-4">
          <li className="mt-6 text-base">Service Management</li>
        </Link>
        <Link to="/Repair" className="block mb-4">
          <li className="mt-6 text-base">Repair Management</li>
        </Link>
        <Link to="/Breakdown" className="block mb-4">
          <li className="mt-6 text-base">Breakdown Management</li>
        </Link>
        <Link to="/BreakdownNotification" className="block mb-4">
          <li className="mt-6 text-base">Notifications</li>
        </Link>
      </ul>
    </div>
  );
}

export default SideBar;
