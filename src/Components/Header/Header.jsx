import React, { useEffect, useRef, useState } from 'react';
import "./header.css";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import SearchComponent from '../Search Product/SearchComponent';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/userAuth';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import Sidebar from './Sidebar';
import toast from 'react-hot-toast';

const Header = () => {

    const [openNavbar, setOpenNavbar] = useState(false);
    const [searchPopup, setSearchPopup] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const {isAuth , accountType , user} = useSelector((state) => state.userAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const popupRef = useRef(null);

    const logoutHandler = () => {
        dispatch(logout(navigate));
    }

    const comingSoonHandler = () => {
        toast.success("Coming Soon");
    }

    useEffect(() => {
        if (openNavbar === true)
        {
            const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setOpenNavbar(false);
              }
            };
        
            if (openNavbar) {
              document.addEventListener('mousedown', handleClickOutside);
            } else {
              document.removeEventListener('mousedown', handleClickOutside);
            }
        
            return () => {
              document.removeEventListener('mousedown', handleClickOutside);
            };
        }
      }, [openNavbar]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navHeadings = ["Shop","Cart","Air Solutions","Power Plant","Inverter","Home Appliances","Support"];
    const navSubHeadings = [
        ["s1","s2","s3"],
        ["c1","c2","c3"],
        ["d1"],
        [],
        [],
        [],
        [],
    ];

    const [openNavHeading, setOpenNavHeading] = useState(true);
      
    function showHeading(idx) {
        navSubHeadings[idx].map((ele2, idx2) => {
            return (
                // <div>{ele2}</div>
                console.log("hello")
            );
        });
    }

    return (
        <div className={`headerBody ${isScrolled ? 'scrolled' : ''}`}>
            <div className='leftHeader'>
                <Link to="/" className='leftHeaderLogo'>
                    <img src="/logo.png" className='w-44 mt-2' alt="" />
                </Link>
                <div className='midHeader'>
                    {/* <button className='headerMainBtns headerShopBtn'>
                        <p className='midHeaderBtn'>Shop</p>
                        <div className='midHeaderShopHover'>
                            <div className='headerCategoriesBody'>
                                <div className='headerCategoryColumn'>
                                    <h1>Solar Air Conditioner</h1>
                                    <ul>
                                        <li> <Link to={"learn-more-product/66975026f38e015e99209b79"}> Solar AC 1.5 Ton (ES Model) </Link> </li>
                                        <li> <Link to={"/learn-more-product/669760abf38e015e99209f2a"}>Solar Hybrid AC 1.5 Ton (ODS)</Link> </li>
                                        <li> <Link to={"/learn-more-product/66976b88aa3ede2dbb64a7bf"}>Solar AC 1.5 Ton (BDS)</Link> </li>
                                        <li> <Link to={"/category/66962d0a1b31b864d189a936"}>More</Link> </li>
                                    </ul>
                                    <h1>BLDC Fan</h1>
                                    <ul>
                                        <li>
                                            <Link to={"/learn-more-product/66a0bfcf0955e3907fdb6290"}>
                                                BLDC Fan
                                            </Link>
                                        </li>
                                    </ul>
                                    <h1>Solar Power Plant</h1>
                                    <ul>
                                        <li onClick={comingSoonHandler}>Solar Power Plant</li>
                                    </ul>
                                </div>
                                <div className='headerCategoryColumn'>
                                    <h1>Solar Inverter</h1>
                                    <ul>
                                        <li onClick={comingSoonHandler}>Lithium Battery Inbuilt Solar Hybrid Inverter</li>
                                        <li onClick={comingSoonHandler}>Solar Hybrid Inverter (Ironman Series) zero Export</li>
                                    </ul>
                                    <h1>Hybrid Lithium Inverter</h1>
                                    <ul>
                                        <li onClick={comingSoonHandler}>Solar Hybrid Inverter (IronMan Series) with Export</li>
                                        <li onClick={comingSoonHandler}>Solar Hybrid Inverter (Ironman Series)</li>
                                    </ul>
                                </div>
                                <div className='headerCategoryColumn'>
                                    <h1>Solar Refrigerators And Deep Freezers</h1>
                                    <ul>
                                        <li onClick={comingSoonHandler}>12/24 Volt</li>
                                        <li onClick={comingSoonHandler}>With Solar Panel, Battery And Controllers</li>
                                    </ul>
                                </div>
                                <div className='headerCategoryColumn'>
                                    <h1>Solar Submersible</h1>
                                    <ul>
                                        <li onClick={comingSoonHandler}>Solar Submersible Pump And Controller</li>
                                        <li onClick={comingSoonHandler}>(VFD) Solar Panel, Structure Combo Set</li>
                                    </ul>
                                </div>
                                <div className='headerCategoryColumn'>
                                    <h1>Smart Tv</h1>
                                    <ul>
                                        <li onClick={comingSoonHandler}>Moseta Smart Tv</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </button> */}
                    <button className='headerMainBtns headerTvBtn'>
                        <Link to={"/category/66cc02c86736f377d92336cf"} className='midHeaderBtn'>Television</Link>
                    </button>
                    <button className='headerMainBtns headerPowerPlantBtn'>
                        <Link to={"/category/66cc07f56736f377d92336e3"} className='midHeaderBtn'>Computers</Link>
                    </button>
                    <button className='headerMainBtns headerInverterBtn'>
                        <Link to={"/category/66cc09a16736f377d9233714"} className='midHeaderBtn'>Mobile</Link>
                    </button>
                    <button className='headerMainBtns headerHomeAppliancesBtn'>
                        <Link to={"/category/66cc0ad76736f377d923373f"} className='midHeaderBtn'>Accessories</Link>
                    </button>
                    {/* <button className='headerMainBtns headerSupportBtn'>
                        <Link to={"/about-us"} className='midHeaderBtn'>About Us</Link>
                    </button> */}
                </div>
            </div>
            <div className='rightHeader'>
                <div className='rightHeaderIcon' onClick={() => setSearchPopup(!openNavbar)}><CiSearch /></div>
                <div className='rightHeaderIcon'>
                    {isAuth ? 
                        <div className='loggedInIcon'>
                            <div className='loggedInIconIcon'><FaRegUserCircle /></div>
                            <div className='hoverDiv'>
                                {accountType === "customer" 
                                    ? <Link to="/my-account">My account</Link>
                                    : <Link to="/admin/dashboard">Dashboard</Link>
                                }
                                <button onClick={logoutHandler}>Logout</button>
                            </div>
                        </div>
                        : 
                        <Link to="/Login"><CiUser /></Link>
                    }    
                </div>
                <div className='rightHeaderIcon rightHeaderCart'>
                    <Link to="/MyCart" className='cartIconContainer'><FiShoppingCart /></Link>
                </div>
                <div className="rightHeaderBurgerMenu">
                    <Sidebar/>
                </div>
            </div>
            <SearchComponent searchPopup={searchPopup} setSearchPopup={setSearchPopup} />
        </div>
    );
}

export default Header;
