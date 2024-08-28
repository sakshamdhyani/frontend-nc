import React, { useRef, useState, useEffect } from 'react';
import "./picksForYou.css";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import PFYBestDeals from './PFYBestDeals';
import PFYMostPopular from './PFYMostPopular';
import PFYNewest from './PFYNewest';
import { useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';

const PicksForYou = () => {
    const { picksForYou, loading } = useSelector((state) => state.dataFetch);
    const elementRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);

    const handleHorizantalScroll = (element, speed, distance, step) => {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            element.scrollLeft += step;
            scrollAmount += Math.abs(step);
            if (scrollAmount >= distance) {
                clearInterval(slideTimer);
            }
            checkScrollButtons();
        }, speed);
    };

    const checkScrollButtons = () => {
        if (elementRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = elementRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
            setIsOverflowing(scrollWidth > clientWidth);
        }
    };

    useEffect(() => {
        checkScrollButtons();
        window.addEventListener('resize', checkScrollButtons);
        return () => window.removeEventListener('resize', checkScrollButtons);
    }, []);

    const [productIdx, setProductIdx] = useState(0);

    const ShowComponent = ({ productIdx }) => {
        const products = productIdx === 0 ? picksForYou?.bestDeal : productIdx === 1 ? picksForYou?.mostPopular : picksForYou?.newest;

        if (!products || products.length === 0) {
            return <div className="no-products-message">No product available yet!</div>;
        }

        switch (productIdx) {
            case 0: return <PFYBestDeals products={products} />;
            case 1: return <PFYMostPopular products={products} />;
            case 2: return <PFYNewest products={products} />;
            default: break;
        }
    };

    return (
        <div className='picksForYouBody'>
            <div className='picksForYouHeading'>
                {/* <p className='homePageTitles'>PICKS FOR YOU:</p> */}
            </div>

            <div className='picksForYouCategories'>
                <p className={productIdx === 0 ? "selectedProductCategory" : "unSelectedProductCategory"} onClick={() => setProductIdx(0)}>Best Deals</p>
                <p className={productIdx === 1 ? "selectedProductCategory" : "unSelectedProductCategory"} onClick={() => setProductIdx(1)}>Most Popular</p>
                <p className={productIdx === 2 ? "selectedProductCategory" : "unSelectedProductCategory"} onClick={() => setProductIdx(2)}>Newest</p>
            </div>

            <div className='picksForYouProductsBody' ref={elementRef} onScroll={checkScrollButtons}>
                {
                    loading ?
                        <div className='w-full flex justify-center items-center'>
                            <Loader />
                        </div>
                        :
                        <ShowComponent productIdx={productIdx} />
                }
            </div>
            
            {isOverflowing && (
                <div className='picksForYouSwiperBtns'>
                    <p
                        onClick={() => {
                            handleHorizantalScroll(elementRef.current, 25, 100, -331);
                        }}
                        className={`picksForYouArrow ${canScrollLeft ? 'picksForYouArrowVisible' : 'picksForYouArrowHidden'}`}
                    >
                        <GoChevronLeft />
                    </p>
                    <p
                        onClick={() => {
                            handleHorizantalScroll(elementRef.current, 25, 100, 331);
                        }}
                        className={`picksForYouArrow ${canScrollRight ? 'picksForYouArrowVisible' : 'picksForYouArrowHidden'}`}
                    >
                        <GoChevronRight />
                    </p>
                </div>
            )}
        </div>
    );
};

export default PicksForYou;
