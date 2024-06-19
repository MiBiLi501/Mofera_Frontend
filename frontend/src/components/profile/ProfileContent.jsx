import profile from '../../assets/profile/profile.svg'
import { CgAdd } from "react-icons/cg";
import { IoLocationSharp } from "react-icons/io5";
import reward from '../../assets/profile/reward.svg'
import collect from '../../assets/profile/collect.svg'
import trophy from '../../assets/profile/trophy.svg'
import NavigateTo from './NavigateTo';
import Account from './Account';
import ConfirmNotification from '../ConfirmNotification';
import { useState, useEffect } from "react";
import axios from 'axios';
import { getCentraLocation } from '../../../api/centraAPI';

function ProfileContent({ role, name }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [text, setText] = useState("");
    const [confirmationText, setConfirmationText] = useState("");
    const [confirmedText, setConfirmedText] = useState("");
    const [confirmedTitle, setConfirmedTitle] = useState("");
    const [cancelledText, setCancelledText] = useState("");
    const [confirmationFunction, setConfirmationFunction] = useState({"func": new Function()})
    const [location, setLocation] = useState("");

    const confirmLogout = async () => {
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.post('https://mofera-backend-fork-ten.vercel.app/auth/logout')

            localStorage.removeItem('token');


            if (response.status === 200) {
                window.location.href = '/login';
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const confirmDelete = async () => {
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.delete('https://mofera-backend-fork-ten.vercel.app/auth/delete')

            localStorage.removeItem('token');

            if (response.status === 200) {
                window.location.href = '/';
            } else {
                console.error("Delete account failed");
            }
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await getCentraLocation();
                setLocation(response.data.location);
            } catch (error) {
                console.error("Error fetching location:", error);
                if (role === "GuardHarbor") {
                    setLocation("Pelabuhan Labuhan Bajo");
                } else if (role === "xyz") {
                    setLocation("Nusa Cendana, NTT");
                } else {
                    setLocation("");
                }
            }
        };

        if (role === "centra") {
            fetchLocation();
        } else if (role === "GuardHarbor") {
            setLocation("Pelabuhan Labuhan Bajo"); // Default location if role is GuardHarbor
        } else if (role === "xyz") {
            setLocation("Nusa Cendana, NTT"); // Default location if role is xyz
        } else {
            setLocation(""); 
        }
    }, [role]); 

    function handleLogOut() {
        setShowConfirm(true);
        setText("You'll have to log in again if you want to use Mofera");
        setConfirmationText("Yes, log out!");
        setConfirmedText("Logged Out!");
        setConfirmedTitle("You have logged out from the app.");
        setCancelledText("You are still in the app :)");
        setConfirmationFunction({"func": confirmLogout})
    }

    function handleDelete() {
        setShowConfirm(true);
        setText(`Your account will be deleted permanently. This means you won't be able to access ${role} data and other personal details`);
        setConfirmationText("Yes, delete it!");
        setConfirmedText("Deleted!");
        setConfirmedTitle("Your account has been deleted");
        setCancelledText(`You still have access to the ${role} data :>`);
        setConfirmationFunction({"func": confirmDelete})
    }

    return (
        <div className='flex flex-col justify-center items-center py-10 w-5/6 mx-auto'>
            <img src={profile} className="w-screen relative z-40 w-44 h-44 mt-2" />

            <div className='mt-3 flex justify-center'>
                <a href='/editprofile'>
                    <p className='text-primary font-medium flex gap-1 items-center text-base underline'><CgAdd />Edit Profile</p>
                </a>
            </div>

            <p className='text-primary text-3xl mt-1 font-medium'>{name}</p>

            <div className='mt-1 flex justify-center'>
                <p className='text-primary font-medium flex gap-1 items-center text-base'><IoLocationSharp />{location}</p>
            </div>


            <div className='my-2 text-left w-full'>
                <p className='text-primary font-bold ml-5'>Navigate To</p>
                <NavigateTo role={role} />
            </div>

            <div className='my-2 text-left w-full'>
                <p className='text-primary font-bold ml-5'>Account</p>
                <Account handleLogOut={handleLogOut} handleDelete={handleDelete} />
            </div>

            {showConfirm && <ConfirmNotification
                onClose={() => setShowConfirm(false)}
                text={text}
                confirmationText={confirmationText}
                confirmedText={confirmedText}
                confirmedTitle={confirmedTitle}
                cancelledText={cancelledText}
                confirmFunction={confirmationFunction}
            />}
        </div>
    );
}

export default ProfileContent;
