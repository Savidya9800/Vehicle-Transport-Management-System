import React, { useEffect, useState } from "react";
import axios from "axios";
import Repair from "./DriverRepair";
import NavBar from "../../common/Atoms/Navbar";
import Header from "../../common/Atoms/Header";

const URL = "http://localhost:8080/api/repair";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function DriverRepairs() {
  const [repairs, setRepairs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.repairs) {
        setRepairs(data.repairs);
      } else {
        console.error("API did not return expected data");
      }
    });
  }, []);

  const handleSearch = () => {
    const filteredRepairs = repairs.filter((repair) =>
      Object.values(repair).some((field) =>
        field
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
    setRepairs(filteredRepairs);
    setNoResults(filteredRepairs.length === 0);
  };

  return (
    <div>
      <Header />
      <NavBar />

      <div className="flex justify-end mb-2 mt-2 mr-2">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Repair Details..."
          className="w-72 p-2 border border-blue-800 rounded-md"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition ease-in-out"
        >
          Search
        </button>
      </div>

      {noResults ? (
        <div>
          <p>No Repairs Found</p>
        </div>
      ) : (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md mx-80">
          <h2 className="text-xl mb-4">Repair Details</h2>
          {repairs.length > 0 ? (
            <table className="w-full bg-gray-300 rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="bg-gray-600 text-white font-bold p-2">
                    Repair ID
                  </th>
                  <th className="bg-gray-600 text-white font-bold p-2">
                    Vehicle Number
                  </th>
                  <th className="bg-gray-600 text-white font-bold p-2">
                    Repair Date
                  </th>
                  <th className="bg-gray-600 text-white font-bold p-2">
                    Part Replaced
                  </th>
                  <th className="bg-gray-600 text-white font-bold p-2">
                    Repair Cost
                  </th>
                  <th className="bg-gray-600 text-white font-bold p-2">
                    Repair Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {repairs.map((repair, i) => (
                  <Repair key={i} repairs={repair} />
                ))}
              </tbody>
            </table>
          ) : (
            <h3>No repair data available</h3>
          )}
        </div>
      )}
    </div>
  );
}

export default DriverRepairs;
