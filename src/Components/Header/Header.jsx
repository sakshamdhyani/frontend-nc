import React, { useEffect, useRef, useState } from 'react';
import "./header.css";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/userAuth';
import { FaRegUserCircle } from "react-icons/fa";
import Sidebar from './Sidebar';
import toast from 'react-hot-toast';
import axios from 'axios'; // Axios for API calls
import { apiUrl } from '../../redux/apiUrl';

const Header = () => {
    const [openNavbar, setOpenNavbar] = useState(false);
    const [searchPopup, setSearchPopup] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { isAuth, accountType, user } = useSelector((state) => state.userAuth);
    const { categories } = useSelector((state) => state.dataFetch);
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
        if (openNavbar === true) {
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

    // API call for searching
    const fetchSearchResults = async (query) => {
        try {
            const response = await axios.get(`${apiUrl}products/search?query=${query}`); // Adjust the API endpoint as needed
            setSearchResults(response.data.products); // Assuming response contains an array of results
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value) {
            fetchSearchResults(value); // Fetch search results if query exists
        } else {
            setSearchResults([]); // Clear results if search term is empty
        }
    };

    // Logic to determine if more categories are available
    const hasMoreCategories = categories.length > 4;
    const visibleCategories = hasMoreCategories ? categories.slice(0, 4) : categories;
    const hiddenCategories = hasMoreCategories ? categories.slice(4) : [];

    return (
        <div>
            <div className={`headerBody ${isScrolled ? 'scrolled' : ''}`}>
                <div className='leftHeader'>
                    <Link to="/" className='leftHeaderLogo'>
                        NAND COMPUTERS
                    </Link>
                </div>
                <div className='rightHeader'>
                    <div className='rightHeaderIcon'>
                        <input 
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="searchInput"
                        />
                        {searchResults.length > 0 && (
                            <div className="searchResultsContainer">
                                {searchResults.map((result, index) => (
                                    <Link to={`/buy-product/${result?._id}`} key={index} className="searchResultItem">
                                        <img src={result?.themeImage?.url} alt="" />
                                        {result.name} {/* Adjust the result rendering as needed */}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
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
                        <Sidebar />
                    </div>
                </div>
            </div>

            <div className='categoriesContainer2'>
                {visibleCategories.map((category) => (
                    <Link key={category._id} to={`/category/${category._id}`}>
                        {category.name}
                    </Link>
                ))}
                {hasMoreCategories && (
                    <div className="moreCategories">
                        <span>More</span>
                        <div className="moreCategoriesDropdown">
                            {hiddenCategories.map((category) => (
                                <Link key={category._id} to={`/category/${category._id}`}>
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
