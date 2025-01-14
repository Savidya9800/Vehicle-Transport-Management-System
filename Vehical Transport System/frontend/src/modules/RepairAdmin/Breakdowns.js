import React, { useEffect, useState } from "react";
import axios from "axios";
import Breakdown from "./Breakdown";
import SideBar from "./SideBar";

const URL = "http://localhost:8080/api/breakdown";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Breakdowns() {
  const [breakdowns, setBreakdowns] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.breakdowns) {
        setBreakdowns(data.breakdowns);
      } else {
        console.error("API did not return expected data");
      }
    });
  }, []);

  const handleSearch = () => {
    const filteredBreakdowns = breakdowns.filter((breakdown) =>
      Object.values(breakdown).some((field) =>
        field
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
    setBreakdowns(filteredBreakdowns);
    setNoResults(filteredBreakdowns.length === 0);
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
              placeholder="Search Breakdown Details..."
              className="border border-blue-900 rounded p-2 mr-2 w-64"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-900 text-white rounded p-2 hover:bg-blue-700 transition duration-300"
            >
              Search
            </button>
          </div>
        </div>

        {noResults ? (
          <div>
            <p className="text-red-600">No Breakdowns Found</p>
          </div>
        ) : (
          <div className="bg-gray-200 rounded-lg shadow-lg p-4 mx-72">
            <h2 className="text-2xl font-bold mb-4">Breakdown Management</h2>
            {breakdowns.length > 0 ? (
              <table className="min-w-full mt-4 bg-gray-300 border border-gray-300 rounded">
                <thead>
                  <tr className="bg-gray-600 text-white">
                    <th className="p-2 border border-gray-300">
                      Vehicle Number
                    </th>
                    <th className="p-2 border border-gray-300">Date</th>
                    <th className="p-2 border border-gray-300">
                      Part Replaced
                    </th>
                    <th className="p-2 border border-gray-300">Repair Cost</th>
                    <th className="p-2 border border-gray-300">Employee ID</th>
                    <th className="p-2 border border-gray-300">
                      Employee Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {breakdowns.map((breakdown, i) => (
                    <Breakdown key={i} breakdown={breakdown} />
                  ))}
                </tbody>
              </table>
            ) : (
              <h3 className="text-lg text-gray-600">
                No breakdown data available
              </h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Breakdowns;
