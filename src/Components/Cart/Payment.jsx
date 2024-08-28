import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Stepper from './Stepper';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../redux/slices/cart';
import formatPrice from '../../utils/formatPrice';
import { useNavigate } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { cashOnDelivery } from '../../redux/slices/order';
import BigLoader from "../Loader/BigLoader"


const Payment = () => {
    const { products } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.userAuth);
    const { deliveryAddress, totalPrice, loading } = useSelector((state) => state.order);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [payDisable, setPayDisable] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cod');

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    useEffect(() => {
        if(totalPrice <= 0) {
            navigate("/Mycart");
        }
    },[dispatch , totalPrice])


    const submitHandler = (e) => {
        e.preventDefault();
        
        if (paymentMethod === 'phonepe') {
            toast.error("Not Available")
            // axios.post("/api/v1/backend/create-checkout-session", {
            //     data: {
            //         user: user,
            //         amount: totalPrice,
            //         items: products,
            //         deliveryAddress
            //     }
            // }, { withCredentials: true })
            // .then(response => {
            //     window.location.href = response.data;
            // })
            // .catch(error => {
            //     console.log(error);
            //     toast.error("Payment failed. Please try again.");
            // });
        } 
        else if (paymentMethod === 'cod') {
            dispatch(cashOnDelivery({ amount: totalPrice,items: products, deliveryAddress,navigate }))
        }
    };

    return (
        loading ? <BigLoader/> :
        <>
            <main className="w-full mt-20">
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
                    <div className="flex-1">
                        <Stepper activeStep={3}>
                            <div className="w-full bg-white">
                                <form onSubmit={submitHandler} autoComplete="off" className="flex flex-col justify-start gap-2 w-full mx-8 my-4 overflow-hidden">
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="payment-radio-group"
                                            defaultValue="phonepe"
                                            name="payment-radio-button"
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        >
                                            {/* <FormControlLabel
                                                value="phonepe"
                                                control={<Radio />}
                                                label={
                                                    <div className="flex items-center justify-center gap-4">
                                                        <img draggable="false" className="w-36 object-contain" src="/phonepelogo.png" alt="PhonePe" />
                                                    </div>
                                                }
                                            /> */}
                                            <FormControlLabel
                                                value="cod"
                                                control={<Radio />}
                                                label={
                                                    <div className='flex text-xl font-semibold'>
                                                        <CurrencyRupeeIcon/>
                                                        <p>Cash on Delivery</p>
                                                    </div>
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <input type="submit" value={`Pay ₹ ${formatPrice(totalPrice)}`} disabled={payDisable} className={`${payDisable ? "bg-primary-grey cursor-not-allowed" : "bg-[#54CE44] cursor-pointer"} w-full sm:w-1/3 my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none text-center`} />
                                </form>
                            </div>
                        </Stepper>
                    </div>

                    {/* Sidebar */}
                    <div className="hidden md:block md:w-1/3">
                        {/* Sidebar content */}
                        <div className="bg-white p-4 shadow-lg rounded-lg">
                            <h2 className="text-lg font-medium mb-4">Order Summary</h2>

                            <div className="flex flex-col gap-2">
                                {products.map((item, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span>{item?.product?.name} x {item.quantity}</span>
                                        <span>₹{formatPrice(item?.price?.$numberDecimal * item.quantity)}</span>
                                    </div>
                                ))}

                                <hr className="my-2" />

                                <div className="flex justify-between">
                                    <span className="font-medium">Total</span>
                                    <span className="font-medium">₹ {formatPrice(totalPrice)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Payment;
