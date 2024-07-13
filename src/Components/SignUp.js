import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const successNotification = () => {
    toast.success("Success Notification !", {
      position: "top-center"
    });
  };

  const errorNotification = () => {
    toast.error("Something went wrong, Please Check", {
      position: "top-center"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      successNotification();
      setTimeout(() => {
        navigate('/login'); 
      }, 2000);
      
    } catch (err) {
      console.error('Error creating user:', err);
      setError(err.message);
      errorNotification();
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in with Google:', result.user);
      navigate('/timer'); // Redirect to Timer component upon successful login
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError(error.message);
      errorNotification();
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="modal">
        <div className="modal-container">
          <div className="modal-left">
            <h1 className="modal-title">Welcome!</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-block">
                <label htmlFor="name" className="input-label">
                  Name
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="off"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="modal-buttons">
                <button className="input-button" type="submit">
                  Sign Up
                </button>
              </div> <br />

              

              {/* <div className="modal-buttons"> */}
              <motion.div onClick={handleGoogleSignIn} className="google_container" whileTap={{ scale: 0.9 }}>
              <FcGoogle className="google_icon" />
              <p className="googleIcon_Txt">Sign in with Google</p>
            </motion.div>

              {/* </div> */}
              {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
              <p style={{ textAlign: 'center', fontWeight: '500' }}>
                Already Registered? <Link to={'/login'}>Login</Link>
              </p>
            </form>
          </div>
          <div className="modal-right">
            <img
              src="https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
