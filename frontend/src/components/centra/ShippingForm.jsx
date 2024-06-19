import { useNavigate } from "react-router-dom";
import SuccessNotification from "../SuccessNotification";
import FailedNotification from "../FailedNotification"; // Added FailedNotification for handling errors
import { useState, useEffect } from "react";
import PackageIDInput from "./PackageIDInput";
import { addShippingInfo, getPackagesWithStatus } from "../../../api/centraAPI";
import AddShipmentHeader from "./AddShipmentHeader";

function ShippingForm() {
    const navigate = useNavigate();
    const [trigger, setTrigger] = useState(0);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isFormValid, setIsFormValid] = useState(true);

    const [weight, setWeight] = useState(0);
    const [total, setTotal] = useState(0);
    const [expedition, setExpedition] = useState("");
    const [shippingDate, setShippingDate] = useState("");
    const [shippingTime, setShippingTime] = useState("");
    const [etaDate, setEtaDate] = useState("");
    const [etaTime, setEtaTime] = useState("");
    const [packageData, setPackageData] = useState([]);
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const fetchPackage = async () => {
            const response = await getPackagesWithStatus(0);
            if (response && response.data) {
                setPackageData(response.data);
            }
        };
        fetchPackage();
        console.log(packageData);
    }, []);

    function handlePackageIDChange(selectedPackageIDs) {
        let totalWeight = 0;
        selectedPackageIDs.forEach(id => {
            const packageInfo = packageData.find(pkg => pkg.id === id);
            if (packageInfo) {
                totalWeight += packageInfo.weight;
            }
        });

        setWeight(totalWeight);
        setTotal(selectedPackageIDs.length);
        setPackages(selectedPackageIDs);
        console.log(selectedPackageIDs);
    }

    function handleView() {
        navigate("/viewcheckpoint");
    }

    const validateForm = () => {
        return weight > 0 && expedition && shippingDate && shippingTime && etaDate && etaTime && packages.length > 0;
    };

    function handleSubmit() {
        if (validateForm()) {
            const data = {
                packages,
                expedition,
                total_packages: total,
                total_weight: weight,
                departure_datetime: `${shippingDate}T${shippingTime}`,
                eta_datetime: `${etaDate}T${etaTime}`
            };
            addShippingInfo(data);

            setIsFormValid(true);
            setFormSubmitted(true);
            setTrigger(prev => prev + 1); // Increment the trigger to ensure notification shows
            console.log("Form submitted successfully");
        } else {
            setIsFormValid(false);
            setFormSubmitted(true);
            setTrigger(prev => prev + 1); // Increment the trigger to ensure notification shows
            console.log("Form submission failed");
        }

        setWeight(0);
        setExpedition("");
        setShippingDate("");
        setShippingTime("");
        setEtaDate("");
        setEtaTime("");
        setPackages("");
        setTotal(0);
    }

    const handleShippingDateChange = (event) => {
        setShippingDate(event.target.value);
    };

    const handleShippingTimeChange = (event) => {
        setShippingTime(event.target.value);
    };

    const handleEtaDateChange = (event) => {
        setEtaDate(event.target.value);
    }

    const handleEtaTimeChange = (event) => {
        setEtaTime(event.target.value);
    }

    const handleExpeditionChange = (event) => {
        setExpedition(event.target.value);
    }

    return (
        <div>
            {formSubmitted && isFormValid && <SuccessNotification htmlContent="You have successfully shipped the packages." trigger={trigger} />}
            {formSubmitted && !isFormValid && <FailedNotification htmlContent="Failed to ship the packages. Please ensure all fields are filled correctly." trigger={trigger} />}

            <AddShipmentHeader />

            <div className='pb-36 z-0'>
                <div className='bg-white mb-5 w-5/6 mx-auto py-7 px-9 rounded-2xl text-left relative mt-5 flex flex-col shadow-lg'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="packageId" className='items-start mb-2 text-xs font-medium'>Package IDs:</label>
                        <PackageIDInput onPackageIDChange={handlePackageIDChange} packageData={packageData} />
                                    
                        <label htmlFor="packageWeight" className='items-start text-xs mb-2 font-medium'>Package Weight:</label>
                        <input type="number" id="packageWeight" className='mb-2 rounded-md bg-quinary px-2 py-2 w-full text-xs border-none' value={weight} readOnly required />

                        <label htmlFor="totalPackages" className='items-start text-xs mb-2 font-medium'>Total Packages:</label>
                        <input type="number" id="totalPackages" className='mb-2 rounded-md bg-quinary px-2 py-2 w-full text-xs border-none' value={total} readOnly required />

                        <label htmlFor="expedition" className='items-start text-xs mb-2 font-medium'>Expedition:</label>
                        <select id="expedition" className="rounded-md bg-quinary py-2 px-2 text-xs mb-3 w-full" onChange={handleExpeditionChange} value={expedition} required>
                            <option value="">Choose an expedition</option>
                            <option value="JNE Express">JNE Express</option>
                            <option value="JNT Express">JNT Express</option>
                            <option value="SiCepat">SiCepat</option>
                            <option value="Sentral Cargo">Sentral Cargo</option>
                            <option value="Kitrans">Kitrans</option>
                            <option value="Persero">PT Pelni (Persero)</option>
                            <option value="POS Indonesia">POS Indonesia</option>
                            <option value="Samudera Indonesia">Samudera Indonesia</option>
                        </select>

                        <label htmlFor="shippingDate" className='items-start text-xs mb-2 font-medium'>Shipping Date:</label>
                        <input type="date" id="shippingDate" className="rounded-md bg-quinary py-2 px-2 text-xs mb-3 w-full" value={shippingDate} onChange={handleShippingDateChange} required />

                        <label htmlFor="shippingTime" className='items-start text-xs mb-2 font-medium'>Shipping Time: </label>
                        <input type="time" id="shippingTime" className='mb-2 rounded-md bg-quinary px-2 py-2 w-full text-xs border-none' value={shippingTime} onChange={handleShippingTimeChange} required />

                        <label htmlFor="etaDate" className='items-start text-xs mb-2 font-medium'>Estimated Time Arrival Date:</label>
                        <input type="date" id="etaDate" className="rounded-md bg-quinary py-2 px-2 text-xs mb-3 w-full" value={etaDate} onChange={handleEtaDateChange} required />

                        <label htmlFor="etaTime" className='items-start text-xs mb-2 font-medium'>Estimated Time Arrival Time: </label>
                        <input type="time" id="etaTime" className='mb-2 rounded-md bg-quinary px-2 py-2 w-full text-xs border-none' value={etaTime} onChange={handleEtaTimeChange} required />

                        <div className='mx-auto mt-2 flex justify-center'>
                            <button className='bg-secondary text-white rounded-3xl px-7 py-2 font-semibold hover:bg-primary flex gap-2 items-center' type="submit">SHIP</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ShippingForm;
