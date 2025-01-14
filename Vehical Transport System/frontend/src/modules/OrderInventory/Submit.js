import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';

function Submit() {
  const location = useLocation();
  const orderDetails = location.state; // Access the passed order details

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Order Details", 20, 10);
    doc.text(`Driver ID: ${orderDetails.Driver_ID}`, 20, 30);
    doc.text(`Driver Name: ${orderDetails.Driver_Name}`, 20, 40);
    doc.text(`Vehicle No: ${orderDetails.Vehicle_NO}`, 20, 50);
    doc.text(`Item ID: ${orderDetails.Item_ID}`, 20, 60);
    doc.text(`Item Name: ${orderDetails.Item_Name}`, 20, 70);
    doc.text(`Size: ${orderDetails.Size}`, 20, 80);
    doc.text(`Type: ${orderDetails.Type}`, 20, 90);
    doc.save("order-details.pdf");
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 rounded-lg shadow-lg max-w-2xl mx-auto"> {/* Tailwind classes for container */}
      <h1 className="text-2xl mb-4 text-gray-800">Order Submitted Successfully!</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">Your order details are as follows:</p>
      <div className="w-full bg-white p-6 rounded-lg shadow-md mb-4"> {/* Tailwind classes for order details */}
        <p className="text-gray-800"><strong>Driver ID:</strong> {orderDetails.Driver_ID}</p>
        <p className="text-gray-800"><strong>Driver Name:</strong> {orderDetails.Driver_Name}</p>
        <p className="text-gray-800"><strong>Vehicle No:</strong> {orderDetails.Vehicle_NO}</p>
        <p className="text-gray-800"><strong>Item ID:</strong> {orderDetails.Item_ID}</p>
        <p className="text-gray-800"><strong>Item Name:</strong> {orderDetails.Item_Name}</p>
        <p className="text-gray-800"><strong>Size:</strong> {orderDetails.Size}</p>
        <p className="text-gray-800"><strong>Type:</strong> {orderDetails.Type}</p>
      </div>
      <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={generatePDF}>Download Report</button>
    </div>
  );
}

export default Submit;
