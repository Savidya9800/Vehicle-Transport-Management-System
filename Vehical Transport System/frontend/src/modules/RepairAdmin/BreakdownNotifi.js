import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NotificationItem({ notification }) {
  const navigate = useNavigate();

  if (!notification) {
    return null;
  }

  const { _id, vehicleNumber, date, partReplace, repairCost } = notification;

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/notification/${_id}`);
      
      if (response.status === 200) {
        alert('Notification deleted successfully!');
        navigate("/BreakdownNotification");
      } else {
        console.error("Failed to delete the notification");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <tr className="border-b">
      <td className="table-data px-4 py-2 text-left">
        Part {partReplace} was replaced for Vehicle {vehicleNumber}. Total cost: {repairCost}. 
        Date of repair: {new Date(date).toLocaleDateString()}.
      </td>
      <td className="px-4 py-2">
        <button 
          className="bg-red-700 text-white py-1 px-3 rounded hover:opacity-80 transition-opacity"
          onClick={deleteHandler}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default NotificationItem;
