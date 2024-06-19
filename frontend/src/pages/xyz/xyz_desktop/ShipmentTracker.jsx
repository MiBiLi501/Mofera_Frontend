import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IoNotifications } from "react-icons/io5";
import { motion } from "framer-motion";

import Sidebar from '../../../components/xyz/Sidebar';
import bell from '../../../assets/xyz/bell.svg';
import profilepic from "../../../assets/desktop/profilepicdesktop.svg";
import ShipmentTrackerMap from '../../../components/xyz/ShipmentTrackerMap';
import SearchForm from "../../../components/xyz/ShipmentTrackerSearch";
import clipboard from '../../../assets/desktop/clipboard.svg';
import settings from '../../../assets/desktop/settings.svg';
import delivery_truck from '../../../assets/desktop/delivery_truck.svg';
import EditProfileDesktop from './EditProfileDesktop';

const shipmentData = {
    '1223123': [
            { lat: -7.797068, lng: 110.370529, status: 'Processing', time: '9:48 AM', details: 'Your product is being processed' },
            { lat: -7.807068, lng: 110.380529, status: 'Packaging', time: '10:26 AM', details: 'Your product is being packaged' },
            { lat: -7.817068, lng: 110.390529, status: 'Shipped', time: '12:36 PM', details: 'Product is currently being shipped out' }
        ],
    '2523423': [
            { lat: 23.05586, lng: 34.23391, status: 'Processing', time: '13:40 PM', details: 'Your product is being processed' },
            { lat: 23.055868, lng: 34.23391, status: 'Packaging', time: '15:30 PM', details: 'Your product is being packaged' },
        ],
    '212123': [
            { lat: -7.797068, lng: 110.370529, status: 'Processing', time: '9:48 AM', details: 'Your product is being processed' },
            { lat: -7.807068, lng: 110.380529, status: 'Packaging', time: '10:26 AM', details: 'Your product is being packaged' },
            { lat: -7.817068, lng: 110.390529, status: 'Shipped', time: '12:36 PM', details: 'Product is currently being shipped out' }
        ],
};

const ShipmentTracker = ({ shipmentTracking }) => {
    const location = useLocation();
    const [shipment, setShipment] = useState(shipmentData[location.state || 2523423]);
    const [shipmentID, setShipmentID] = useState(location.state || 2523423);
    const [tempID, setTempID] = useState(location.state || 2523423);

    const statusIcons = {
        Processing: <img src={clipboard}/>,
        Packaging: <img src={settings}/>,
        Shipped: <img src={delivery_truck}/>,
    };

    const handleSetShipment = (event) => {
        if (tempID in shipmentData) {
            setShipmentID(tempID);
        } else {
            console.log('Not found ' + tempID);
        }
    };

    useEffect(() => {
        if (shipmentID in shipmentData) {
            setShipment(shipmentData[shipmentID]);
        }
    }, [shipmentID]);

    return (
        <div className='bg-primary w-screen h-screen flex flex-row overflow-hidden'>
            <Sidebar />
            <div className='flex-1 bg-white rounded-xl mt-3 mr-3 mb-3 p-4 flex flex-col overflow-hidden'>
                <div className="flex justify-between items-center">
                    <h1 className='text-4xl font-semibold text-left ml-6 mt-3'>Shipment Tracker</h1>
                    <div className="p-2 bg-quinary rounded-full absolute right-0 top-0 mr-28 mt-12">
                        <a href="/notifications"><IoNotifications className="text-2xl" /></a>
                    </div>
                    <div>
                        <span className="flex items-center mr-6 mt-6">
                        <EditProfileDesktop />
                        </span>
                    </div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex-1 overflow-y-auto">
                    <h2 className='text-left font-medium text-sm ml-6 mb-5'> Get updated on the delivery of your package: </h2>

                    <div className="flex w-1/2 ml-6 mb-4">
                        <p className='mt-2 mr-4'>Enter Shipping ID:</p>
                        <SearchForm />
                    </div>

                    <div className="flex flex-col md:flex-row ml-6 h-full overflow-auto">
                        <div className="flex-auto border border-black mr-4 mb-4 overflow-hidden">
                            <ShipmentTrackerMap shipmentToTrack={shipment} />
                        </div>

                        <div className="flex-col md:w-1/3 bg-quinary rounded-lg p-4 overflow-y-auto relative">
                            <h2 className="text-xl font-semibold mb-4">Shipping ID: #{shipmentID}</h2>

                            <div className="relative">
                                {shipment.map((location, index) => (
                                    <div className="flex items-center mb-40 relative" key={index}>
                                        <div className="flex-shrink-0 h-14 w-14 rounded-full bg-primary flex items-center justify-center relative z-10">
                                            {statusIcons[location.status]}
                                            {index !== shipment.length - 1 && (
                                                <div className="absolute left-1/2 top-14 w-0.5 bg-green-700" style={{ height: '200px', transform: 'translateX(-50%)' }}>
                                                    <div className="absolute left-1/2 top-1/3 w-6 h-6 rounded-full bg-primary" style={{ transform: 'translate(-50%, -50%)' }} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-8">
                                            <p className="text-sm text-gray-500 text-left">{location.time}</p>
                                            <p className="font-medium text-left">{location.details}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ShipmentTracker;
