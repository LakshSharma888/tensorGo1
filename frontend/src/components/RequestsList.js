import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RequestsList = ({ category }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/requests/${category}`, { withCredentials: true });
        setRequests(res.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchRequests();
  }, [category]);

  return (
    <div>
      <h2>{category}</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            <p>{request.comments}</p>
            <p>Submitted by: {request.user.displayName} ({request.user.email})</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestsList;
