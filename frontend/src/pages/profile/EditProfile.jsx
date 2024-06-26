import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { getCurrentUser } from '../../../api/profileAPI';

import bgupper from '../../assets/profile/element1.svg';
import bglower from '../../assets/profile/element2.svg';
import back from "../../assets/shipping/back.svg";
import mascotAdd from "../../assets/AddPage/mascotAddSide.svg"
import NavigationBar from "../../components/centra/CentraNavbar.jsx";
import EditProfileContent from '../../components/profile/EditProfileContent';
import NavbarGH from '../../components/guard_harbour/NavbarGH';

function EditProfile() {
    const [isMobile, setIsMobile] = useState(false);
    const [user, setUser] = useState({
        role: "",
        username: "",
        email: "",
        centra_unit: ""
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      function handleResize() {
          setIsMobile(window.innerWidth < 600);
      }

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const user = await getCurrentUser();
              console.log(user);
              
              setUser(user);
          } catch (err) {
              console.error("Error: ", err);
          }
      };

      fetchData();
  }, []);

    function handleFormSubmission(updatedUser) {
        setUser(updatedUser);
        setFormSubmitted(true);
    }

    return (
        <div className='bg-white w-screen h-screen overflow-auto'>
            {isMobile && (
                <>
                    <div className='relative'>
                        <button 
                          onClick={() => navigate('/profile')} 
                          className='absolute left-10 text-gray-600 text-sm font-semibold mt-8 md-flex -top-5 z-50'>
                          <img src={back} alt="back" class="mt-8"></img>
                        </button>
                        <img src={bgupper} className="absolute -top-10" />
                    </div>

                    <motion.div
                        key="editprofile"
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className='relative'>
                            <img src={mascotAdd} className="absolute right-0 bottom-10 z-50"></img>
                            <EditProfileContent
                                role={user.role}
                                name={user.username}
                                email={user.email}
                                centraUnit={user.centra_unit}
                                handleFormSubmission={handleFormSubmission}
                                formSubmitted={formSubmitted}
                            />
                            <img src={bglower} className="bottom-0" />
                        </div>
                    </motion.div>

                    {user.role === "centra" && (
                        <NavigationBar />
                    )}
                    {user.role === "GuardHarbor" && (
                        <NavbarGH />
                    )}
                </>
            )}
        </div>
    );
}

export default EditProfile;
