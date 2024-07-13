import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword,updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

//   const navi = useNavigate();

  const successNotification = () => {
    toast.success("Login Successfully..!!", {
      position: "top-center"
    });
  }

  const errorNotification = () => {
    toast.error("Please Check Email and Password", {
      position: "top-center"
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:');

      successNotification();
      setTimeout(() => {
        // navi('/login'); 
        navigate('/timer'); // Redirect to Timer component upon successful login
      }, 2000);
    } catch (err) {
      console.error('Error signing in:', err);
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
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="off"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-block">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="modal-buttons">
                <button className="input-button" type="submit">
                  Login
                </button>
              </div>
              {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
              <br />

              

              {/* <div className="modal-buttons"> */}
              <motion.div onClick={handleGoogleSignIn} className="google_container" whileTap={{ scale: 0.9 }}>
              <FcGoogle className="google_icon" />
              <p className="googleIcon_Txt">Sign in with Google</p>
            </motion.div>

              <p style={{ textAlign: 'center', fontWeight: '500' }}>
                Don't have an account? <Link to={'/'}>Sign Up</Link>
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

export default Login;
