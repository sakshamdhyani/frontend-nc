import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "./../apiConnector";
import toast from "react-hot-toast";
import axios from "axios";
import { apiUrl } from "../apiUrl";

const initialState = {
    payments: [],
};

const paymentHandler = createSlice({

    name: "paymentHandler",
    initialState,
    reducers: {

        // fetch all payments
        fetchPaymentsStart: (state) => {
            state.loading = true;
        },
        fetchPaymentsSuccess: (state, action) => {
            state.loading = false;
            state.payments = action.payload.payments;
        },
        fetchPaymentsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


    }
});


export const {


    fetchPaymentsStart,
    fetchPaymentsSuccess,
    fetchPaymentsFail,

} = paymentHandler.actions;


export default paymentHandler.reducer;







// all products
export const fetchPayments = () => async (dispatch) => {

    dispatch(fetchPaymentsStart());
    try {
        const response = await apiConnector("GET", apiUrl + "all-payments");

        // console.log(response)

        dispatch(fetchPaymentsSuccess(response?.data));
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchPaymentsFail(error?.response?.data?.message));
    }
};


