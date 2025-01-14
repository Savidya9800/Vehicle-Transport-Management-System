import React, { useState } from 'react';

function User(props) {
  const { inventory } = props;

  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search input

  // Filter inventory based on the search term
  const filteredInventory = inventory.filter(item => 
    item.Item_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 rounded-lg shadow-lg max-w-2xl mx-auto"> {/* Container styles */}
      
      {/* Search bar to filter the items */}
      <div className="w-full mb-4">
        <div className="relative">
          <input 
            type="text" 
            className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by Item Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <span className="absolute left-3 top-2 text-gray-500">&#128269;</span> {/* Search Icon */}
        </div>
      </div>

      <table className="min-w-full bg-white rounded-lg shadow-md"> {/* Table styles */}
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left text-gray-600">Item_ID</th>
            <th className="p-3 text-left text-gray-600">Item_Name</th>
            <th className="p-3 text-left text-gray-600">Size</th>
            <th className="p-3 text-left text-gray-600">Type</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through the filtered inventory array and create table rows for each entry */}
          {filteredInventory.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-3 border-b">{item.Item_ID}</td>
              <td className="p-3 border-b">{item.Item_Name}</td>
              <td className="p-3 border-b">{item.Size || 'N/A'}</td> {/* Default to 'N/A' if size is missing */}
              <td className="p-3 border-b">{item.Type || 'N/A'}</td> {/* Default to 'N/A' if type is missing */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default User;
