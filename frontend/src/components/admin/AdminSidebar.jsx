import { useState, useEffect } from 'react';
import desktoplogo from '../../assets/desktop/mofera-logo.svg';
import hamburger from '../../assets/desktop/menu-bar.svg';
import exit from '../../assets/desktop/exit.svg';
import "../../style/AdminDesktop.css";

import { columns, columnsCentra, columnsCheckpoint, columnsDry, columnsFlour, columnsPackage, columnsShipping, columnsWet } from './UserDataSample';
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { BsDatabaseFillGear } from "react-icons/bs";

import {
  getUsers,
  getCentra,
  getCheckpoints,
  getDryLeaves,
  getFlour,
  getPackages,
  getShippingInfo,
  getWetLeaves,
} from "../../../api/adminAPI";
import axios from 'axios';
import MasterDataFolder from './MasterDataFolder';

function AdminSidebar({ isMinimized, toggleMenu, onPageDataChange }) {
  const [dataManagementOpen, setDataManagementOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null); 
  const [centraRows, setCentraRows] = useState([]);
  const [checkpointRows, setCheckpointRows] = useState([]);
  const [dryRows, setDryRows] = useState([]);
  const [flourRows, setFlourRows] = useState([]);
  const [packageRows, setPackageRows] = useState([]);
  const [shippingRows, setShippingRows] = useState([]);
  const [wetRows, setWetRows] = useState([]);
  const [userRows, setUserRows] = useState([]);

  const toggleDropdown = () => {
    setDataManagementOpen(!dataManagementOpen);
  };

  function getStatusDescription(status) {
    switch (status) {
      case 0:
        return "Ready to Ship";
      case 1:
        return "Shipping";
      case 2:
        return "Confirmed Arrival";
      case 3:
        return "Collected";
      case 4:
        return "Expired";
      default:
        return "Unknown Status";
    }
  }

  function formatDate(dateString) {
    if (!dateString) return "N/A";
    return dateString.replace('T', ' ');
  }

  function formatWeight(weight) {
    return `${weight} KG`;
  }

  async function fetchUserData() {
    try {
      const userData = await getUsers();
      console.log("User data fetched:", userData);
      if (userData && userData.data) {
        setUserRows(userData.data);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async function fetchCentraData() {
    try {
      const centraData = await getCentra();
      console.log("Centra data fetched:", centraData);
      if (centraData && centraData.data) {
        setCentraRows(centraData.data);
      } else {
        console.error('Failed to fetch Centra data');
      }
    } catch (error) {
      console.error('Error fetching Centra data:', error);
    }
  }

  async function fetchCheckpointData() {
    try {
      const checkpointData = await getCheckpoints();
      console.log("Checkpoint data fetched:", checkpointData);
      if (checkpointData && checkpointData.data) {
        const formattedData = checkpointData.data.map(pkg => {
          console.log("Processing checkpoint:", pkg);
  
          const formattedArrivalDate = formatDate(pkg.arrival_datetime);
  
          console.log("Formatted checkpoint data:", {
            ...pkg,
            arrival_datetime: formattedArrivalDate,
          });
  
          return {
            ...pkg,
            arrival_datetime: formattedArrivalDate,
          };
        });
  
        setCheckpointRows(formattedData);
        console.log("Formatted checkpoint data set:", formattedData);
      } else {
        console.error('Failed to fetch Checkpoint data');
      }
    } catch (error) {
      console.error('Error fetching Checkpoint data:', error);
    }
  }
  
  async function fetchDryLeavesData() {
    try {
      const dryLeavesData = await getDryLeaves();
      console.log("Dry Leaves data fetched:", dryLeavesData);
      if (dryLeavesData && dryLeavesData.data) {
        const formattedData = dryLeavesData.data.map(pkg => {
          console.log("Processing dry leaves:", pkg);

          const formattedWeight = formatWeight(pkg.weight);
          const formattedFlouredDate = formatDate(pkg.floured_datetime);
  
          return {
            ...pkg,
            weight: formattedWeight,
            floured_datetime: formattedFlouredDate,
          };
        });
  
        setDryRows(formattedData);
        console.log("Formatted dry leaves data set:", formattedData);
      } else {
        console.error('Failed to fetch Dry Leaves data');
      }
    } catch (error) {
      console.error('Error fetching Dry Leaves data:', error);
    }
  }

  async function fetchFlourData() {
    try {
      const flourData = await getFlour();
      console.log("Flour data fetched:", flourData);
      if (flourData && flourData.data) {
        const formattedData = flourData.data.map(pkg => {
          console.log("Processing flour:", pkg);
  
          const formattedWeight = formatWeight(pkg.weight);
  
          return {
            ...pkg,
            weight: formattedWeight,
          };
        });
  
        setFlourRows(formattedData);
        console.log("Formatted flour data set:", formattedData);
      } else {
        console.error('Failed to fetch Flour data');
      }
    } catch (error) {
      console.error('Error fetching Flour data:', error);
    }
  }

  async function fetchPackageData() {
    try {
      const packageData = await getPackages();
      console.log("Package data fetched:", packageData);
  
      if (packageData && packageData.data) {
        const formattedData = packageData.data.map(pkg => {
          console.log("Processing package:", pkg);
  
          const statusDescription = getStatusDescription(pkg.status);
          const formattedWeight = formatWeight(pkg.weight);
          const formattedCreatedDate = formatDate(pkg.created_datetime);
          const formattedReceivedDate = formatDate(pkg.received_datetime);
  
          return {
            ...pkg,
            status: statusDescription,
            weight: formattedWeight,
            created_datetime: formattedCreatedDate,
            received_datetime: formattedReceivedDate
          };
        });
  
        setPackageRows(formattedData);
        console.log("Formatted package data set:", formattedData);
      } else {
        console.error('Failed to fetch Package data');
      }
    } catch (error) {
      console.error('Error fetching Package data:', error);
    }
  }
  
  async function fetchShippingData() {
    try {
      const shippingData = await getShippingInfo();
      console.log("Shipping data fetched:", shippingData);
      if (shippingData && shippingData.data) {
        const formattedData = shippingData.data.map(pkg => {
          console.log("Processing shipping:", pkg);
  
          const weightData = formatWeight(pkg.total_weight);
          const departureData = formatDate(pkg.departure_datetime);
          const etaData = formatDate(pkg.eta_datetime);
  
          console.log("Formatted shipping data:", {
            ...pkg,
            total_weight: weightData,
            departure_datetime: departureData,
            eta_datetime: etaData,
          });
  
          return {
            ...pkg,
            total_weight: weightData,
            departure_datetime: departureData,
            eta_datetime: etaData,
          };
        });
  
        setShippingRows(formattedData);
        console.log("Formatted shipping data set:", formattedData);
      } else {
        console.error('Failed to fetch Shipping data');
      }
    } catch (error) {
      console.error('Error fetching Shipping data:', error);
    }
  }

  async function fetchWetData() {
    try {
      const wetData = await getWetLeaves();
      console.log("Wet data fetched:", wetData);
      if (wetData && wetData.data) {
        const formattedData = wetData.data.map(pkg => {
          console.log("Processing wet leaves:", pkg);
  
          const formattedWashedDate = formatDate(pkg.washed_datetime);
          const formattedDriedDate = formatDate(pkg.dried_datetime);
          const weight = formatWeight(pkg.weight);
  
          return {
            ...pkg,
            washed_datetime: formattedWashedDate,
            dried_datetime: formattedDriedDate,
            weight: weight,
          };
        });
  
        setWetRows(formattedData);
        console.log("Formatted wet leaves data set:", formattedData);
      } else {
        console.error('Failed to fetch Wet data');
      }
    } catch (error) {
      console.error('Error fetching Wet data:', error);
    }
  }

  useEffect(() => {
    fetchUserData();
    fetchCentraData();
    fetchCheckpointData();
    fetchDryLeavesData();
    fetchFlourData();
    fetchWetData();
    fetchPackageData();
    fetchShippingData();
  }, []);

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

  const handleSelectDataCategory = (label) => {
    switch (label) {
      case "Centra":
        onPageDataChange('Centra Data', 'Search and added data for Centra', "CentraData", centraRows, columnsCentra);
        break;
      case "Wet Leaves":
        onPageDataChange('Wet Leaves Data', 'Search and added data for Wet Leaves', 'WetLeavesData', wetRows, columnsWet);
        break;
      case "Dry Leaves":
        onPageDataChange('Dry Leaves Data', 'Search and added data for Dry Leaves', 'DryLeavesData', dryRows, columnsDry);
        break;
      case "Flour":
        onPageDataChange('Flour Data', 'Search and added data for Flour', 'FlourData', flourRows, columnsFlour);
        break;
      case "Shipping Info":
        onPageDataChange('Shipping Info Data', 'List of Shipping Arrival and Departure Data', 'ShippingInfoData', shippingRows, columnsShipping);
        break;
      case "Checkpoint Data":
        onPageDataChange('Checkpoint Data', 'List of Checkpoint Data and Total Package Arrival notice', 'CheckpointData', checkpointRows, columnsCheckpoint);
        break;
      case "Package":
        onPageDataChange('Package Data', 'Package details including tracking and delivery statuses', "PackageData", packageRows, columnsPackage);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`bg-primary h-screen flex flex-col justify-between items-center transition-all duration-550 h-screen ${
        isMinimized ? 'w-20 pl-2 pt-5' : 'w-3/20' 
      } `}
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
          <nav className="w-full h-full overflow-y-auto hide-scrollbar">
            <ul className="flex flex-col h-full">
              <li
                className="bg-primary py-4 px-8 flex justify-start items-center w-full hover:bg-white hover:text-green-800 rounded hover:rounded-full hover:rounded-r-none font-medium cursor-pointer text-white"
                onMouseEnter={() => setHoveredItem('user')}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => onPageDataChange('Manage Users', 'Arrange Username and Data Collections of ID', 'AdminTable', userRows, columns)}
              >
                <FaUser className='text-2xl mr-3 '></FaUser>
                <div className='flex flex-col text-start ml-3'>
                  <p>User</p>
                  <p onClick={() => onPageDataChange('Manage Users', 'Arrange Username and Data Collections of ID')}>Management</p>
                </div>
              </li>

              <li
                className="bg-primary py-4 px-8 flex justify-start items-center w-full hover:bg-white hover:text-green-800 rounded hover:rounded-full hover:rounded-r-none font-medium cursor-pointer text-white"
                onClick={toggleDropdown}
                onMouseEnter={() => setHoveredItem('database')}
                onMouseLeave={() => setHoveredItem(null)}                
              >
                <BsDatabaseFillGear className='text-3xl mr-4'></BsDatabaseFillGear>
                <div className='flex flex-col text-start'>
                  <p onClick={() => handleSelectDataCategory('Centra')}>Data</p>
                  <p>Management</p>
                </div>
              </li>

              {dataManagementOpen && (
                <div className="overflow-y-auto hide-scrollbar">
                  <li className="bg-primary py-4 px-5 text-left indent-6 text-white hover:bg-white rounded-xl hover:text-primary font-medium cursor-pointer w-full">
                    <p onClick={() => handleSelectDataCategory('Centra')}>Centra Data</p>
                  </li>
                  <li className="bg-primary py-4 px-5 text-left indent-6 text-white hover:bg-white rounded-xl hover:text-primary font-medium cursor-pointer w-full">
                    <p onClick={() => handleSelectDataCategory('Wet Leaves')}>Wet Leaves Data</p>
                  </li>
                  <li className="bg-primary py-4 px-5 text-left indent-6 text-white hover:bg-white rounded-xl hover:text-primary font-medium cursor-pointer w-full">
                    <p onClick={() => handleSelectDataCategory('Dry Leaves')}>Dry Leaves Data</p>
                  </li>
                  <li className="bg-primary py-4 px-5 text-left indent-6 text-white hover:bg-white rounded-xl hover:text-primary font-medium cursor-pointer w-full">
                    <p onClick={() => handleSelectDataCategory('Flour')}>Flour Data</p>
                  </li>
                  <li className="bg-primary py-4 px-5 text-left indent-6 text-white hover:bg-white rounded-xl hover:text-primary font-medium cursor-pointer w-full">
                    <p onClick={() => handleSelectDataCategory('Shipping Info')}>Shipping Info Data</p>
                  </li>
                  <li className="bg-primary py-4 px-5 text-left indent-6 text-white hover:bg-white rounded-xl hover:text-primary font-medium cursor-pointer w-full">
                    <p onClick={() => handleSelectDataCategory('Checkpoint Data')}>Checkpoint Data</p>
                  </li>
                  <li className="bg-primary py-4 px-5 text-left indent-6 text-white hover:bg-white rounded-xl hover:text-primary font-medium cursor-pointer w-full">
                    <p onClick={() => handleSelectDataCategory('Package')}>Package Data</p>
                  </li>
                </div>
              )}
            </ul>
          </nav>
        )}
      </div>

      <div className="bg-primary w-full col-span-10 flex flex-col justify-between">
        <button
          className="bg-primary mb-4 fixed bottom-1"
          onClick={handleLogout}
          onMouseEnter={() => setHoveredItem('exit')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {!isMinimized && (
            <img
              src={exit}
              className="w-10 bg-primary ml-6"
            />
          )}
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
