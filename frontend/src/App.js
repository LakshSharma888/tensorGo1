import React, { useState } from 'react';
import Login from './components/Login';
import RequestForm from './components/RequestForm';
import RequestsList from './components/RequestsList';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <div>
          <h1>Welcome, {user.displayName}</h1>
          <RequestForm user={user} />
          <RequestsList category="General Queries" />
          <RequestsList category="Product Features Queries" />
          <RequestsList category="Product Pricing Queries" />
          <RequestsList category="Product Feature Implementation Requests" />
        </div>
      )}
    </div>
  );
}

export default App;
