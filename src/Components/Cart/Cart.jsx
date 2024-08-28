import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import PriceSidebar from './PriceSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../redux/slices/cart';

const Cart = () => {

    const dispatch = useDispatch();
    const {products , totalPrice} = useSelector((state) => state.cart);
    const {isAuth} = useSelector((state) => state.userAuth);


    useEffect(() => {
        if(isAuth){
            dispatch(fetchCart())
        }
    },[dispatch,isAuth])

    const navigate = useNavigate();


    const placeOrderHandler = () => {
        navigate('/shipping');
    };

    return (
        <>
            <main className="w-full mt-20">

                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
                    <div className="flex-1">
                        <div className="flex flex-col shadow bg-white">

                            <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b">My Cart ({products?.length})</span>

                            {products?.length === 0 ? (
                                <EmptyCart />
                            ) : (
                                products?.map((item , index) => (
                                    <CartItem key={index} item={item} inCart={true} />
                                ))
                            )}

                            {products?.length >= 1 &&
                                <div className="flex justify-end">
                                    <button onClick={placeOrderHandler} disabled={products.length < 1} className={`w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm ${products.length < 1 ? "bg-gray-800 cursor-not-allowed" : "bg-gray-800"}`}>PLACE ORDER</button>
                                </div>
                            }
                        </div>

                    </div>

                    <PriceSidebar totalPrice= {totalPrice} products = {products} />

                </div>

            </main>
        </>
    );
};

export default Cart;
