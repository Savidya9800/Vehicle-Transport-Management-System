import React, { useEffect, useRef, useState } from "react";
import "./DriverServices.scoped.css";
import axios from "axios";
import Service from "./DriverService";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import DriverSideBar from "./DriverSideBar";
import NavBar from "../../common/Atoms/Navbar";
import Header from "../../common/Atoms/Header";
import Footer from "../../common/Atoms/Footer";

const URL = "http://localhost:8080/api/maintain";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function DriverServices() {
  const [maintenances, setMaintenances] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.maintenances) {
        setMaintenances(data.maintenances);
      } else {
        console.error("API did not return expected data");
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
        field
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
    setMaintenances(filteredServices);
    setNoResults(filteredServices.length === 0);
  };

  return (
    <div>
      <Header />
      <NavBar />

      <div className="flex justify-end mt-2 mr-2">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Service Details..."
          className="w-72 p-2 border border-blue-800 rounded"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {noResults ? (
        <div>
          <p>No Services Found</p>
        </div>
      ) : (
        <div
          ref={ComponentRef}
          className=" p-4 mt-4 rounded shadow-lg mx-auto max-w-4xl"
        >
          <h2 className="text-xl font-semibold text-center">Service Details</h2>
          <br />
          {maintenances.length > 0 ? (
            <table className="min-w-full bg-white shadow-md rounded sh">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-white bg-gray-800">
                    Service ID
                  </th>
                  <th className="px-4 py-2 text-white bg-gray-800">
                    Vehicle Number
                  </th>
                  <th className="px-4 py-2 text-white bg-gray-800">
                    Service Date
                  </th>
                  <th className="px-4 py-2 text-white bg-gray-800">
                    Service Type
                  </th>
                  <th className="px-4 py-2 text-white bg-gray-800">
                    Service Status
                  </th>
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
          <div>
            <br />
          </div>
        </div>
      )}
    </div>
  );
}

export default DriverServices;
