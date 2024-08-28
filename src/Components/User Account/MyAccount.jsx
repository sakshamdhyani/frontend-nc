import React from 'react'
import "./myAccount.css"
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaHandsHelping } from "react-icons/fa";
import { GiAutoRepair } from "react-icons/gi";


import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyAccount = () => {

    const {user} = useSelector((state) => state.userAuth)

  return (
    <div className='myAccountBody'>
        <div className='myAccountContainer'>

            <div className='myAccountContainerRow myAccountContainerRowLine'>
                <h1><FaUser /> <Link to="/editProfile">Profile</Link></h1>
                <h2>ID : {user?.email}  Name : {user?.firstName} {user?.lastName}</h2>
            </div>

            <div className='myAccountContainerRow myAccountContainerRowLine'>
                <h1><FaLocationDot /> <Link to="/address-book">Address Book</Link></h1>
                <h2>Manage your saved addresses for a smoother and faster checkout experience.</h2>
            </div>

            {/* my orders */}
            <div className='myAccountContainerRow myAccountContainerRowLine'>
                <h1><CiDeliveryTruck /> <Link to="/my-orders">My Orders</Link></h1>
            </div>

        </div>
    </div>
  )
}

export default MyAccount