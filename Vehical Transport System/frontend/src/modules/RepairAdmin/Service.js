import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Service(props) {
  const {_id, serviceID, vehicleNumber, serviceDate, serviceType, serviceStatus } = props.maintenances;

  const history=useNavigate();

  const deleteHandler =async()=>{
    await axios.delete(`http://localhost:8080/api/maintain/${_id}`)
    .then(res=>res.data)
    .then(()=>history("/"))
    .then(()=>history("/Service"))
  }

  return (
    <tr>
   
      <td>{serviceID}</td>
      <td>{vehicleNumber}</td>
      <td>{new Date(serviceDate).toLocaleDateString()}</td>
      <td>{serviceType}</td>
      <td>{serviceStatus}</td>
      
      <td>
        <Link to={`/Service/${_id}`}>
          <button className="bg-blue-600 text-white rounded px-4 py-1 hover:bg-blue-500 transition duration-200 mr-2">Update</button>
        </Link>
        <button className="bg-red-600 text-white rounded px-4 py-1 hover:bg-red-500 transition duration-200" onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );
}

export default Service;
