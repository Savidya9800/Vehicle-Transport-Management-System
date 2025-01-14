import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SubInventory() {
  const [orders, setOrders] = useState([]); // State to store the list of orders

  // Fetch all orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/orders'); // Adjust URL based on your backend setup
      setOrders(response.data.orders); // Assumes response contains orders array
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  // Function to handle deleting an order
  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/${id}`); // DELETE request to backend
      setOrders(orders.filter(order => order._id !== id)); // Update state after deletion
    } catch (err) {
      console.error("Error deleting order", err);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 rounded-lg shadow-md max-w-2xl mx-auto my-10 font-sans">
      <h1 className="text-2xl mb-4 text-gray-800">Submitted Orders</h1>
      {orders.length > 0 ? (
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Driver ID</th>
              <th className="px-4 py-2">Driver Name</th>
              <th className="px-4 py-2">Vehicle No</th>
              <th className="px-4 py-2">Item ID</th>
              <th className="px-4 py-2">Item Name</th>
              <th className="px-4 py-2">Size</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b">
                <td className="px-4 py-2">{order.Driver_ID}</td>
                <td className="px-4 py-2">{order.Driver_Name}</td>
                <td className="px-4 py-2">{order.Vehicle_NO}</td>
                <td className="px-4 py-2">{order.Item_ID}</td>
                <td className="px-4 py-2">{order.Item_Name}</td>
                <td className="px-4 py-2">{order.Size}</td>
                <td className="px-4 py-2">{order.Type}</td>
                <td className="px-4 py-2">
                  <button 
                    onClick={() => deleteOrder(order._id)} 
                    className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-lg text-gray-600">No orders found.</p>
      )}
    </div>
  );
}

export default SubInventory;
