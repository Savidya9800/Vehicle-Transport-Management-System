import React, { useEffect, useRef, useState } from 'react';
import SideBar from './SideBar';
import axios from "axios";
import Repair from './RepairV';
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:8080/api/repair";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function RepairVeh() {
  const [repairs, setRepairs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.repairs) {
        setRepairs(data.repairs);
      } else {
        console.error('API did not return expected data');
      }
    });
  }, []);

  const ComponentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentRef.current,
    documentTitle: "Repair Report",
    onAfterPrint: () => alert("Repair Report Successfully Downloaded!"),
  });

  const handleSearch = () => {
    const filteredRepairs = repairs.filter((repair) =>
      Object.values(repair).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setRepairs(filteredRepairs);
    setNoResults(filteredRepairs.length === 0);
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-grow p-4">
        <div className="flex justify-end mb-4">
          <div className="flex items-center">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name="search"
              placeholder="Search Repair Details..."
              className="border border-blue-900 rounded p-2 mr-2 w-64"
            />
            <button onClick={handleSearch} className="bg-blue-900 text-white rounded p-2 hover:bg-blue-700 transition duration-300">
              Search
            </button>
          </div>
        </div>

        {noResults ? (
          <div>
            <p className="text-red-600">No Repairs Found</p>
          </div>
        ) : (
          <div ref={ComponentRef} className="bg-gray-200 rounded-lg shadow-lg p-4 mx-72">
            <h2 className="text-2xl font-bold mb-4">Repair Management</h2>
            {repairs.length > 0 ? (
              <table className="min-w-full mt-4 bg-gray-300 border border-gray-300 rounded">
                <thead>
                  <tr className="bg-gray-600 text-white">
                    <th className="p-2 border border-gray-300">Repair ID</th>
                    <th className="p-2 border border-gray-300">Vehicle Number</th>
                    <th className="p-2 border border-gray-300">Repair Date</th>
                    <th className="p-2 border border-gray-300">Part Replaced</th>
                    <th className="p-2 border border-gray-300">Repair Cost</th>
                    <th className="p-2 border border-gray-300">Repair Status</th>
                  </tr>
                </thead>
                <tbody>
                  {repairs.map((repair, i) => (
                    <Repair key={i} repairs={repair} />
                  ))}
                </tbody>
              </table>
            ) : (
              <h3 className="text-lg text-gray-600">No repair data available</h3>
            )}
            <div className="flex justify-between mt-4">
              <Link to="/addRepairs" className="model">
                <button className="bg-blue-900 text-white rounded p-2 hover:bg-blue-700 transition duration-300">
                  Add
                </button>
              </Link>
              <button className="bg-blue-900 text-white rounded p-2 hover:bg-blue-700 transition duration-300" onClick={handlePrint}>
                Generate Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RepairVeh;
