import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure, Badge } from "@nextui-org/react";
import profilepic from "../../../assets/desktop/profilepicdesktop.svg";
import axios from "axios";

function EditProfileDesktop({ user, onEditUser }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [editUser, setEditUser] = useState({ ...user });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    async function handleSubmit(event) {
        event.preventDefault();
        if (editUser.password !== editUser.confirmPassword) return;
    
        const payload = {
            username: editUser.username,
            email: editUser.email,
            new_password: editUser.password,
            confirm_password: editUser.confirmPassword,
        };
    
        try {
            const response = await axios.put('http://127.0.0.1:8000/profile/', payload, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (response.status === 200) {
                console.log("Success"); 
            } else {
                console.error('Failed to update user profile:', error)
            }
        } catch (error) {
            console.error('Failed to update user profile:', error);
        }
    }

    return (
        <>
            <div className="flex align-right mb-6 absolute right-0 top-0 mr-12 mt-12">
            <Badge shape="circle" content="" color="secondary" placement="bottom-right" className="">
            <Button onClick={onOpen} 
                auto
                isIconOnly
                variant="light"
                className="bg-transparent"
            >
                <img src={profilepic} alt="" className=""/>
            </Button>
            </Badge>
            
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col font-bold text-3xl">User Profile</ModalHeader>
                            <ModalBody>
                                <p className="font-md">To edit the user, please update the form below:</p>
                                <Input
                                    clearable
                                    bordered
                                    fullWidth
                                    color="quinary"
                                    size="lg"
                                    label="Username"
                                    placeholder="Enter the updated username:"
                                    name="username"
                                    value={editUser.user} // Ensure this matches the user object property
                                    onChange={handleInputChange}
                                    className="mb-4"
                                />
                                 <Input
                                    clearable
                                    bordered
                                    fullWidth
                                    color="quinary"
                                    size="lg"
                                    label="Email"
                                    placeholder="Enter the updated email:"
                                    name="email"
                                    value={editUser.email} // Ensure this matches the user object property
                                    onChange={handleInputChange}
                                    className="mb-4"
                                />
                                <Input
                                    clearable
                                    bordered
                                    fullWidth
                                    color="quinary"
                                    size="lg"
                                    label="Password"
                                    placeholder="Enter the updated password:"
                                    name="password"
                                    value={editUser.password}
                                    onChange={handleInputChange}
                                    className="mb-4"
                                />
                                <Input
                                    clearable
                                    bordered
                                    color="quinary"
                                    size="lg"
                                    label="Password"
                                    placeholder="Confirm the updated password:"
                                    name="confirmPassword"
                                    value={editUser.confirmPassword}
                                    onChange={handleInputChange}
                                    className="mb-4"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="bordered" onPress={() => onOpenChange(false)} className="font-medium">
                                    Close
                                </Button>
                                <Button color="secondary" onClick={handleSubmit} className="font-medium">
                                    Save Changes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            </div>
          
        </>
    );
}

export default EditProfileDesktop;
