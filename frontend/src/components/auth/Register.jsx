import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../../style/App.css";
import { useNavigate } from "react-router-dom";
import { register } from "../../../api/authAPI";
import Card from "./Card";
import '../../style/auth/Register.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";

import topFrame from "../../../src/assets/common/topframe.svg";
import mascot from "../../../src/assets/common/mascot.svg";
import backButton from "../../../src/assets/verification/backbutton.svg";
import componentImg from "../../../src/assets/common/component.svg";
import bottomFrame from "../../../src/assets/register/bottomframe.svg";

function Register() {
  const [isMobile, setIsMobile] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [role, setRole] = useState(''); 
  const [centraUnit, setCentraUnit] = useState(''); 
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSignup = async (event) => {
    event.preventDefault();
    console.log("button clicked")
    if (password !== confirmPassword) {
      setRegistrationError("Please match the confirmation password");
      return;
    }

    try {
      const data = {
        username: username,
        email: email,
        password: password,
        role: role,
        centra_unit: centraUnit ? centraUnit : null,
      }

      const response = await register(data)
      console.log('Signup successful', response.data);
      navigate('/Login');
    } catch (error) {
      console.error('Signup failed', error.response.data);
      if (error.response.status === 400 && error.response.data.email) {
        setRegistrationError('A user with this email already exists.');
      } else {
        setRegistrationError('A user with this email already exists.');
      }
    }
  };

  const navigatetoLogin = () => {
    console.log('Navigating to login page...');
    navigate('/login');
  };

  return (
    <div className="bg-quaternary h-screen">
      {isMobile && (
        <div className="h-screen">
          <img src={topFrame} className='w-screen absolute' />
          <img src={mascot} className='absolute top-11 right-7 mascot' />
          <img src={backButton} className="absolute mt-14 ml-8 btn" onClick={() => { navigate("/login"); }} />
          <p className='text-white text-4xl font-bold absolute text-left top-32 left-14 text'> Create <br /> Account</p>

          <Card>
            <div className='text-left ml-16 mt-11 name'>
              <label htmlFor='fullname' className='text-primary'> Full Name <br /></label>
              <input
                className='border border-gray-300 rounded-md w-5/6 px-3 py-1.5 bg-quinary border-none mt-1'
                name='fullname'
                id='fullname'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className='text-left ml-16 mt-2'>
              <label htmlFor='email' className='text-primary'> Email <br /></label>
              <input
                className='border border-gray-300 rounded-md w-5/6 px-3 py-1.5 bg-quinary border-none mt-1'
                name='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='text-left ml-16 mt-2 relative z-20'>
              <label htmlFor='password' className='text-primary'> Password <br /></label>
              <div className="relative w-5/6">
                <input
                  type={isVisible ? "text" : "password"}
                  className='border border-gray-300 rounded-md w-full px-3 py-1.5 bg-quinary border-none mt-1'
                  name='password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FaEye className="text-2xl text-default-400 mt-1" />
                  ) : (
                    <FaEyeSlash className="text-2xl text-default-400 mt-1" />
                  )}
                </button>
              </div>
            </div>

            <div className='text-left ml-16 mt-2 relative z-20'>
              <label htmlFor='confirmpass' className='text-primary'> Confirm Password <br /></label>
              <div className="relative w-5/6">
                <input
                  type={isConfirmVisible ? "text" : "password"}
                  className='border border-gray-300 rounded-md w-full px-3 py-1.5 bg-quinary border-none mt-1'
                  name='confirmPassword'
                  id='confirmPassword'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                  onClick={toggleConfirmVisibility}
                >
                  {isConfirmVisible ? (
                    <FaEye className="text-2xl text-default-400 mt-1" />
                  ) : (
                    <FaEyeSlash className="text-2xl text-default-400 mt-1" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-left ml-16 mt-2 relative z-20">
              <label htmlFor="role" className="text-primary"> Role <br /></label>
              <select
                className="border border-gray-300 rounded-md w-5/6 px-3 py-1.5 bg-quinary border-none mt-1"
                name="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="" disabled>Select a role</option>
                <option value="centra">centra</option>
                <option value="GuardHarbor">GuardHarbor</option>
                <option value="xyz">xyz</option>
              </select>
            </div>

            {role === 'centra' && (
              <div className="text-left ml-16 mt-3 relative z-20">
                <label htmlFor="centraUnit" className="text-primary"> Centra Unit <br /></label>
                <select
                  className="border border-gray-300 rounded-md w-5/6 px-3 py-1.5 bg-quinary border-none mt-1"
                  name="centraUnit"
                  id="centraUnit"
                  value={centraUnit}
                  onChange={(e) => setCentraUnit(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a unit</option>
                  {Array.from({ length: 32 }, (_, i) => i + 1).map((number) => (
                    <option key={number} value={number}>{number}</option>
                  ))}
                </select>
              </div>
            )}

            {registrationError && <p className="text-red-500 mt-1 ml-16">{registrationError}</p>}

            <div className="relative z-20">
              <div className='mt-8'>
                <button className='rounded-full bg-secondary text-white font-bold px-4 py-2 w-36 btn-login' onClick={handleSignup}>
                  Sign Up
                </button>
              </div>
              <div className='flex justify-center items-center mt-7'>
                <img src={componentImg} className='w-3/4'></img>
              </div>
              <div className="text-xs flex items-center justify-center gap-1 mt-5">
                <p> Already have an account? </p>
                <p className="text-primary font-bold underline" onClick={navigatetoLogin}>
                  Login here
                </p>
              </div>
            </div>

            <img src={bottomFrame} className='relative -mt-24' />
          </Card>

          
        </div>
      )}
    </div>
  );
}

export default Register;
