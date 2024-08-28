import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import states from '../../utils/states';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../redux/slices/cart';
import { addAddress, deleteAddress } from '../../redux/slices/userAuth'; // Import deleteAddress action
import { addDeliveryAddress } from '../../redux/slices/order';

const Shipping = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.userAuth);
    const { totalPrice, products } = useSelector((state) => state.cart);
    const { deliveryAddress , orderProducts } = useSelector((state) => state.order);

    const dispatch = useDispatch();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddAddress, setShowAddAddress] = useState(false);
    
    const [newAddress, setNewAddress] = useState({
        address: '',
        city: '',
        state: '',
        postalCode: '',
        contactNumber: '',
        country: 'INDIA'
    });

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
        setShowAddAddress(false);
    };

    const handleAddAddressToggle = () => {
        setShowAddAddress(!showAddAddress);
    };

    const handleInputChange = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    const handleAddAddressSubmit = (e) => {
        e.preventDefault();

        if(!newAddress.address){
            toast.error("Please enter address.")
            return;
        }
        if(!newAddress.city){
            toast.error("Please enter city.")
            return;
        }
        if(!newAddress.state){
            toast.error("Please enter state.")
            return;
        }
        if(!newAddress.postalCode){
            toast.error("Please enter postal code.")
            return;
        }
        if(!newAddress.contactNumber){
            toast.error("Please enter contact number.")
            return;
        }

        dispatch(addAddress(newAddress, () => setShowAddAddress(false)));

        // Simulate adding address
        // console.log("New Address Added:", newAddress);
    };

    const handleDeleteAddress = (addressId) => {
        dispatch(deleteAddress(addressId)).then(() => {
            if (selectedAddress?.id === addressId) {
                setSelectedAddress(null);
            }
        });

        // Simulate deleting address
        // console.log("Address Deleted:", addressId);
    };

    const shippingSubmit = (e) => {
        e.preventDefault();
        if (!selectedAddress) {
            toast.error("Please select an address");
            return;
        }

        // add address to redux state
        dispatch( addDeliveryAddress(selectedAddress) )

        // Simulate saving selected address
        // console.log("Shipping Info Saved:", selectedAddress);
        navigate("/order/confirm");
    };

    const handleNumericInput = (e) => {
        const { value, maxLength } = e.target;
        if (value.length > maxLength) {
            e.target.value = value.slice(0, maxLength);
        }
        if (!/^\d*$/.test(value)) {
            e.target.value = value.replace(/\D/g, '');
        }
    };

    return (
        <>

            <main className="w-full mt-20">
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7 overflow-hidden">
                    <div className="flex-1">
                        <Stepper activeStep={1}>
                            <div className="w-full bg-white">
                                <form onSubmit={shippingSubmit} autoComplete="off" className="flex flex-col justify-start gap-3 w-full sm:w-3/4 mx-1 sm:mx-8 my-4">
                                    <h2 className="text-xl font-semibold">Select Address</h2>
                                    {user?.addresses?.map((address, index) => (
                                        <div key={index} className={`border p-4 mb-2 cursor-pointer ${selectedAddress === address ? 'border-green-500' : 'border-gray-300'}`} onClick={() => handleAddressSelect(address)}>
                                            <p>{address.address}</p>
                                            <p>{address.city}, {address.state}, {address.postalCode}</p>
                                            <p>{address.country}</p>
                                            <p>{address.contactNumber}</p>
                                            <button type="button" className="bg-red-500 text-white py-1 px-2 rounded mt-2" onClick={(e) => { e.stopPropagation(); handleDeleteAddress(address._id); }}>Delete</button>
                                        </div>
                                    ))}
                                    {user?.addresses?.length >= 3 ? (
                                        <p className="text-red-500">Only 3 addresses can be added.</p>
                                    ) : (
                                        <button type="button" className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleAddAddressToggle} disabled={user?.addresses?.length >= 3}>
                                            {showAddAddress ? "Cancel" : "Add New Address"}
                                        </button>
                                    )}
                                    {showAddAddress && (
                                        <div className="mt-4">
                                            <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
                                            
                                            <TextField
                                                name="address"
                                                value={newAddress.address}
                                                onChange={handleInputChange}
                                                fullWidth
                                                label="Address"
                                                variant="outlined"
                                                required
                                                className="mb-3"
                                            />

                                            <div className="flex gap-6 mt-4">
                                                <TextField
                                                    name="city"
                                                    value={newAddress.city}
                                                    onChange={handleInputChange}
                                                    label="City"
                                                    fullWidth
                                                    variant="outlined"
                                                    required
                                                    className="mb-3"
                                                />
                                                <TextField
                                                    name="postalCode"
                                                    value={newAddress.postalCode}
                                                    onChange={handleInputChange}
                                                    label="Postal Code"
                                                    fullWidth
                                                    variant="outlined"
                                                    required
                                                    inputProps={{ maxLength: 6 }}
                                                    onInput={handleNumericInput}
                                                    className="mb-3"
                                                />
                                            </div>

                                            <div className="flex gap-6 mt-4">
                                                <TextField
                                                    name="contactNumber"
                                                    value={newAddress.contactNumber}
                                                    onChange={handleInputChange}
                                                    label="Contact Number"
                                                    fullWidth
                                                    variant="outlined"
                                                    required
                                                    inputProps={{ maxLength: 10 }}
                                                    onInput={handleNumericInput}
                                                    className="mb-3"
                                                />
                                                <FormControl fullWidth className="mb-3">
                                                    <InputLabel id="state-select">State</InputLabel>
                                                    <Select
                                                        labelId="state-select"
                                                        name="state"
                                                        value={newAddress.state}
                                                        onChange={handleInputChange}
                                                        label="State"
                                                        required
                                                    >
                                                        {states.map((item) => (
                                                            <MenuItem key={item.code} value={item.code}>{item.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>

                                            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-4" onClick={handleAddAddressSubmit}>
                                                Save Address
                                            </button>
                                        </div>
                                    )}
                                    <button type="submit" className="bg-[#ffd426] w-full sm:w-1/3 my-2 py-3.5 text-sm font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none">Next</button>
                                </form>
                            </div>
                        </Stepper>
                    </div>
                    <PriceSidebar totalPrice={totalPrice} products={products} />
                </div>
            </main>
        </>
    );
};

export default Shipping;
