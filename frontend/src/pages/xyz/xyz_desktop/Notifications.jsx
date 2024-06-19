import { useState } from 'react'
import SearchForm from "./Search";
import { IoNotifications } from "react-icons/io5";
import { motion } from "framer-motion";

import Sidebar from '../../../components/xyz/Sidebar';
import NotificationsTable from '../../../components/xyz/NotificationsTable';
import profilepic from "../../../assets/desktop/profilepicdesktop.svg";
import EditProfileDesktop from './EditProfileDesktop';

const Notifications = ({ children }) => {

    const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarMinimized(!isSidebarMinimized);
    }; 

    return (
        <div className='bg-primary w-screen h-screen overflow-hidden flex'>
            <Sidebar isMinimized={isSidebarMinimized} toggleSidebar={toggleSidebar} />
            <div className='flex-1 bg-white rounded-3xl mt-3 mr-3 mb-3 p-4 overflow-y-auto relative'>
                <div className="flex justify-between items-center">
                    <h1 className='text-4xl font-semibold text-left ml-6 mt-3'>Shipment Notifications</h1>

                    <div className="flex items-center justify-center mt-3 rounded dark:bg-gray-800">
                        <div className="p-2 bg-quinary rounded-full absolute right-0 top-0 mr-28 mt-12">
                            <a href="/notifications"><IoNotifications className="text-2xl" /></a>
                        </div>
                        <div>
                            <span className="flex items-center mr-6 mt-6">
                            {/* <img src={profilepic} alt='profile picture' className='flex align-right mb-6 absolute right-0 top-0 mr-12 mt-12' /> */}
                            <EditProfileDesktop />
                            </span>
                        </div>
                    </div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex-1 overflow-y-auto">

                <h2 className='text-left font-medium text-sm ml-6 mb-5'> Get notified when your packages have been shipped. </h2>
          
                <NotificationsTable/>
        
                </motion.div>
            </div>
        </div>
    );
}

export default Notifications;
