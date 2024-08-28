import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "./../apiConnector";
import toast from "react-hot-toast";
import axios from "axios";
import { apiUrl } from "../apiUrl";

const initialState = {
    customers: [],
    customer: {},
    loading: false,
    error: null
};

const customerHandler = createSlice({

    name: "customerHandler",
    initialState,
    reducers: {

        // fetch all customers
        fetchCustomersStart: (state) => {
            state.loading = true;
        },
        fetchCustomersSuccess: (state, action) => {
            state.loading = false;
            state.customers = action.payload.customers;
        },
        fetchCustomersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // fetch all customers
        fetchCustomerStart: (state) => {
            state.loading = true;
        },
        fetchCustomerSuccess: (state, action) => {
            state.loading = false;
            state.customer = action.payload.customer;
        },
        fetchCustomerFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


    }
});


export const {

    fetchCustomersStart,
    fetchCustomersSuccess,
    fetchCustomersFail,
    fetchCustomerStart,
    fetchCustomerSuccess,
    fetchCustomerFail,

} = customerHandler.actions;


export default customerHandler.reducer;







// all customers
export const fetchCustomers = () => async (dispatch) => {

    dispatch(fetchCustomersStart());
    try {
        const response = await apiConnector("GET", apiUrl + "all-customers");

        // console.log(response)

        dispatch(fetchCustomersSuccess(response?.data));
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchCustomersFail(error?.response?.data?.message));
    }
};



// single customer
export const fetchCustomer = (id) => async (dispatch) => {

    dispatch(fetchCustomerStart());
    try {
        const response = await apiConnector("GET", apiUrl + `customer/${id}`);

        // console.log(response)

        dispatch(fetchCustomerSuccess(response?.data));
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchCustomerFail(error?.response?.data?.message));
    }
};




// block unblock account
export const blockUnblockCustomer = (customerId) => async (dispatch) => {

    dispatch(fetchCustomerStart());
    try {
        const response = await apiConnector("PUT", apiUrl + `block-unblock-customer` , {customerId});

        // console.log(response)

        dispatch(fetchCustomerSuccess(response?.data));
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchCustomerFail(error?.response?.data?.message));
    }
};





// delete customer
export const deleteCustomer = (id) => async (dispatch) => {

    dispatch(fetchCustomerStart());
    try {
        const response = await apiConnector("DELETE", apiUrl + `delete-customer/${id}`);

        // console.log(response)

        dispatch(fetchCustomerSuccess(response?.data));
        toast.success("Customer Deleted Successfully");
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchCustomerFail(error?.response?.data?.message));
    }
};