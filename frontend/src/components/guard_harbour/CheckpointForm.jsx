import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgAdd } from 'react-icons/cg';
import SuccessNotification from '../SuccessNotification';
import FailedNotification from '../FailedNotification'; // Add the failed notification if needed
import AddNotesModal from './AddNotesModal';
import PackageIDInput from '../centra/PackageIDInput';
import { motion } from 'framer-motion';
import { postCheckpoint, getPackages, getShippingInfo } from '../../../api/guardHarborAPI';

function CheckpointForm() {
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isFormValid, setIsFormValid] = useState(true); // State to track form validity
    const [trigger, setTrigger] = useState(0); // State to control notifications

    const [shippingId, setShippingId] = useState('');
    const [totalPackagesSent, setTotalPackagesSent] = useState('');
    const [centra, setCentra] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [totalPackagesArrived, setTotalPackagesArrived] = useState('');
    const [selectedPackageIDs, setSelectedPackageIDs] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const [notes, setNotes] = useState('');

    const [shippingData, setShippingData] = useState([]);
    const [packageData, setPackageData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const shippingResponse = await getShippingInfo();
                setShippingData(shippingResponse.data);

                const packageResponse = await getPackages();
                setPackageData(packageResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    function handleView() {
        navigate('/viewcheckpoint');
    }

    const validateForm = () => {
        return shippingId && arrivalDate && arrivalTime && selectedPackageIDs.length > 0;
    };

    async function handleSubmit() {
        const arrival_datetime = `${arrivalDate}T${arrivalTime}`;
        const data = {
            shipping_id: shippingId,
            total_packages: totalPackagesArrived,
            package_ids: selectedPackageIDs,
            arrival_datetime,
            note: notes,
        };

        if (validateForm()) {
            try {
                await postCheckpoint(data);
                setIsFormValid(true);
                setFormSubmitted(true);
                setTrigger(prev => prev + 1); // Increment the trigger to show notification

                // Reset form fields
                setShippingId('');
                setTotalPackagesSent('');
                setCentra('');
                setArrivalDate('');
                setArrivalTime('');
                setTotalPackagesArrived('');
                setSelectedPackageIDs([]);
                setNotes('');

                fetchShippingData();
            } catch (error) {
                console.error('Error submitting checkpoint data:', error);
            }
        } else {
            setIsFormValid(false);
            setFormSubmitted(true);
            setTrigger(prev => prev + 1); // Increment the trigger to show notification
        }
    }

    async function fetchShippingData() {
        try {
            const shippingResponse = await getShippingInfo();
            setShippingData(shippingResponse.data);
        } catch (error) {
            console.error('Error fetching shipping data:', error);
        }
    }

    function handleEdit() {
        setNotes('');
    }

    function handleSave() {
        setNotes(notes); // Update the saved notes with the edited notes
        toggleModal(); // Close the modal
    }

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    function handleShippingIDChange(e) {
        const selectedShippingId = Number(e.target.value);
        setShippingId(selectedShippingId);
        setSelectedPackageIDs([]);
        setTotalPackagesArrived(0);

        const shipping = shippingData.find((data) => data.id == selectedShippingId);
        const packages = packageData.filter((pkg) => pkg.shipping_id == selectedShippingId);
        setTotalPackagesSent(packages.length);
        setCentra(shipping ? shipping.centra_id : '');
    }

    function handlePackageIDChange(selectedPackageIDs) {
        setSelectedPackageIDs(selectedPackageIDs);
        setTotalPackagesArrived(selectedPackageIDs.length);
    }

    return (
        <div>
            {formSubmitted && isFormValid && <SuccessNotification htmlContent="You have successfully added checkpoint data." trigger={trigger} />}
            {formSubmitted && !isFormValid && <FailedNotification htmlContent="Failed to add checkpoint data. Please fill in all required fields." trigger={trigger} />}

            <div className="flex flex-col items-center">
                <div className="flex pt-16 z-10 items-center justify-center mb-5">
                    <p className="font-bold text-primary text-3xl"> Checkpoints </p>
                </div>

                <div className="bg-white w-2/3 rounded-full z-20 mb-3">
                    <div className="flex text-s gap-1 font-medium p-1">
                        <p className="w-48 bg-tertiary rounded-full text-white p-1"> Add </p>
                        <p className="w-48 rounded-full p-1" onClick={handleView}> View </p>
                    </div>
                </div>
            </div>

            <motion.div
                key="add"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="pb-36">
                    <div
                        className="bg-white mb-5 w-3/4 mx-auto py-5 px-7 rounded-2xl text-left relative mt-5 flex flex-col"
                        onSubmit={handleSubmit}
                    >
                        <form>
                            <p className="text-center primary font-bold mb-5 text-3xl">Checkpoint Data</p>

                            <label htmlFor="shippingId" className="items-start text-xs mb-2 font-medium">
                                Shipping ID:
                            </label>
                            <select
                                id="shippingId"
                                className="mb-2 rounded-md bg-quinary px-2 py-1 w-full text-xs border-none"
                                value={shippingId}
                                onChange={handleShippingIDChange}
                                required
                            >
                                <option value="" disabled>
                                    Select Shipping ID
                                </option>
                                {shippingData
                                    .filter(shipping => !shipping.arrival_datetime)  // Filter out IDs with arrival_datetime set
                                    .map((shipping) => (
                                        <option key={shipping.id} value={shipping.id}>
                                            {shipping.id}
                                        </option>
                                ))}
                            </select>

                            <label htmlFor="totalPackagesSent" className="items-start text-xs mb-2 font-medium">
                                Total Packages Sent:
                            </label>
                            <input
                                type="number"
                                id="totalPackagesSent"
                                className="mb-2 rounded-md bg-quinary px-2 py-1 w-full text-xs border-none"
                                value={totalPackagesSent}
                                readOnly
                            />

                            <label htmlFor="centra" className="items-start text-xs mb-2 font-medium">
                                Unit Centra:
                            </label>
                            <input
                                type="number"
                                id="centra"
                                className="mb-2 rounded-md bg-quinary px-2 py-1 w-full text-xs border-none"
                                value={centra}
                                readOnly
                            />

                            <label htmlFor="arrivalDate" className="items-start text-xs mb-2 font-medium">
                                Arrival Date:
                            </label>
                            <input
                                type="date"
                                className="rounded-md bg-quinary py-2 px-2 text-xs mb-3 w-full"
                                value={arrivalDate}
                                onChange={(e) => setArrivalDate(e.target.value)}
                                required
                            />

                            <label htmlFor="arrivalTime" className="items-start text-xs mb-2 font-medium">
                                Arrival Time:
                            </label>
                            <input
                                type="time"
                                className="rounded-md bg-quinary py-2 px-2 text-xs mb-3 w-full"
                                value={arrivalTime}
                                onChange={(e) => setArrivalTime(e.target.value)}
                                required
                            />

                            <label htmlFor="packageId" className="items-start text-xs mb-2 font-medium">
                                Package ID:{' '}
                            </label>
                            <PackageIDInput shippingID={shippingId} onPackageIDChange={handlePackageIDChange} packageData={packageData}/>

                            <label htmlFor="totalPackagesArrived" className="items-start text-xs mb-2 font-medium">
                                Total Packages Arrived:{' '}
                            </label>
                            <input
                                type="number"
                                id="totalPackagesArrived"
                                className="mb-2 rounded-md bg-quinary px-2 py-1 w-full text-xs border-none"
                                value={totalPackagesArrived}
                                readOnly
                            />

                            <div className="mx-auto mt-2 flex justify-center">
                                <button
                                    className="bg-secondary text-white rounded-3xl px-7 py-2 font-medium hover:bg-primary flex gap-2 items-center"
                                    type="submit"
                                >
                                    <CgAdd />
                                    ADD
                                </button>
                            </div>
                        </form>

                        <div className="mx-auto mt-2 mb-5">
                            <button
                                className="bg-secondary text-white rounded-3xl px-7 py-2 font-medium hover:bg-primary items-center gap-2 flex"
                                onClick={toggleModal}
                            >
                                <CgAdd />
                                ADD NOTES
                            </button>

                            <AddNotesModal
                                isOpen={isOpen}
                                toggleModal={toggleModal}
                                handleEdit={handleEdit}
                                handleSave={handleSave}
                                savedNotes={notes}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default CheckpointForm;
