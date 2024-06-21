const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const passport = require('../config/passport-setup');
const Intercom = require('intercom-client');
const axios = require('axios');

console.log(process.env.INTERCOM_ACCESS_TOKEN)
const client = new Intercom.Client({ tokenAuth: { token: process.env.INTERCOM_ACCESS_TOKEN } } );


const accessToken = process.env.INTERCOM_ACCESS_TOKEN;
const url = 'https://api.intercom.io/users';
 
const fetchUsers = async () => {
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
 
fetchUsers();


// Middleware to check authentication
const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    next();
  }
};

// POST /requests - Submit a customer service request
router.post('/', authCheck, async (req, res) => {
  try {
    const newRequest = new Request({
      user: req.user._id,
      category: req.body.category,
      comments: req.body.comments,
    });

    await newRequest.save();

    // Send request data to Intercom
    await client.messages.create({
      message_type: 'inapp',
      body: req.body.comments,
      from: { type: 'user', user_id: req.user._id.toString() },
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Error submitting request:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /requests/:category - Get customer service requests by category
router.get('/:category', authCheck, async (req, res) => {
  try {
    const requests = await Request.find({ category: req.params.category }).populate('user');
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
