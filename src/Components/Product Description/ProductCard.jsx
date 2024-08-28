import React from 'react';
import "./productCard.css";
import { Link, useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cart';
import toast from 'react-hot-toast';


const ProductCard = ({ product }) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const qty = 1;
    const {isAuth} = useSelector((state) => state.userAuth)

    // Truncate string function to limit the number of characters displayed
    const truncateString = (str, num) => {
        if (!str) return '';
        return str.length <= num ? str : str.slice(0, num) + '...';
    };

    const handleAddToCart = async () => {

        if(!isAuth){
            toast.error("Please Login First.");
            navigate("/login")
            return
        }

        dispatch(addToCart(product?._id , qty));
    };

    return (
        <div className="card">
            <Link to={`/buy-product/${product?._id}`} className="image-container">
                <img src={product?.themeImage?.url} alt={product?.name || 'Product Image'} />
                <div className="price">₹ {product?.cuttedPrice?.$numberDecimal || 'N/A'}</div>
            </Link>

            <div className="content">
                <Link to={`/buy-product/${product?._id}`} className="brand">{truncateString(product?.name, 20)}</Link>
                <Link to={`/buy-product/${product?._id}`} className="product-name">{truncateString(product?.description, 50)}</Link>
                <div className="rating">
                    <Rating name="read-only" size='small' value={product?.ratings} readOnly />
                    {product?.rating || 'No Rating'}
                </div>
            </div>

            <div className="button-container">
                <Link to={`/buy-product/${product?._id}`} className="button">  Buy Now </Link>
                <button className="cart-button" onClick={handleAddToCart}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528.12 301.319l47.273-208A16 16 0,0,0,559.701 64H128.71l-4.653-20.241C120.548 26.459 104.015 16 85.312 16H16a16 16 0,0,0 0 32h69.312l64.004 278.489C146.755 353.581 128 382.907 128 416c0 39.701 32.299 72 72 72 39.701 0 72-32.299 72-72 0-1.688-.14-3.34-.283-5H304.28c-.141 1.66-.28 3.311-.28 5 0 39.701 32.299 72 72 72 39.701 0 72-32.299 72-72 0-33.093-18.755-62.419-45.316-79.511l-10.76-46.469H511.83c7.538 0 13.915-5.237 15.482-12.681zm-88.848-52.681H175.937L153.31 128h367.776l-40.812 176z"/></svg>
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
