import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DriverSideBar from './DriverSideBar';
import "./UpdateBreakdowns.scoped.css";

const UpdateBreakdown = () => {
  const { id } = useParams(); // Get the breakdown ID from URL parameters
  const [inputs, setInputs] = useState({
    vehicleNumber: '',
    date: '',
    partReplace: '',
    repairCost: '',
    employeeID: '',
    employeeName: ''
  }); // Initialize state with default empty values
  const navigate = useNavigate();

  // Fetch breakdown data when the component mounts
  useEffect(() => {
    const fetchBreakdown = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/breakdown/${id}`);
        if (response.data && response.data.breakdown) {
          setInputs(response.data.breakdown); // Set the response data in state
        }
      } catch (error) {
        console.error('Error fetching breakdown data:', error);
        alert('Failed to fetch breakdown details.');
      }
    };
    fetchBreakdown();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/breakdown/${id}`, inputs);
      alert('Breakdown updated successfully');
      navigate("/BreakdownDr"); // Redirect to Breakdown list or page after successful update
    } catch (error) {
      console.error('Error updating breakdown:', error);
      alert('Failed to update breakdown. Please try again.');
    }
  };

  return (
    <div>
      <DriverSideBar />
      <div className="bg-gray-200 p-4 mt-12 rounded-lg shadow-md ml-[17.5pc] h-[2.8pc]">
        <h2 className="mt-2 ml-2 text-xl">Update Breakdown</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Vehicle Number:</label>
            <input
              type="text"
              name="vehicleNumber"
              value={inputs.vehicleNumber}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Date:</label>
            <input
              type="date"
              name="date"
              value={inputs.date}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Part Replaced:</label>
            <input
              type="text"
              name="partReplace"
              value={inputs.partReplace}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Repair Cost:</label>
            <input
              type="number"
              name="repairCost"
              value={inputs.repairCost}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Employee ID:</label>
            <input
              type="text"
              name="employeeID"
              value={inputs.employeeID}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Employee Name:</label>
            <input
              type="text"
              name="employeeName"
              value={inputs.employeeName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Update Breakdown
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBreakdown;
