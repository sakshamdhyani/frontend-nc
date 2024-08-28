import React from 'react';
import { useDispatch } from 'react-redux';
import { decreaseQuantity, deleteFromCart, increaseQuantity } from '../../redux/slices/cart';
import formatPrice from '../../utils/formatPrice';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleIncreaseQuantity = () => {
        dispatch(increaseQuantity(item?.product?._id));
    };

    const handleDecreaseQuantity = () => {

        if(item?.quantity <= 1) return
        
        dispatch(decreaseQuantity(item?.product?._id));
    };

    const handleRemoveCartItem = () => {
        dispatch(deleteFromCart(item?.product?._id))
    };

    return (
        <div className="flex flex-col gap-3 py-5 pl-2 sm:pl-6 border-b overflow-hidden">
            <div className="flex flex-col sm:flex-row gap-5 items-stretch w-full group">
                <div className="w-full sm:w-1/6 h-28 flex-shrink-0">
                    <img draggable="false" className="h-full w-full object-contain" src={item?.product?.themeImage?.url} alt={item?.product?.name} />
                </div>
                <div className="flex flex-col sm:gap-5 w-full pr-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start pr-5 gap-1 sm:gap-0">
                        <div className="flex flex-col gap-0.5 sm:w-3/5">
                            <p className="group-hover:text-primary-blue">
                                {item?.product?.name.length > 42 ? `${item?.product?.name.substring(0, 42)}...` : item?.product?.name}
                            </p>
                            <span className="text-sm text-gray-500">Seller: Moseta</span>
                        </div>
                        <div className="flex flex-col sm:gap-2">
                            <p className="text-sm">Delivery within 7 days</p>
                            <span className="text-xs text-gray-500">7 Days Replacement Policy</span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2 text-xl font-medium">
                        <span>₹ {formatPrice(item?.product ? item?.product?.cuttedPrice?.$numberDecimal : 0 * item?.quantity).toLocaleString()}</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-between pr-4 sm:pr-0 sm:justify-start sm:gap-6 ml-4">
                <div className="flex gap-1 items-center">
                    <span onClick={handleDecreaseQuantity} className="w-7 h-7 text-3xl font-light bg-gray-50 rounded-full border flex items-center justify-center cursor-pointer"><p>-</p></span>
                    <input className="w-11 border outline-none text-center rounded-sm py-0.5 text-gray-700 font-medium text-sm qtyInput" value={item?.quantity} disabled />
                    <span onClick={handleIncreaseQuantity} className="w-7 h-7 text-xl font-light bg-gray-50 rounded-full border flex items-center justify-center cursor-pointer">+</span>
                </div>
                <button onClick={handleRemoveCartItem} className="font-medium hover:text-red-600">REMOVE</button>
            </div>
        </div>
    );
};

export default CartItem;
