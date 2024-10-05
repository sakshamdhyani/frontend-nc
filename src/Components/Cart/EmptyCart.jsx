import { Link } from 'react-router-dom';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import React from 'react';

const EmptyCart = () => {
    return (
        <div className="flex items-center flex-col gap-2 m-6">
            <div className="flex justify-center items-center">
                <ProductionQuantityLimitsIcon fontSize='large' />
            </div>
            <span className="text-lg">Your cart is empty!</span>
            <p className="text-xs">Add items to it now.</p>
            <Link to="/" className="bg-[#ffd426] text-sm text-white px-12 py-2 rounded-sm shadow mt-3">Shop Now</Link>
        </div>
    );
};

export default EmptyCart;
