import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './editMyAccount.css';
import { updateUserPassword, updateUserProfile } from '../../redux/slices/userAuth';
import Loader from '../Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

const EditMyAccount = () => {
    const { user } = useSelector((state) => state.userAuth);
    const dispatch = useDispatch();

    const [isEditingGeneral, setIsEditingGeneral] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [loadingGeneral, setLoadingGeneral] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);

    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        mobileNumber: user?.mobileNumber || '',
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePasswordChange = (name, value) => {
        setPasswordData({
            ...passwordData,
            [name]: value,
        });
    };

    const isStrongPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        return regex.test(password);
    };

    const handleEditGeneralClick = () => {
        setIsEditingGeneral(true);
    };

    const handleEditPasswordClick = () => {
        setIsEditingPassword(true);
    };

    const handleSaveGeneralClick = () => {
        if (formData.mobileNumber.length !== 10) {
            setErrorMessage('Mobile number must be exactly 10 digits.');
            return;
        }

        const updatedUser = {
            ...formData,
        };

        setLoadingGeneral(true);
        dispatch(updateUserProfile(updatedUser, () => {
            setIsEditingGeneral(false);
            setLoadingGeneral(false);
        }));
        setErrorMessage("");
    };

    const handleSavePasswordClick = () => {
        if (!isStrongPassword(passwordData.newPassword)) {
            toast.error('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
            return;
        }

        setLoadingPassword(true);
        dispatch(updateUserPassword(passwordData.oldPassword, passwordData.newPassword, () => {
            setIsEditingPassword(false);
            setLoadingPassword(false);
            setPasswordData({
                oldPassword: '',
                newPassword: '',
            });
        }));
    };

    return (
        <div className='editMyAccountBody'>
            <Toaster />
            <h1 className='editMyAccountGeneralHeading'>General</h1>
            <div className='editMyAccountContainer'>
                <div className='editMyAccountRow'>
                    <h1>Email</h1>
                    <input type="text" readOnly value={user?.email} className='bg-gray-300 outline-none' />
                </div>
                <div className='editMyAccountRow'>
                    <h1>First Name</h1>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        placeholder='First Name'
                        disabled={!isEditingGeneral}
                    />
                </div>
                <div className='editMyAccountRow'>
                    <h1>Last Name</h1>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        placeholder='Last Name'
                        disabled={!isEditingGeneral}
                    />
                </div>
                <div className='editMyAccountRow'>
                    <h1>Mobile Number</h1>
                    <input
                        type="number"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        placeholder='Mobile Number'
                        disabled={!isEditingGeneral}
                    />
                </div>
                {errorMessage && <div className='error-message'>{errorMessage}</div>}
            </div>
            <div className='editMyAccountSubmitBtn'>
                {isEditingGeneral ? (
                    loadingGeneral ? (
                        <Loader />
                    ) : (
                        <button onClick={handleSaveGeneralClick} disabled={loadingGeneral}>Save</button>
                    )
                ) : (
                    <button onClick={handleEditGeneralClick}>Edit</button>
                )}
            </div>

            <h1 className='editMyAccountGeneralHeading'>Change Password</h1>
            <div className='editMyAccountContainer'>
                <div className='editMyAccountRow'>
                    <h1>Old Password</h1>
                    <input
                        type="password"
                        name="oldPassword"
                        value={passwordData.oldPassword}
                        onChange={(e) => handlePasswordChange(e.target.name, e.target.value)}
                        placeholder='Old Password'
                        disabled={!isEditingPassword}
                    />
                </div>
                <div className='editMyAccountRow'>
                    <h1>New Password</h1>
                    <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={(e) => handlePasswordChange(e.target.name, e.target.value)}
                        placeholder='New Password'
                        disabled={!isEditingPassword}
                    />
                </div>
            </div>
            <div className='editMyAccountSubmitBtn'>
                {isEditingPassword ? (
                    loadingPassword ? (
                        <Loader />
                    ) : (
                        <button onClick={handleSavePasswordClick} disabled={loadingPassword}>Save</button>
                    )
                ) : (
                    <button onClick={handleEditPasswordClick}>Edit</button>
                )}
            </div>
        </div>
    );
};

export default EditMyAccount;
