import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import HomePage from './Components/Home Page/HomePage';
import Dashboard from './Components/Admin/Dashboard';
import MainData from './Components/Admin/MainData';
import OrderTable from './Components/Admin/OrderTable';
import UpdateOrder from './Components/Admin/UpdateOrder';
import NewProduct from './Components/Admin/NewProduct';
import ProductTable from './Components/Admin/ProductTable';
import UpdateProduct from './Components/Admin/UpdateProduct';
import UserTable from './Components/Admin/UserTable';
import UpdateUser from './Components/Admin/UpdateUser';
import ReviewsTable from './Components/Admin/ReviewsTable';
import ProductPage from './Components/Product Description/ProductPage';
import LoginPage from './Components/Login Page/LoginPage';
import RegistrationForm from './Components/Login Page/RegistrationForm';
import MyAccount from './Components/User Account/MyAccount';
import EditMyAccount from './Components/User Account/EditMyAccount';
import AddressBook from './Components/User Account/AddressBook';
import TrackYourComplaint from './Components/Track Your Complaint/TrackYourComplaint';
import TrackYourRepairRequest from './Components/Track Your Repair Request/TrackYourRepairRequest';
import ComplaintRegistration from './Components/Track Your Complaint/ComplaintRegistration';
import RequestRegistration from './Components/Track Your Repair Request/RequestRegistration';
import BuyProductPage from './Components/Product Page/BuyProductPage';
import FilterCategoryPage from './Components/Category Products/FilterCategoryPage';
import SearchPage from './Components/Search Product/Search Page/SearchPage';
import NewCategory from './Components/Admin/NewCategory';
import ComplaintsTable from './Components/Admin/ComplaintsTable';
import RepairRequestsTable from './Components/Admin/RepairRequestTable';
import PaymentHistory from './Components/Admin/PaymentHistory';
import PFYAddProduct from './Components/Admin/PFYAddProduct';
import "./App.css";
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/slices/userAuth';
import ProtectedRoute from './Components/ProtectedRoute';
import ContactUs from './Components/ContactUs/ContactUs';
import MyComplaints from './Components/MyComplaints/MyComplaints';
import MyRequests from './Components/MyRequests/MyRequests';
import MyOrders from './Components/MyOrders/MyOrders';
import MediaGallery from './Components/Media/MediaGallery';
import Cart from './Components/Cart/Cart';
import Shipping from './Components/Cart/Shipping';
import OrderConfirm from './Components/Cart/OrderConfirm';
import Payment from './Components/Cart/Payment';
import OrderSuccess from './Components/Cart/OrderSuccess';
import AdminLogin from './Components/Admin/Login/Login';
import UpdateRequest from './Components/Admin/UpdateRequest';
import UpdateComplaint from './Components/Admin/UpdateComplaint';
import UserDetailPopup from './Components/UserDetailPopup';
import HomeCarousel from './Components/Admin/HomeCarousel';
import AboutUs from './Components/ManagementCarousel/AboutUs';
// import PrivacyPolicy from './Components/Policy Pages/PrivacyPolicy';
import RefundReturns from './Components/Policy Pages/RefundReturns';
import ShippingRefundPolicy from './Components/Policy Pages/ShippingRefundPolicy';
import PopupInquiry from './Components/Admin/PopupInquiry';
import UpdateInquiry from './Components/Admin/UpdateInquiry';
import OrderFaliure from './Components/Cart/OrderFaliure';
import WhatsappIcon from './Components/WhatsappIcon/WhatsappIcon';
import NotFound from './Components/NotFound/NotFound';
import NewPasswordPage from './Components/New Password Page/NewPasswordPage';

// bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {

  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin');
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // loadUser
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className='relative'>

      {<Header />}
      
      <Routes>
        {/*------------------------------ CUSTOMER ROUTES --------------------------------------*/}
        <Route path="/" element={<HomePage />} />

        <Route path="/category/:id" element={<FilterCategoryPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/update-password" element={<NewPasswordPage />} />

        <Route path="/contact-us" element={<ContactUs />} />


        <Route path="/registration" element={<RegistrationForm />} />

        <Route path="/buy-product/:id" element={<BuyProductPage />} />

        <Route path="/search" element={<SearchPage />} />


        <Route path="/editProfile" element={<ProtectedRoute allowedRoles={['customer']}> <EditMyAccount /> </ProtectedRoute>} />

        <Route path="/my-account" element={<ProtectedRoute allowedRoles={['customer']}> <MyAccount /> </ProtectedRoute>} />
        
        <Route path="/my-orders" element={<ProtectedRoute allowedRoles={['customer']}> <MyOrders /> </ProtectedRoute>} />
        
        <Route path="/about-us" element={<AboutUs />}/>
        
        <Route path="/address-book" element={ <ProtectedRoute allowedRoles={['customer']}> <AddressBook /> </ProtectedRoute>} />

        {/* <Route path="/privacy-policy" element={ <PrivacyPolicy/> } /> */}
        <Route path="/refund-policy" element={ <RefundReturns/> } />
        <Route path="/shipping-refund-policy" element={ <ShippingRefundPolicy/> } />

        <Route path="/Mycart" element={ <Cart /> } />

        <Route path="/shipping" element={ <ProtectedRoute allowedRoles={['customer']}> <Shipping /> </ProtectedRoute>  } />

        <Route path="/order/confirm" element={ <ProtectedRoute allowedRoles={['customer']}> <OrderConfirm /> </ProtectedRoute>  } />

        <Route path="/process/payment" element={ <ProtectedRoute allowedRoles={['customer']}> <Payment /> </ProtectedRoute>  } />

        <Route path="/payment-success" element={ <ProtectedRoute allowedRoles={['customer']}>  <OrderSuccess />  </ProtectedRoute>   } />

        <Route path="/payment-failure" element={ <ProtectedRoute allowedRoles={['customer']}> <OrderFaliure /> </ProtectedRoute>  } />
        
        
        
        <Route path="*" element={ <NotFound/> } />




        {/*------------------------------ ADMIN ROUTES --------------------------------------*/}

        <Route path="/admin/dashboard/login" element={ <AdminLogin/> } />

        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={0}><MainData /></Dashboard></ProtectedRoute>} />
        
        <Route path="/admin/orders" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={1}><OrderTable /></Dashboard></ProtectedRoute>} />
        
        <Route path="/admin/order/:id" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={1}><UpdateOrder /></Dashboard></ProtectedRoute>} />
        
        <Route path="/admin/products" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={2}><ProductTable /></Dashboard></ProtectedRoute>} />
        
        <Route path="/admin/product/:id" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={2}><UpdateProduct /></Dashboard></ProtectedRoute>} />
        
        <Route path="/admin/new_category" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={3}><NewCategory /></Dashboard></ProtectedRoute>} />
        
        <Route path="/admin/new_product" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={4}><NewProduct /></Dashboard></ProtectedRoute>} />
        
        
        <Route path="/admin/customers" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={6}><UserTable /></Dashboard></ProtectedRoute>} />
        
        {/* <Route path="/admin/technicians" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={5}><TechnicianManagement /></Dashboard></ProtectedRoute>} /> */}
        
        <Route path="/admin/customer/:id" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={6}><UpdateUser /></Dashboard></ProtectedRoute>} />
        
        <Route path="/admin/pfy_add_product" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={7}><PFYAddProduct /></Dashboard></ProtectedRoute>} />
        
        <Route path="/admin/reviews" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={8}><ReviewsTable /></Dashboard></ProtectedRoute>} />
        
        <Route path="/admin/complaints" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={9}><ComplaintsTable /></Dashboard></ProtectedRoute>} />

        <Route path="/admin/complaint/:id" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={9}><UpdateComplaint /></Dashboard></ProtectedRoute>} />
        
        <Route path="/admin/requests" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={10}><RepairRequestsTable /></Dashboard></ProtectedRoute>} />

        <Route path="/admin/request/:id" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={10}><UpdateRequest /></Dashboard></ProtectedRoute>} />
        
        <Route path="/admin/payments" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={11}><PaymentHistory /></Dashboard></ProtectedRoute>} />
        
        <Route path="/admin/home-carousel" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={12}><HomeCarousel/></Dashboard></ProtectedRoute>} />
        
        <Route path="/admin/inquiries" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={13}><PopupInquiry/></Dashboard></ProtectedRoute>} />
        
        <Route path="/admin/inquiry/:id" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard activeTab={13}><UpdateInquiry/></Dashboard></ProtectedRoute>} />
      
      </Routes>

      <WhatsappIcon/>
      
      {!isDashboard && <Footer />}

      
    </div>
  );
}

export default App;
