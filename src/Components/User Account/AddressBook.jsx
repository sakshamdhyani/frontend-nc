import React, { useEffect, useState } from 'react';
import "./addressBook.css";
import { MdEdit, MdDelete } from "react-icons/md";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { addAddress, deleteAddress, updateAddress } from '../../redux/slices/userAuth';

const AddressBook = () => {

    const { user } = useSelector((state) => state.userAuth);
    const [addresses, setAddresses] = useState([]);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [currentAddress, setCurrentAddress] = useState({ address: "", city: "", state: "", postalCode: "", country: "", contactNumber: "" });
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        setAddresses(user?.addresses || []);
    }, [user]);

    const handleOpen = (index = null) => {
        if (index !== null) {
            setCurrentAddress(addresses[index]);
            setEditIndex(addresses[index]._id);
        } else {
            setCurrentAddress({ address: "", city: "", state: "", postalCode: "", country: "", contactNumber: "" });
            setEditIndex(null);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentAddress({ address: "", city: "", state: "", postalCode: "", country: "", contactNumber: "" });
        setEditIndex(null);
    };

    // submit handler
    const handleSave = () => {
        if (editIndex !== null) {
            dispatch(updateAddress(editIndex, currentAddress, handleClose));
        } else {
            dispatch(addAddress(currentAddress, handleClose));
        }
    };

    const handleDelete = (index) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this address ?");

        if(confirmDelete){
            dispatch(deleteAddress(index));
        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentAddress({ ...currentAddress, [name]: value });
    };

    return (
        <div className='addressBookBody'>
            <h1 className='addressBookHeading'>Address Book</h1>

            <div className='addressBookContainer'>
                {addresses.length === 0 ? (
                    <div className="no-addresses">No addresses added yet</div>
                ) : (
                    addresses.map((addr, idx) => (
                        <div className='addressBookContainerRow' key={idx}>
                            <div className='addressBookContainerRowLeft'>
                                <h2>{addr.address}</h2>
                                <h2>{addr.city}, {addr.state}, {addr.postalCode}</h2>
                                <h2>{addr.country}</h2>
                                <h2>{addr.contactNumber}</h2>
                            </div>
                            <div className='addressBookContainerRowRight'>
                                <p className='addressBookRowEdit' onClick={() => handleOpen(idx)}><MdEdit /></p>
                                <p className='addressBookRowDelete' onClick={() => handleDelete(addr._id)}><MdDelete /></p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button
                className='addressBookAddBtn'
                onClick={() => handleOpen()}
            >
                Add Address
            </button>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{editIndex !== null ? "Edit Address" : "Add Address"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Address"
                        fullWidth
                        name="address"
                        value={currentAddress.address}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="City"
                        fullWidth
                        name="city"
                        value={currentAddress.city}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="State"
                        fullWidth
                        name="state"
                        value={currentAddress.state}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Postal Code"
                        fullWidth
                        name="postalCode"
                        value={currentAddress.postalCode}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Country"
                        fullWidth
                        name="country"
                        value={currentAddress.country}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Contact Number"
                        fullWidth
                        name="contactNumber"
                        value={currentAddress.contactNumber}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">{editIndex !== null ? "Save" : "Add"}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddressBook;
