import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DriverSideBar from "./DriverSideBar";
import "./UpdateServices.scoped.css";

function UpdateServicesD() {
  const [inputs, setInputs] = useState({
    serviceID: "",
    vehicleNumber: "",
    serviceDate: "",
    serviceType: "",
    serviceStatus: "",
  });

  const { id } = useParams(); // Get the ID from route params
  const navigate = useNavigate(); // Use for redirection after successful update

  // Fetch service data when the component mounts
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/maintenance/${id}`
        );
        if (res.data && res.data.maintenances) {
          setInputs({
            serviceID: res.data.maintenances.serviceID || "",
            vehicleNumber: res.data.maintenances.vehicleNumber || "",
            serviceDate: res.data.maintenances.serviceDate
              ? res.data.maintenances.serviceDate.split("T")[0]
              : "",
            serviceType: res.data.maintenances.serviceType || "",
            serviceStatus: res.data.maintenances.serviceStatus || "",
          });
          console.log("Fetched data:", res.data.maintenances);
        }
      } catch (err) {
        console.error("Error fetching service data:", err);
      }
    };

    fetchServiceData();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Send PUT request to update service
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    console.log("Submitting form with inputs:", inputs); // Log inputs before submission

    try {
      const response = await axios.put(
        `http://localhost:8080/maintenance/${id}`,
        {
          serviceID: inputs.serviceID,
          vehicleNumber: inputs.vehicleNumber,
          serviceDate: new Date(inputs.serviceDate).toISOString(), // Properly format the date
          serviceType: inputs.serviceType,
          serviceStatus: inputs.serviceStatus,
        }
      );

      console.log("Response from server:", response); // Log the response from the server

      // Check if the request was successful
      if (response.status === 200 || response.status === 202) {
        console.log("Update successful, navigating to /Service");
        navigate("/ServiceDr"); // Redirect to Service list page after successful update
      } else {
        console.error("Failed to update service");
        alert("Error: Failed to update service. Please try again."); // Show error message to the user
      }
    } catch (err) {
      console.error("Error updating service:", err);
      alert("Error: Unable to update service. Check console for details."); // Alert user of error
    }
  };

  return (
    <div>
      <DriverSideBar />
      <div className="bg-gray-200 p-4 mt-12 rounded-lg shadow-md ml-[17.5pc] h-[2.8pc]">
        <h2 className="text-xl mb-4">Update Services</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block mb-1">Service Status</label>
          <select
            name="serviceStatus"
            onChange={handleChange}
            value={inputs.serviceStatus}
            required
            className="block w-40 p-2 border rounded"
          >
            <option value="">Select Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="In Process">In Process</option>
          </select>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateServicesD;
