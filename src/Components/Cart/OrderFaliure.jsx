import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderFaliure = () => {
    const navigate = useNavigate();
    const [time, setTime] = useState(3);
    
    useEffect(() => {
      if (time === 0) {
        navigate("/process/payment");
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
            <h1 className="text-2xl text-red-500 font-semibold"> Transaction Failed </h1>
            <p className="mt-4 text-lg text-gray-800">Redirecting to Orders in {time} sec</p>
          </div>
        </main>
      </>
    );
  };
  
  export default OrderFaliure;
  