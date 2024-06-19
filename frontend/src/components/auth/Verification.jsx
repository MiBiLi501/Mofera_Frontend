import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../style/App.css';
import Card from './Card';
import '../../style/auth/Register.css';

import topFrame from '../../../src/assets/common/topframe.svg';
import mascot from '../../../src/assets/common/mascot.svg';
import backButton from '../../../src/assets/verification/backbutton.svg';
import bottomFrame from '../../../src/assets/verification/bottomframe.svg';


function Verification() {
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://mofera-backend-fork-ten.vercel.app/auth/forgot-password', {
        email
      });
      setMessage('Password reset email sent');
      // Optionally, navigate to a different page or show a success message
      // navigate('/some-path');
    } catch (error) {
      setMessage('Error sending password reset email');
    }
  };

  return (
    <div className='bg-quaternary h-screen'>
      {isMobile && (
        <>
          <div className='h-screen'>
            <img src={topFrame} className='w-screen absolute '/>

            <img src={mascot} className='absolute top-11 right-7 mascot'/>

            <img src={backButton} className="absolute mt-14 ml-8 btn"/>

            <p className='text-white text-4xl font-bold absolute text-left top-32 left-14 text'> Forgot <br></br> Password</p>

            <Card>
              <form onSubmit={handleSubmit} className='py-3 flex flex-col w-3/4 mx-auto mt-16 relative z-20'>
                <p className='text-primary font-bold text-4xl text-left mb-2 -mt-10'> Verify Your <br></br>Email Below:</p>

                <label htmlFor='email' className='text-primary text-left mt-8'> Email <br></br></label>
                <input
                  name='email'
                  id='email'
                  type='email'
                  className='border border-gray-300 rounded-md px-3 py-1.5 bg-quinary border-none mt-1'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <div className='mt-16 relative z-20'>
                  <button type='submit' className='rounded-full bg-secondary text-white font-bold px-4 py-2 w-36 btn-login'> Continue </button>
                </div>

                {message && <p>{message}</p>}

                <img src={bottomFrame} className='w-screen fixed bottom-0' />
              </form>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

export default Verification;
