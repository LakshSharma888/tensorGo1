import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const Login = ({ setUser }) => {
  const responseGoogle = async (response) => {
    console.log(response.tokenId);
    try {
      const res = await axios.get('http://localhost:5000/auth/google/callback', {},{
        headers: {
          Authorization: `Bearer ${response.tokenId}`,
        },
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const responseGoogleFailure = (response) => {
    console.error('Google login failed:', response);
  };
  
  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default Login;
