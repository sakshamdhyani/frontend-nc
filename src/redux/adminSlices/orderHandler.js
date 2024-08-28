import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "./../apiConnector";
import toast from "react-hot-toast";
import { apiUrl } from "../apiUrl";

const initialState = {
    orders: [],
    order: {}
};

const orderHandler = createSlice({

    name: "orderHandler",
    initialState,
    reducers: {

        // fetch all orders
        fetchOrdersStart: (state) => {
            state.loading = true;
        },
        fetchOrdersSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload.orders;
        },
        fetchOrdersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // fetch single order
        fetchSingleOrderStart: (state) => {
            state.loading = true;
        },
        fetchSingleOrderSuccess: (state, action) => {
            state.loading = false;
            state.order = action.payload.order;
        },
        fetchSingleOrderFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // fetch single order
        updateOrderStart: (state) => {
            state.loading = true;
        },
        updateOrderSuccess: (state, action) => {
            state.loading = false;
            state.order = action.payload.order;
        },
        updateOrderFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    }
});


export const {

    fetchOrdersStart,
    fetchOrdersSuccess,
    fetchOrdersFail,
    fetchSingleOrderStart,
    fetchSingleOrderSuccess,
    fetchSingleOrderFail,
    updateOrderStart,
    updateOrderSuccess,
    updateOrderFail,

} = orderHandler.actions;

export default orderHandler.reducer;







// all orders
export const fetchOrders = () => async (dispatch) => {

    dispatch(fetchOrdersStart());
    try {
        const response = await apiConnector("GET", apiUrl + "all-orders");

        // console.log(response)

        dispatch(fetchOrdersSuccess(response?.data));
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchOrdersFail(error?.response?.data?.message));
    }
};




// single order
export const orderDetails = (id) => async (dispatch) => {

    dispatch(fetchSingleOrderStart());
    try {
        const response = await apiConnector("GET", apiUrl + `order/${id}` );

        // console.log(response)

        dispatch(fetchSingleOrderSuccess(response?.data));
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchSingleOrderFail(error?.response?.data?.message));
    }
};




// update-order-status
export const updateOrderStatus = (orderId , status) => async (dispatch) => {

    dispatch(updateOrderStart());
    try {
        const response = await apiConnector("PUT", apiUrl + `update-order-status` , {orderId , status} );

        // console.log(response)

        dispatch(updateOrderSuccess(response?.data));
        toast.success("Order Updated Successfully");
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(updateOrderFail(error?.response?.data?.message));
    }
};