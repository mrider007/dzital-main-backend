// src/components/LoginWithGoogle.js
import React from 'react';

const LoginWithGoogle = () => {
  const handleGoogleLogin = async () => {
    try {
      const response = await fetch(
        `https://accounts.google.com/o/oauth2/auth` +
          `?client_id=523033973847-620ptvsivp3cv8av8nggu0gvfpmtqef6.apps.googleusercontent.com` +
          `&redirect_uri=http://localhost:3001/auth/google/callback` +
          `&scope=https://www.googleapis.com/auth/plus.me` +
          `&response_type=token`
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Google Login Success', data);
        // Handle the successful login, e.g., update state or send data to server
      } else {
        console.error('Google Login Failed');
      }
    } catch (error) {
      console.error('Error during Google Login', error);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>Login with Google</button>
  );
};

export default LoginWithGoogle;
