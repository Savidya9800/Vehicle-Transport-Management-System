import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Order() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [inputs, setInputs] = useState({
    Driver_ID: "",
    Driver_Name: "",
    Vehicle_NO: "",
    Item_ID: "",
    Item_Name: "",
    Size: "",
    Type: "",
  });

  // Handle changes in input fields
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => {
      // Navigate to Submit page and pass the form data
      navigate('/Submit', { state: inputs });
    });
  };

  // Send the form data to the backend
  const sendRequest = async () => {
    await axios.post("http://localhost:8080/api/orders", {
      Driver_ID: String(inputs.Driver_ID),
      Driver_Name: String(inputs.Driver_Name),
      Vehicle_NO: String(inputs.Vehicle_NO),
      Item_ID: String(inputs.Item_ID),
      Item_Name: String(inputs.Item_Name),
      Size: String(inputs.Size),
      Type: String(inputs.Type),
    }).then(res => res.data);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 rounded-lg shadow-lg max-w-2xl mx-auto"> {/* Tailwind classes for container */}
      <h1 className="text-2xl mb-6 text-gray-800 text-center">Add Orders</h1>
      <form onSubmit={handleSubmit} className="w-full">
        <label className="block mb-2 text-gray-700">Driver_ID:</label>
        <input type="text" name="Driver_ID" onChange={handleChange} value={inputs.Driver_ID} required className="w-full p-2 mb-4 border rounded" />
        
        <label className="block mb-2 text-gray-700">Driver_Name:</label>
        <input type="text" name="Driver_Name" onChange={handleChange} value={inputs.Driver_Name} required className="w-full p-2 mb-4 border rounded" />
        
        <label className="block mb-2 text-gray-700">Vehicle_NO:</label>
        <input type="text" name="Vehicle_NO" onChange={handleChange} value={inputs.Vehicle_NO} required className="w-full p-2 mb-4 border rounded" />
        
        <label className="block mb-2 text-gray-700">Item_ID:</label>
        <input type="text" name="Item_ID" onChange={handleChange} value={inputs.Item_ID} required className="w-full p-2 mb-4 border rounded" />
        
        <label className="block mb-2 text-gray-700">Item_Name:</label>
        <input type="text" name="Item_Name" onChange={handleChange} value={inputs.Item_Name} required className="w-full p-2 mb-4 border rounded" />
        
        <label className="block mb-2 text-gray-700">Size:</label>
        <input type="text" name="Size" onChange={handleChange} value={inputs.Size} required className="w-full p-2 mb-4 border rounded" />
        
        <label className="block mb-2 text-gray-700">Type:</label>
        <input type="text" name="Type" onChange={handleChange} value={inputs.Type} required className="w-full p-2 mb-4 border rounded" />
        
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
      </form>
    </div>
  );
}

export default Order;
