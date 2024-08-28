import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import InfoIcon from '@mui/icons-material/Info';
import ReviewsIcon from '@mui/icons-material/Reviews';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import './Sidebar.css';
import { useSnackbar } from 'notistack';
import { PiStackMinusFill } from "react-icons/pi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { useSelector } from 'react-redux';

const navMenu = [
    {
        icon: <EqualizerIcon />,
        label: "Dashboard",
        ref: "/admin/dashboard",
    },
    {
        icon: <AddPhotoAlternateIcon />,
        label: "Home Carousel",
        ref: "/admin/home-carousel",
    },
    {
        icon: <ShoppingBagIcon />,
        label: "Orders",
        ref: "/admin/orders",
    },
    {
        icon: <InventoryIcon />,
        label: "Products",
        ref: "/admin/products",
    },
    {
        icon: <AddBoxIcon />,
        label: "Add Category",
        ref: "/admin/new_category",
    },
    {
        icon: <AddBoxIcon />,
        label: "Add Product",
        ref: "/admin/new_product",
    },
    {
        icon: <GroupIcon />,
        label: "Customers",
        ref: "/admin/customers",
    },
    {
        icon: <GroupIcon />,
        label: "Picks For You",
        ref: "/admin/pfy_add_product",
    },
    {
        icon: <InfoIcon />,
        label: "Popup Form Inquiries",
        ref: "/admin/inquiries",
    },
    {
        icon: <ReviewsIcon />,
        label: "Reviews",
        ref: "/admin/reviews",
    },
    {
        icon: <PiStackMinusFill />,
        label: "Requests",
        ref: "/admin/requests",
    },
    {
        icon: <PiStackMinusFill />,
        label: "Complaints",
        ref: "/admin/complaints",
    },
    {
        icon: <RiMoneyRupeeCircleFill />,
        label: "Payments",
        ref: "/admin/payments",
    },
    {
        icon: <LogoutIcon />,
        label: "Logout",
    },
];

const Sidebar = ({ setToggleSidebar }) => {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();
    
    const {user} = useSelector((state) => state.userAuth)

    const handleLogout = () => {
        // Simulate a logout action
        enqueueSnackbar("Logout Successfully", { variant: "success" });
        navigate("/");
    };

    return (
        <aside className="sidebar z-10 sm:z-0 block min-h-screen fixed left-0 top-20 pb-14 max-h-screen w-3/4 sm:w-1/5 bg-gray-800 text-white overflow-x-hidden border-r">
            <div className="flex items-center gap-3 w-fit bg-gray-700 p-2 rounded-lg shadow-lg my-4 mx-3.5">
                <Avatar
                    alt="Avatar"
                    src="./vite.svg"
                />
                <div className="flex flex-col gap-0">
                    <span className="font-medium text-lg">{user?.firstName}</span>
                    <span className="text-gray-300 text-xs">{user?.email}</span>
                </div>
                
                <button onClick={() => setToggleSidebar(false)} className="sm:hidden bg-gray-800 ml-auto rounded-full w-10 h-10 flex items-center justify-center">
                    <CloseIcon />
                </button>
            </div>

            <div className="flex flex-col w-full gap-0 my-8">
                {navMenu.map((item, index) => {
                    const { icon, label, ref } = item;
                    const isActive = location.pathname === ref;
                    return (
                        <div key={index}>
                            {label === "Logout" ? (
                                <button key={index} onClick={handleLogout} className="hover:bg-gray-700 flex gap-3 items-center py-3 px-4 font-medium">
                                    <span>{icon}</span>
                                    <span>{label}</span>
                                </button>
                            ) : (
                                <Link key={index} to={ref} className={`${isActive ? "bg-gray-700" : "hover:bg-gray-700"} flex gap-3 items-center py-3 px-4 font-medium`}>
                                    <span>{icon}</span>
                                    <span>{label}</span>
                                </Link>
                            )}
                        </div>
                    )
                })}
            </div>

        </aside>
    );
};

export default Sidebar;
