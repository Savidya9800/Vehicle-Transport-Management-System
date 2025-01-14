import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SideBar from './SideBar';

function UpdateRepairs() {
  const [inputs, setInputs] = useState({
    repairID: '',
    repairNumber: '',
    repairDate: '',
    partReplace: '',
    repairCost: '',
    repairStatus: '',
  });
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepairData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/repair/${id}`);
        if (res.data && res.data.repair) {
          setInputs({
            repairID: res.data.repair.repairID || '',
            repairNumber: res.data.repair.repairNumber || '',
            repairDate: res.data.repair.repairDate ? res.data.repair.repairDate.split('T')[0] : '',
            partReplace: res.data.repair.partReplace || '',
            repairCost: res.data.repair.repairCost || '',
            repairStatus: res.data.repair.repairStatus || '',
          });
        } else {
          console.error('API did not return expected data');
        }
      } catch (error) {
        console.error('Error fetching repair data', error);
      }
    };

    fetchRepairData();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Repair ID validation
    const repairIDRegex = /^R[A-Z0-9]{1,4}$/;
    if (!repairIDRegex.test(inputs.repairID)) {
      alert("Repair ID must start with 'R' and be exactly 5 characters long.");
      return;
    }

    // Repair Number validation
    const repairNumberRegex = /^(?:[A-Z0-9]-?){2,8}[A-Z0-9]$/; 
    if (!repairNumberRegex.test(inputs.repairNumber)) {
      alert("Repair number must be exactly 9 characters.");
      return;
    }

    // Part Replace validation
    const partReplaceRegex = /^[A-Za-z0-9]{1,25}$/;
    if (!partReplaceRegex.test(inputs.partReplace)) {
      alert("Part replaced must only contain letters or numbers and not exceed 25 characters.");
      return;
    }

    // Repair Cost validation
    const repairCostRegex = /^\d+(\.\d{1,2})?$/;
    if (!repairCostRegex.test(inputs.repairCost)) {
      alert("Repair cost must be a valid decimal number.");
      return;
    }

    updateRepairRequest().then(() => navigate('/Repair'));
  };

  const updateRepairRequest = async () => {
    await axios.put(`http://localhost:8080/api/repair/${id}`, {
      repairID: String(inputs.repairID),
      repairNumber: String(inputs.repairNumber),
      repairDate: new Date(inputs.repairDate).toISOString(),
      partReplace: String(inputs.partReplace),
      repairCost: Number(inputs.repairCost),
      repairStatus: String(inputs.repairStatus),
    }).then((res) => res.data);
  };

  return (
    <div>
      <SideBar />
      <div className="bg-gray-200 p-4 mt-12 rounded-lg shadow-lg ml-80">
        <h2 className="mt-2 ml-2 text-xl font-semibold">Update Repair Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Repair ID</label>
            <input
              type="text"
              name="repairID"
              onChange={handleChange}
              value={inputs.repairID}
              required
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block">Vehicle Number</label>
            <input
              type="text"
              name="repairNumber"
              onChange={handleChange}
              value={inputs.repairNumber}
              required
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block">Repair Date</label>
            <input
              type="date"
              name="repairDate"
              onChange={handleChange}
              value={inputs.repairDate}
              required
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block">Part Replaced</label>
            <input
              type="text"
              name="partReplace"
              onChange={handleChange}
              value={inputs.partReplace}
              required
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block">Repair Cost</label>
            <input
              type="number"
              name="repairCost"
              onChange={handleChange}
              value={inputs.repairCost}
              required
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block">Repair Status</label>
            <select
              className="mt-1 block w-full p-2 border rounded selectBar"
              name="repairStatus"
              onChange={handleChange}
              value={inputs.repairStatus}
              required
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>

          <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateRepairs;
