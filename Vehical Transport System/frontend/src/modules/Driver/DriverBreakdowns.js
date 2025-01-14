import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BreakdownD from './DriverBreakdown'; // The component that renders individual breakdowns
import { Link } from "react-router-dom";
import NavBar from '../../common/Atoms/Navbar';
import Header from '../../common/Atoms/Header';

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
        console.error('API did not return expected data');
      }
    });
  }, []);

  const handleSearch = () => {
    const filteredBreakdowns = breakdowns.filter((breakdown) =>
      Object.values(breakdown).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setBreakdowns(filteredBreakdowns);
    setNoResults(filteredBreakdowns.length === 0);
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
          placeholder="Search Breakdown Details..."
          className="w-72 p-2 border rounded-md border-blue-800"
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
          <p>No Breakdowns Found</p>
        </div>
      ) : (
        <div className="bg-gray-200 p-2 rounded-lg shadow-md  flex flex-col items-center mx-72">
          <h2 className="mt-2 ml-2 text-xl">Breakdown Details</h2>
          <br />
          {breakdowns.length > 0 ? (
            <table className="w-full mx-auto text-center bg-gray-300 rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="bg-gray-600 text-white font-bold p-2 rounded-md">Vehicle Number</th>
                  <th className="bg-gray-600 text-white font-bold p-2 rounded-md">Date</th>
                  <th className="bg-gray-600 text-white font-bold p-2 rounded-md">Part Replaced</th>
                  <th className="bg-gray-600 text-white font-bold p-2 rounded-md">Repair Cost</th>
                  <th className="bg-gray-600 text-white font-bold p-2 rounded-md">Employee ID</th>
                  <th className="bg-gray-600 text-white font-bold p-2 rounded-md">Employee Name</th>
                </tr>
              </thead>
              <tbody>
                {breakdowns.map((breakdown, i) => (
                  <BreakdownD key={i} breakdown={breakdown} />
                ))}
              </tbody>
            </table>
          ) : (
            <h3>No breakdown data available</h3>
          )}
          <Link to="/addBreakdown" className="mt-2">
            <button className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition ease-in-out">
              Add Breakdown
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Breakdowns;
