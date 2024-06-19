import profile from '../../assets/profile/profile.svg';
import { IoLocationSharp } from "react-icons/io5";
import SuccessNotification from "../SuccessNotification";
import FailedNotification from "../FailedNotification";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Input } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

function EditProfileContent({ role, name, email, centraUnit, formSubmitted, handleFormSubmission }) {
    const [newName, setNewName] = useState(name);
    const [newEmail, setNewEmail] = useState(email);
    const [trigger, setTrigger] = useState(0);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false);
    const [formSubmissionFailed, setFormSubmissionFailed] = useState(false);

    function handleNameChange(event) {
        setNewName(event.target.value);
    }

    function handleEmailChange(event) {
        setNewEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setNewPassword(event.target.value);
    }

    function handleConfirmPasswordChange(event) {
        setConfirmPassword(event.target.value);
    }

    function validatePasswordsMatch() {
        if (newPassword !== confirmPassword) {
            setPasswordsMatch(false);
            return false;
        }
        setPasswordsMatch(true);
        return true;
    }

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    async function handleSubmit(event) {
        event.preventDefault();
        if (!validatePasswordsMatch()) return;
    
        const payload = {
            username: newName,
            email: newEmail,
            new_password: newPassword,
            confirm_password: confirmPassword,
        };
    
        try {
            const response = await axios.put('https://mofera-backend-fork-ten.vercel.app/profile/', payload, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (response.status === 200) {
                setFormSubmittedSuccessfully(true);
                setFormSubmissionFailed(false);
                handleFormSubmission(response.data); 
            } else {
                setFormSubmissionFailed(true);
                setFormSubmittedSuccessfully(false);
            }
        } catch (error) {
            console.error('Failed to update user profile:', error);
            setFormSubmissionFailed(true);
            setFormSubmittedSuccessfully(false);
        }
    }
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        if (validatePasswordsMatch()) {
            await handleSubmit(event);
        } else {
            setFormSubmissionFailed(true);
            setFormSubmittedSuccessfully(false);
        }
        setTrigger(prev => prev + 1); // Update trigger state
    };
    

    return (
        <div className='flex flex-col justify-center items-center py-10 w-5/6 mx-auto text-primary'>
            {formSubmittedSuccessfully && <SuccessNotification htmlContent="You have successfully edited your user profile." trigger={trigger} />}
            {formSubmissionFailed && <FailedNotification htmlContent="Failed to update user profile." trigger={trigger} />}
            {!passwordsMatch && <FailedNotification htmlContent="Passwords do not match." trigger={trigger} />}

            <img src={profile} className="w-screen relative z-40 w-44 h-44 mt-2" alt="profile" />

            <p className='text-3xl mt-1 font-medium'>{name}</p>

            <div className='mt-1 flex justify-center'>
                <p className='font-medium flex gap-1 items-center text-base'><IoLocationSharp />Ponchiki, Aroma Ketek</p>
            </div>

            <form className='flex flex-col my-2 w-full text-left bg-denary rounded-2xl p-5 mt-7 items-center' onSubmit={handleFormSubmit}>
                <p className='font-bold text-green-900 mt-1 text-center text-xl'>User Profile</p>
                
                {role == "centra" && (
                    <div className='mt-5 w-full'>
                        <p className='font-bold text-left'>Centra Unit: {centraUnit}</p>
                    </div>
                )}
                
                <div className='mt-5 mb-2 w-full'>
                    <p className='font-bold text-left mb-2'>Username: </p>
                    <Input value={newName} onChange={handleNameChange} className="cursor-auto w-full border-primary" placeholder={name} />
                </div>

                <div className='mb-2 mt-5 w-full'>
                    <p className='font-bold text-left mb-2'>Email: </p>
                    <Input value={newEmail} onChange={handleEmailChange} className="cursor-auto w-full border-primary" placeholder={email} />
                </div>

                <div className='mb-2 mt-5 w-full'>
                    <p className='font-bold text-left mb-2'>New Password: </p>
                    <Input
                        type={isVisible ? "text" : "password"}
                        value={newPassword}
                        onChange={handlePasswordChange}
                        className="cursor-auto w-full border-primary bg-transparent"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <FaEye className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                    />
                </div>

                <div className='mb-2 mt-5 w-full'>
                    <p className='font-bold text-left mb-2'>Confirm Password: </p>
                    <Input
                        type={isVisible ? "text" : "password"}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className="cursor-auto w-full border-primary bg-transparent"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <FaEye className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                    />
                </div>

                <div className='mb-2 mt-5'>
                    <button className='rounded-3xl bg-primary px-5 py-3 text-white font-medium' type='submit'>Save Details</button>
                </div>

            </form>
        </div>
    );
}

export default EditProfileContent;
