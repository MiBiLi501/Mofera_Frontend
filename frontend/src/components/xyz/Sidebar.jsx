import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import desktoplogo from '../../assets/desktop/mofera-logo.svg';
import hamburger from '../../assets/desktop/menu-bar.svg';
import exit from '../../assets/desktop/exit.svg';

import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiPackageFill } from "react-icons/pi";
import { IoNotifications } from "react-icons/io5";
import { MdOutlineMonitor } from "react-icons/md";
import axios from 'axios';

function Sidebar() {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMenu = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleDropdown = () => {
    setDashboardOpen(!dashboardOpen);
  };

  const handleResize = () => {
    if (window.innerWidth <= 1274) {
      setIsMinimized(true);
    } else {
      setIsMinimized(false);
    }
  };

  const handleLogout = async () => {
    try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
        const response = await axios.post('https://mofera-backend-fork-ten.vercel.app/auth/logout')

        localStorage.removeItem('token');


        if (response.status === 200) {
            window.location.href = '/logindesktop';
        } else {
            console.error("Logout failed");
        }
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={`bg-primary h-screen flex flex-col justify-between items-center transition-all duration-300 ${
        isMinimized ? 'w-20 pl-2 pt-5' : 'w-3/20'
      }`}
    >
      <div className="bg-primary flex flex-col justify-center items-center gap-8">
        <div className="bg-primary flex items-center w-full p-5">
          <button onClick={toggleMenu}>
            <img height="24" width="24" className="bg-primary mr-4" src={hamburger} />
          </button>
          {!isMinimized && (
            <span className="bg-primary ml-4">
              <img className="bg-primary h-auto w-auto" src={desktoplogo} />
            </span>
          )}
        </div>

        {!isMinimized && (
          <nav className="w-full">
            <ul className='flex flex-col h-full'>
              <li
                onClick={toggleDropdown}
                className="bg-primary py-4 px-8 flex justify-start items-center w-full hover:bg-white hover:text-green-800 rounded hover:rounded-full hover:rounded-r-none font-medium cursor-pointer text-white"
              > 
                <MdOutlineDashboardCustomize className='h-8 w-8 mr-5'></MdOutlineDashboardCustomize>
                  Dashboard
              </li>
              {dashboardOpen && (
                <>
                  <li 
                    className="mb-1 text-left bg-primary py-2 pl-20 text-white hover:bg-white hover:text-green-800 rounded hover:rounded-full hover:rounded-r-none cursor-pointer w-full"
                  >
                    <Link to="/dashboard-wet">Wet Leaves</Link>
                  </li>
                  <li 
                    className="mb-1 text-left bg-primary py-2 pl-20 text-white hover:bg-white hover:text-green-800 rounded hover:rounded-full hover:rounded-r-none cursor-pointer w-full"
                    >
                    <Link to="/dashboard-dry">Dry Leaves</Link>
                  </li>
                  <li 
                    className="mb-1 text-left bg-primary py-2 pl-20 text-white hover:bg-white hover:text-green-800 rounded hover:rounded-full hover:rounded-r-none cursor-pointer w-full"
                    >
                    <Link to="/dashboard-powder">Powder</Link>
                  </li>
                </>
              )}
              <li 
                className="bg-primary py-4 pl-8 flex justify-start items-center w-full hover:bg-white hover:text-green-800 rounded hover:rounded-full hover:rounded-r-none font-medium cursor-pointer text-white"
                >
                <FaShippingFast className='h-8 w-8 mr-5' />
                <Link to="/shipmenttracker" className='text-left'>Shipment Tracker</Link>
              </li>
              <li 
                className="bg-primary py-4 px-8 flex justify-start items-center w-full hover:bg-white hover:text-green-800 rounded hover:rounded-full hover:rounded-r-none font-medium cursor-pointer text-white"
                >
                <FaLocationDot className='h-7 w-7 mr-6' />
                <Link to="/checkpoint" className='text-left'>Checkpoint</Link>
              </li>
              <li 
                className="bg-primary py-4 pl-8 flex justify-start items-center w-full hover:bg-white hover:text-green-800 rounded hover:rounded-full hover:rounded-r-none font-medium cursor-pointer text-white"
                >
                <PiPackageFill className='h-8 w-8 mr-5' />
                <Link to="/packages" className='text-left'>Packages</Link>
              </li>
              <li 
                className="bg-primary py-4 px-8 flex justify-start items-center w-full hover:bg-white hover:text-green-800 rounded hover:rounded-full hover:rounded-r-none font-medium cursor-pointer text-white"
                >
              <IoNotifications className='h-7 w-7 mr-6' />
                <Link to="/notifications" className='text-left'>Notifications</Link>
              </li>
              <li 
                className="bg-primary py-4 pl-8 flex justify-start items-center w-full hover:bg-white hover:text-green-800 rounded hover:rounded-full hover:rounded-r-none font-medium cursor-pointer text-white"
                >
                <MdOutlineMonitor className='h-7 w-7 mr-6' />
                <Link to="/centraactivitymonitor" className='text-left'>Centra Activity Monitor</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <div className="flex-grow"></div>

      <div className="bg-primary w-full col-span-10 flex flex-col justify-between">
        <button onClick={handleLogout} className="bg-primary mb-4 bottom-1">
          {!isMinimized && (
            <img src={exit} className="bg-primary w-10 ml-6 mt-20" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
