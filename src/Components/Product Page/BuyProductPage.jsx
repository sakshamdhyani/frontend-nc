import React, { useEffect, useState } from 'react';
import "./buyProductPage.css";
import { GrSubtract } from 'react-icons/gr';
import { GoPlus } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productDetails } from '../../redux/slices/dataFetch.js';
import ProductReviews from '../Product Description/ProductReviews.jsx';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { addToCart } from '../../redux/slices/cart.js';
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import Loader from "../../Components/Loader/Loader"
import formatPrice from '../../utils/formatPrice.js';
import MetaData from '../Layouts/MetaData.jsx';
import ProductSpecs from '../Product Description/ProductSpecs.jsx';


const BuyProductPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const { product, loading } = useSelector((state) => state.dataFetch);
    const { isAuth } = useSelector((state) => state.userAuth);
    const { loading: addtoCartLoading } = useSelector((state) => state.cart);

    const [slideImages, setSlideImages] = useState([]);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        dispatch(productDetails(params.id));
    }, [dispatch, params.id]);

    useEffect(() => {
        if (product) {
            if (product.otherImages && product.otherImages.length > 0) {
                const imagesArray = product.otherImages.map(image => image.url);
                setSlideImages(imagesArray);
            } else if (product.themeImage) {
                setSlideImages([product.themeImage.url]);
            }
        }
    }, [product]);

    const handleIncreaseQty = () => {
        setQty(qty + 1);
    };

    const handleDecreaseQty = () => {
        if (qty <= 1) return;
        setQty(qty - 1);
    };

    const handleAddToCart = async () => {

        if(!isAuth){
            toast.error("Please Login First.");
            navigate("/login")
            return
        }

        dispatch(addToCart(product._id , qty));
    };

    return (
        <>
            <MetaData title={`${product.name} - Buy Online`} description={`Buy ${product.name} online at competitive prices. Explore key features and reviews.`} />


            <div className='buyProductPageBody'>
                <div className='buyProductPageMainContainer'>
                    <div className='buyProductPageMainContainerLeft'>
                        <Carousel showArrows={true} showThumbs={false}>
                            {slideImages.map((image, index) => (
                                <div key={index}>
                                    <img src={image} alt={`slide-${index}`} />
                                </div>
                            ))}
                        </Carousel>
                    </div>

                    <div className='buyProductPageMainContainerRight'>
                        <div className='buyProductPageMainContainerHeading'>
                            <h1>{product?.name}</h1>
                        </div>
                        <div className='buyProductPageMainContainerKeyFeatures'>
                            <h1>Key Features</h1>
                            <ul className='ml-10'>
                                {product?.highlights?.map((ele, idx) => (
                                    <li key={idx} className='list-disc'>{ele}</li>
                                ))}
                            </ul>
                        </div>

                        <div className='buyProductPageMainContainerOrderTotal'>
                            <div className='buyProductPageMainContainerOrderTotalRow'>

                                <h1>Order Total</h1>

                                <div className='priceContainer'>
                                    <p className='price'> ₹ {formatPrice(product?.price?.$numberDecimal)} </p>

                                    <p className='cuttedPrice'> ₹ {formatPrice(product?.cuttedPrice?.$numberDecimal)} </p>
                                </div>

                            </div>

                            <div className='buyProductPageMainContainerMrpRow'>
                                <div>
                                    <h1>MRP (Inclusive {product?.gst?.$numberDecimal}% tax) </h1>
                                    <p> ₹ {formatPrice(product?.cuttedPrice?.$numberDecimal)}</p>
                                </div>
                            </div>

                            <div className='buyProductPageMainContainerOrderQntyRow'>

                                <div className='buyProductPageMainContainerQuantity'>

                                    <p className='userCartAddedProductRowQntySub' onClick={handleDecreaseQty}><GrSubtract /></p>
                                    <p className='userCartAddedProductRowQnty'>{qty}</p>
                                    <p className='userCartAddedProductRowQntyAdd' onClick={handleIncreaseQty}><GoPlus /></p>
                                
                                </div>
                                
                            </div>

                            <div className='buyProductPageMainContainerOrderBtns'>
                                <button className='buyProductPageMainContainerOrderAdd' onClick={handleAddToCart}>Add To Cart  {addtoCartLoading ? <Loader/> : null } </button>
                            </div>
                        </div>
                    </div>
                </div>


                <ProductSpecs product={product} />
                <ProductReviews product={product} />    
            
            </div>


        </>
    );
};

export default BuyProductPage;
