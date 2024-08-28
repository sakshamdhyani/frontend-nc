import React, { useEffect } from 'react';
import CartItem from './CartItem';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../redux/slices/cart';
import { addOrderProducts } from '../../redux/slices/order';


const OrderConfirm = () => {
    const navigate = useNavigate();

    const {totalPrice , products } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.userAuth)
    const dispatch = useDispatch();

    const continueHandler = () => {

        dispatch(addOrderProducts({products , totalPrice}));

        navigate('/process/payment')
    }
    
    useEffect(() => {
        dispatch(fetchCart())
    },[dispatch])

    return (
        <>

            <main className="w-full mt-20">
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
                    <div className="flex-1">

                        <Stepper activeStep={2}>

                            <div className="w-full bg-white">
                                {products.map((item, i) => (
                                    <CartItem key={i} item={item} inCart={true} />
                                ))}
                            </div>

                            <div className="flex justify-between items-center mt-4 bg-white px-6 py-3 rounded-b-sm">

                                <p className="text-sm">
                                    Order confirmation email will be sent to <span className="font-medium">{user?.email}</span>
                                </p>

                                {products?.length > 0 &&
                                    <button 
                                        onClick={continueHandler} 
                                        className="bg-[#ffd426] px-6 py-2 text-white font-medium rounded-sm shadow hover:shadow-lg uppercase"
                                    >
                                        Continue
                                    </button>
                                }

                            </div>

                        </Stepper>
                    </div>

                    <PriceSidebar totalPrice= {totalPrice} products = {products} />
                </div>
            </main>
        </>
    );
};

export default OrderConfirm;
