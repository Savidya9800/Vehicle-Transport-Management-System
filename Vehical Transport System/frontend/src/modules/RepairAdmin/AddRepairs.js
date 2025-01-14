import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from './SideBar';

function AddRepairs() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    repairID: "",
    repairNumber: "",
    repairDate: "",
    partReplace: "",
    repairCost: "",
    repairStatus: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    // Repair ID validation: must start with 'R' and be exactly 5 characters long
    const repairIDRegex = /^R[A-Z0-9]{1,4}$/;
    if (!repairIDRegex.test(inputs.repairID)) {
      alert("Repair ID must start with 'R' and be exactly 5 characters long.");
      return;
    }

    // Repair Number validation: must be exactly 9 characters long, uppercase letters, digits, and optional dash
    const repairNumberRegex = /^(?:[A-Z0-9]-?){2,8}[A-Z0-9]$/; 
    if (!repairNumberRegex.test(inputs.repairNumber)) {
      alert("Repair number must be exactly 9 characters.");
      return;
    }

    // Part Replace validation: must be letters, numbers, or both, with max 25 characters
    const partReplaceRegex = /^[A-Za-z0-9]{1,25}$/;
    if (!partReplaceRegex.test(inputs.partReplace)) {
      alert("Part replaced must only contain letters or numbers and not exceed 25 characters.");
      return;
    }

    // Repair Cost validation: only decimals allowed with up to two decimal places (e.g., 10.00)
    const repairCostRegex = /^\d+(\.\d{1,2})?$/;
    if (!repairCostRegex.test(inputs.repairCost)) {
      alert("Repair cost must be a valid decimal number.");
      return;
    }

    window.alert("Repair added successfully");
    sendRequest().then(() => navigate('/Repair'));
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:8080/api/repair", {
      repairID: String(inputs.repairID),
      repairNumber: String(inputs.repairNumber),
      repairDate: new Date(inputs.repairDate).toISOString(),
      partReplace: String(inputs.partReplace),
      repairCost: Number(inputs.repairCost),
      repairStatus: String(inputs.repairStatus),
    }).then((res) => res.data);
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="bg-gray-300 p-4 rounded-lg shadow-md mx-auto mt-8 w-full max-w-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Add Repairs</h2>
        <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded-lg">
          <label className="block mb-2 font-bold text-gray-700">Repair ID</label>
          <input
            type="text"
            name="repairID"
            onChange={handleChange}
            value={inputs.repairID}
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          
          <label className="block mb-2 font-bold text-gray-700">Vehicle Number</label>
          <input
            type="text"
            name="repairNumber"
            onChange={handleChange}
            value={inputs.repairNumber}
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          
          <label className="block mb-2 font-bold text-gray-700">Repair Date</label>
          <input
            type="date"
            name="repairDate"
            onChange={handleChange}
            value={inputs.repairDate}
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          
          <label className="block mb-2 font-bold text-gray-700">Part Replaced</label>
          <input
            type="text"
            name="partReplace"
            onChange={handleChange}
            value={inputs.partReplace}
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          
          <label className="block mb-2 font-bold text-gray-700">Repair Cost</label>
          <input
            type="number"
            name="repairCost"
            onChange={handleChange}
            value={inputs.repairCost}
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          
          <label className="block mb-2 font-bold text-gray-700">Repair Status</label>
          <select 
            name="repairStatus" 
            onChange={handleChange} 
            value={inputs.repairStatus} 
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          >
            <option value="">Select Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="In Process">In Process</option>
          </select>

          <button 
            type="submit" 
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRepairs;
