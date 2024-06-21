import React, { useState } from 'react';
import axios from 'axios';

const RequestForm = ({ user }) => {
  const [category, setCategory] = useState('General Queries');
  const [comments, setComments] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/requests', {
        category,
        comments
      }, {
        withCredentials: true
      });
      alert('Request submitted successfully');
      setCategory('General Queries');
      setComments('');
    } catch (error) {
      console.error('There was an error submitting the request!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit a Customer Service Request</h2>
      <label>
        Category:
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="General Queries">General Queries</option>
          <option value="Product Features Queries">Product Features Queries</option>
          <option value="Product Pricing Queries">Product Pricing Queries</option>
          <option value="Product Feature Implementation Requests">Product Feature Implementation Requests</option>
        </select>
      </label>
      <label>
        Comments:
        <textarea value={comments} onChange={e => setComments(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RequestForm;
