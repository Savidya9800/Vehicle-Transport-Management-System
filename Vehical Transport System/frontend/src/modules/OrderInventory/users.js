import React, { useEffect, useState, useRef } from 'react'; 
import axios from 'axios';
import Details from './user';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import NavBar from '../../common/Atoms/Navbar';
import Footer from '../../common/Atoms/Footer';
import Header from '../../common/Atoms/Header';

const URL = "http://localhost:8080/api/inventories";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Users() {
  const [inventories, setInventories] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    fetchHandler().then((data) => {
      console.log(data); // Log the response data
      setInventories(data.inventories || []); // Default to empty array if undefined
    });
  }, []);

  const componentsRef = useRef();

  const handleOrderClick = () => {
    navigate("/Order"); // Navigate to the Order page
  };

  return (
    <div>
      <Header />
      <NavBar />
    <div className="bg-cover bg-center min-h-screen p-8" style={{ backgroundImage: "url('/path/to/your/background/image.jpg')" }}> {/* Add background image */}
      <h1 className="text-center text-2xl font-semibold mb-6">Inventory Details</h1>
      <div ref={componentsRef}>
        {/* Render the table once */}
        {inventories.length > 0 && (
          <Details inventory={inventories} />
        )}
      </div>
      <div className="flex justify-center mt-6"> {/* Flexbox for centering the button */}
        <button 
          onClick={handleOrderClick} 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300" // Button styles
        >
          Order
        </button> {/* Link to Order.js */}
      </div>
    </div>

    <Footer />
    </div>
  );
}

export default Users;
