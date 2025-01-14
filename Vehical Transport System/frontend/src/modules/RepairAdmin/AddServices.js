import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from './SideBar';

function AddServices() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    serviceID: "",
    vehicleNumber: "",
    serviceDate: "",
    serviceType: "",
    serviceStatus: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    const serviceIDRegex = /^S[A-Z0-9]{1,4}$/;
    if (!serviceIDRegex.test(inputs.serviceID)) {
      alert("Service ID must start with 'S' and be exactly 5 characters long.");
      return;
    }

    const vehicleNumberRegex = /^(?:[A-Z0-9]-?){2,8}[A-Z0-9]$/; 
    if (!vehicleNumberRegex.test(inputs.vehicleNumber)) {
      alert("Vehicle number must be exactly 9 characters.");
      return;
    }

    const serviceTypeRegex = /^[A-Za-z0-9\s]{1,25}$/;
    if (!serviceTypeRegex.test(inputs.serviceType)) {
      alert("Service type must only contain letters, numbers, and not exceed 25 characters.");
      return;
    }

    window.alert("Service added successfully");
    await sendRequest();
    navigate('/Service');
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:8080/api/maintain", {
      serviceID: String(inputs.serviceID),
      vehicleNumber: String(inputs.vehicleNumber),
      serviceDate: new Date(inputs.serviceDate).toISOString(),
      serviceType: String(inputs.serviceType),
      serviceStatus: String(inputs.serviceStatus),
    }).then((res) => res.data);
  };

  return (
    <div>
      <SideBar />
      <div className="bg-gray-400 p-4 mt-12 rounded-lg shadow-lg mx-auto w-3/4">
        <h2 className="mt-2 ml-2 text-lg font-bold">Add Services</h2>
        <form onSubmit={handleSubmit} className="bg-gray-300 p-5 rounded-lg w-full">
          <label className="block mb-2 text-lg font-semibold text-gray-800">Service ID</label>
          <input
            type="text"
            name="serviceID"
            onChange={handleChange}
            value={inputs.serviceID}
            required
            className="p-2 border border-gray-400 rounded mb-4 w-full"
          />
          
          <label className="block mb-2 text-lg font-semibold text-gray-800">Vehicle Number</label>
          <input
            type="text"
            name="vehicleNumber"
            onChange={handleChange}
            value={inputs.vehicleNumber}
            required
            className="p-2 border border-gray-400 rounded mb-4 w-full"
          />

          <label className="block mb-2 text-lg font-semibold text-gray-800">Service Date</label>
          <input
            type="date"
            name="serviceDate"
            onChange={handleChange}
            value={inputs.serviceDate}
            required
            className="p-2 border border-gray-400 rounded mb-4 w-full"
          />

          <label className="block mb-2 text-lg font-semibold text-gray-800">Service Type</label>
          <input
            type="text"
            name="serviceType"
            onChange={handleChange}
            value={inputs.serviceType}
            required
            className="p-2 border border-gray-400 rounded mb-4 w-full"
          />

          <label className="block mb-2 text-lg font-semibold text-gray-800">Service Status</label>
          <select 
            name="serviceStatus" 
            onChange={handleChange} 
            value={inputs.serviceStatus} 
            required
            className="p-2 border border-gray-400 rounded mb-4 w-full"
          >
            <option value="">Select Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="In Process">In Process</option>
          </select>

          <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddServices;
