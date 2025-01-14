import React, { useEffect, useRef, useState } from 'react';
import SideBar from './SideBar';
import axios from "axios";
import Service from './Service';
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:8080/api/maintain";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Services() {
  const [maintenances, setMaintenances] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.maintenances) {
        setMaintenances(data.maintenances);
      } else {
        console.error('API did not return expected data');
      }
    });
  }, []);

  const ComponentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentRef.current,
    documentTitle: "Service Report",
    onAfterPrint: () => alert("Service Report Successfully Downloaded!"),
  });

  const handleSearch = () => {
    const filteredServices = maintenances.filter((service) =>
      Object.values(service).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setMaintenances(filteredServices);
    setNoResults(filteredServices.length === 0);
  };

  return (
    <div>
      <SideBar />
      <div className="flex justify-end mb-4 mt-2 mr-2">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Service Details..."
          className="border border-blue-900 rounded px-2 py-1 mr-2 w-72"
        />
        <button onClick={handleSearch} className="bg-blue-900 text-white rounded px-4 py-1 hover:bg-blue-700 transition duration-200">
          Search
        </button>
      </div>

      {noResults ? (
        <div>
          <p>No Services Found</p>
        </div>
      ) : (
        <div ref={ComponentRef} className="bg-gray-300 p-4 rounded-lg shadow-md mt-4 mx-72">
          <h2 className="text-xl font-semibold mb-2">Service Management</h2>
          <br />
          {maintenances.length > 0 ? (
            <table className="w-4/5 mx-auto border-collapse bg-gray-200">
              <thead>
                <tr>
                  <th className="bg-gray-600 text-white font-bold py-2 px-2 rounded-t">Service ID</th>
                  <th className="bg-gray-600 text-white font-bold py-2 px-2 rounded-t">Vehicle Number</th>
                  <th className="bg-gray-600 text-white font-bold py-2 px-2 rounded-t">Service Date</th>
                  <th className="bg-gray-600 text-white font-bold py-2 px-2 rounded-t">Service Type</th>
                  <th className="bg-gray-600 text-white font-bold py-2 px-2 rounded-t">Service Status</th>
                </tr>
              </thead>
              <tbody>
                {maintenances.map((maintenance, i) => (
                  <Service key={i} maintenances={maintenance} />
                ))}
              </tbody>
            </table>
          ) : (
            <h3>No service data available</h3>
          )}
          <div className="mt-4 flex justify-between">
            <Link to="/addServices">
              <button className="bg-blue-900 text-white rounded px-4 py-1 hover:bg-blue-700 transition duration-200">
                Add
              </button>
            </Link>
            <button className="bg-blue-900 text-white rounded px-4 py-1 hover:bg-blue-700 transition duration-200" onClick={handlePrint}>
              Generate Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;
