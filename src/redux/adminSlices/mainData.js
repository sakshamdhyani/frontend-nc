import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "./../apiConnector";
import toast from "react-hot-toast";
import { apiUrl } from "../apiUrl";

const initialState = {
    products: [],
    orders: [],
    customers: [],
    loading: false,
    error: null
};

const mainData = createSlice({

    name: "mainData",
    initialState,
    reducers: {

        // fetch cart
        fetchMainDataStart: (state) => {
            state.loading = true;
        },
        fetchMainDataSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload.products,
            state.orders = action.payload.orders,
            state.customers = action.payload.customers
        },
        fetchMainDataFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    }
});


export const {

    fetchMainDataStart,
    fetchMainDataSuccess,
    fetchMainDataFail,

} = mainData.actions;

export default mainData.reducer;







// Thunks
export const fetchMainData = () => async (dispatch) => {

    dispatch(fetchMainDataStart());
    try {
        const response = await apiConnector("GET", apiUrl + "dashboard-data");

        // console.log(response)

        dispatch(fetchMainDataSuccess(response?.data));
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchMainDataFail(error?.response?.data?.message));
    }
};


