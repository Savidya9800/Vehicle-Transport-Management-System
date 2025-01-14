import React from "react";
import { Link } from "react-router-dom";

function DriverSideBar() {
  return (
    <div className="w-64 bg-blue-900 p-5 text-white fixed top-0 h-full opacity-90">
      <Link to="/" className="block mb-6 text-xl">
        <h2>Maintenance and Repair Details</h2>
      </Link>
      <ul className="list-none">
        <Link to="/ServiceDr" className="block mb-4">
          <li className="text-lg">Service Details</li>
        </Link>
        <Link to="/RepairDr" className="block mb-4">
          <li className="text-lg">Repair Details</li>
        </Link>
        <Link to="/BreakdownDr" className="block mb-4">
          <li className="text-lg">Breakdown Details</li>
        </Link>
      </ul>
    </div>
  );
}

export default DriverSideBar;
