// SidebarData.js
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BoltIcon from '@mui/icons-material/Bolt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import HomeIcon from '@mui/icons-material/Home';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import InfoIcon from '@mui/icons-material/Info';

export const SidebarData = [
  {
    title: 'Shop',
    path: '#',
    icon: <ShoppingBagIcon />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Air Conditoners',
        path: '/category/66962d0a1b31b864d189a936',
        icon: <AcUnitIcon />
      },
      {
        title: 'Inverters',
        path: '/category/66966f4ff38e015e99209a6d',
        icon: <BoltIcon/>
      },
    ]
  },
  {
    title: 'Cart',
    path: '/MyCart',
    icon: <ShoppingCartIcon />,
  },
  {
    title: 'Air Solutions',
    path: '/category/66962d0a1b31b864d189a936',
    icon: <AcUnitIcon />
  },
  {
    title: 'Power Plant',
    path: '/category/6697c029aa3ede2dbb64da97',
    icon: <ElectricalServicesIcon/>
  },
  {
    title: 'Inverter',
    path: '/category/66966f4ff38e015e99209a6d',
    icon: <BoltIcon />,

  },
  {
    title: 'Home Appliances',
    path: '/category/66963bdb1b31b864d189a984',
    icon: <HomeIcon/>
  },
  {
    title: 'About Us',
    path: '/about-us',
    icon: <InfoIcon />
  },
  {
    title: 'Product Support',
    path: '#',
    icon: <SupportAgentIcon/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    
    subNav: [
        {
          title: 'Manuals',
          path: '/manuals',
          icon: <IoIcons.IoMdHelpCircle />,
          external: true
        },
        {
          title: 'WhatsApp',
          path: 'https://wa.me/+919810795046',
          icon: <WhatsAppIcon/>,
          external: true
        },
        {
          title: 'Contact Us',
          path: '/contact-us',
          icon: <ContactPageIcon />
        },
        {
          title: 'Register Complaint',
          path: '/complaint-registration',
          icon: <IoIcons.IoIosPaper />
        },
        {
          title: 'Register Request',
          path: '/repair-request',
          icon: <IoIcons.IoIosPaper />
        },

    ]
  }
];
