import React from 'react';
import { auth } from '../services/firebase'; 
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';  

const LoginPage = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider(); 
    signInWithPopup(auth, provider)  
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <button onClick={googleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default LoginPage;
