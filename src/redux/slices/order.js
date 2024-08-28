import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "../apiConnector";
import { apiUrl } from "../apiUrl";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    error: null,
    orderProducts: JSON.parse(localStorage.getItem('orderProducts')) || [],
    deliveryAddress: JSON.parse(localStorage.getItem('deliveryAddress')) || {},
    totalPrice: parseFloat(localStorage.getItem('totalPrice')) || 0, // Initialize totalPrice from localStorage
    transaction: {},
    orders: []
};

const order = createSlice({
    name: "order",
    initialState,
    reducers: {
        addDeliveryAddress: (state, action) => {
            state.deliveryAddress = action.payload;
            localStorage.setItem('deliveryAddress', JSON.stringify(action.payload));
        },
        addOrderProducts: (state, action) => {
            state.orderProducts = action.payload.products;
            state.totalPrice = action.payload.totalPrice;
            localStorage.setItem('orderProducts', JSON.stringify(action.payload.products));
            localStorage.setItem('totalPrice', action.payload.totalPrice.toString());
        },
        // fetch customer orders
        fetchOrdersStart: (state) => {
            state.loading = true;
        },
        fetchOrdersSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        fetchOrdersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        cashOnDeliveryStart: (state) => {
            state.loading = true;
        },
        cashOnDeliverySuccess: (state) => {
            state.loading = false;
            state.orderProducts = [];
            state.deliveryAddress = {};
            state.totalPrice = 0;
            localStorage.removeItem('orderProducts');
            localStorage.removeItem('deliveryAddress');
            localStorage.removeItem('totalPrice');
        },
        cashOnDeliveryFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    addDeliveryAddress,
    addOrderProducts,
    fetchOrdersStart,
    fetchOrdersSuccess,
    fetchOrdersFail,
    cashOnDeliveryStart,
    cashOnDeliverySuccess,
    cashOnDeliveryFail,
} = order.actions;

export default order.reducer;

export const fetchOrders = () => async (dispatch) => {
    dispatch(fetchOrdersStart());

    try {
        const response = await apiConnector("GET", apiUrl + "fetch-orders");
        dispatch(fetchOrdersSuccess(response?.data?.orders));
    } catch (error) {
        console.log(error);
        dispatch(fetchOrdersFail(error?.response?.data?.message));
    }
};

export const cashOnDelivery = ({ amount, items, deliveryAddress, navigate}) => async (dispatch) => {
    dispatch(cashOnDeliveryStart());

    try {
        const response = await apiConnector("POST", apiUrl + "order-cash-on-delivery", { amount, items, deliveryAddress });
        dispatch(cashOnDeliverySuccess());
        toast.success(response?.data?.message);
        navigate("/my-orders")
    } 
    catch (error) {
        // console.log(error);
        dispatch(cashOnDeliveryFail(error?.response?.data?.message));
    }
};
