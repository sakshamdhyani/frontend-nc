import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./slices/userAuth";
import dataFetch from "./slices/dataFetch";
import contact from "./slices/contact";
import cart from "./slices/cart";
import order from "./slices/order";
import reviewSlice from "./slices/reviewSlice";
import mainData from "./adminSlices/mainData";
import orderHandler from "./adminSlices/orderHandler";
import productHandler from "./adminSlices/productHandler";
import categoryHandler from "./adminSlices/categoryHandler";
import customerHandler from "./adminSlices/customerHandler";
import reviewHandler from "./adminSlices/reviewHandler";
import requestAndComplaint from "./adminSlices/requestAndComplaint";
import paymentHandler from "./adminSlices/paymentHandler";
import carouselHandler from "./adminSlices/carouselHandler";
import popupFormHandler from "./adminSlices/popupFormHandler";



export const store = configureStore({
    reducer:{

        // Customer
        userAuth: userAuth,
        dataFetch: dataFetch,
        contact: contact,
        cart: cart,
        order: order,
        review: reviewSlice,

        // Admin
        mainData: mainData,
        orderHandler: orderHandler,
        productHandler: productHandler,
        categoryHandler: categoryHandler,
        customerHandler: customerHandler,
        reviewHandler: reviewHandler,
        requestAndComplaint: requestAndComplaint,
        paymentHandler: paymentHandler,
        carouselHandler: carouselHandler,
        popupFormHandler: popupFormHandler
    }
});
