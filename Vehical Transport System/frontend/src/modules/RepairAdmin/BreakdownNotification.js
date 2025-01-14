import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotificationItem from './BreakdownNotifi'; // Correct component name
import SideBar from './SideBar';

const URL = "http://localhost:8080/api/notification";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function BreakdownNotification() {
  const [notifications, setNotifications] = useState([]);
  const [originalNotifications, setOriginalNotifications] = useState([]);
  
  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.notifications) {
        setNotifications(data.notifications);
        setOriginalNotifications(data.notifications);
      } else {
        console.error('API did not return expected data');
      }
    });
  }, []);

  return (
    <div className="flex">
      <SideBar />
      <div className="table-container1 flex-grow p-4 mx-72 items-center mt-52">
        <h2 className="text-xl font-bold mb-4">Notification Details</h2>
        {notifications.length > 0 ? (
          <table className="table-conts w-full mt-3 shadow-lg rounded">
            <tbody>
              {notifications.map((notification, i) => (
                <NotificationItem key={i} notification={notification} />
              ))}
            </tbody>
          </table>
        ) : (
          <h3 className="text-lg text-gray-600">No notification data available</h3>
        )}
      </div>
    </div>
  );
}

export default BreakdownNotification;
