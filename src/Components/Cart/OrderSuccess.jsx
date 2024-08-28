import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [time, setTime] = useState(3);
    
    // useSelector should be called directly inside the component body
    const { orderProducts, totalPrice , deliveryAddress } = useSelector((state) => state.order);
  
  


    useEffect(() => {
      if (time === 0) {
        navigate("/my-orders");
      }
      const intervalId = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [time, navigate]);
  

    return (
      <>
  
        <main className="w-full h-[100vh] flex justify-center mt-20">
          <div className="flex flex-col gap-2 items-center justify-center sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow rounded p-6 pb-12">
            <h1 className="text-2xl font-semibold"> Transaction Successful </h1>
            <p className="mt-4 text-lg text-gray-800">Redirecting to Orders in {time} sec</p>
            <Link to={"/my-orders"} className="bg-[#54CE44] mt-2 py-2.5 px-6 text-white uppercase shadow hover:shadow-lg rounded-sm">Go to {"my orders"}</Link>
          </div>
        </main>
      </>
    );
  };
  
  export default OrderSuccess;
  