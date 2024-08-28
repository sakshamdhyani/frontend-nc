import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "./../apiConnector";
import toast from "react-hot-toast";
import { apiUrl } from "../apiUrl";

const initialState = {
    products: [],
    totalPrice: 0,
    loading: false,
    productLoading: false,
    error: null
};

const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {

        // fetch cart
        fetchCartStart: (state) => {
            state.loading = true;
        },
        fetchCartSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload.cart.items;
            state.totalPrice = action.payload.totalPrice;
        },
        fetchCartFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.totalPrice = 0;
            state.products = [];
        },

        // increase quantity 
        increaseQuantityStart: (state) => {
            state.productLoading = true;
        },
        increaseQuantitySuccess: (state, action) => {
            state.productLoading = false;
            state.products = action.payload.items; // Ensure items is correctly updated
            state.totalPrice = action.payload.totalPrice;
        },
        increaseQuantityFail: (state, action) => {
            state.productLoading = false;
            state.error = action.payload;
        },



        // decrease quantity
        decreaseQuantityStart: (state) => {
            state.productLoading = true;
        },
        decreaseQuantitySuccess: (state, action) => {
            state.productLoading = false;
            state.products = action.payload.items; // Ensure items is correctly updated
            state.totalPrice = action.payload.totalPrice;
        },
        decreaseQuantityFail: (state, action) => {
            state.productLoading = false;
            state.error = action.payload;
        },


        // add to cart
        addToCartStart: (state) => {
            state.loading = true;
        },
        addToCartSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload.items; // Ensure items is correctly updated
            state.totalPrice = action.payload.totalPrice;
        },
        addToCartFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // delete product from cart
        deleteProductStart: (state) => {
            state.loading = true;
        },
        deleteProductSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload.items; // Ensure items is correctly updated
            state.totalPrice = action.payload.totalPrice.$numberDecimal;
        },
        deleteProductFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});


export const {

    fetchCartStart,
    fetchCartSuccess,
    fetchCartFail,
    increaseQuantityStart,
    increaseQuantitySuccess,
    increaseQuantityFail,
    decreaseQuantityStart,
    decreaseQuantitySuccess,
    decreaseQuantityFail,
    addToCartStart,
    addToCartSuccess,
    addToCartFail,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFail

} = cart.actions;

export default cart.reducer;


// Thunks
export const fetchCart = () => async (dispatch) => {
    dispatch(fetchCartStart());
    try {
        const response = await apiConnector("GET", apiUrl + "fetch-customer-cart");

        // console.log(response)

        dispatch(fetchCartSuccess(response?.data));
    } 
    catch (error) {
        console.log(error)
        // toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchCartFail(error?.response?.data?.message));
    }
};



// increase quantity
export const increaseQuantity = (productId) => async (dispatch) => {
    dispatch(increaseQuantityStart());
    try {
        const response = await apiConnector("PUT", apiUrl + "increase-qty", { productId });
        dispatch(increaseQuantitySuccess(response.data));
    } catch (error) {
        toast.error(error.response.data.message || "Something went wrong.");
        dispatch(increaseQuantityFail(error.response.data.message));
    }
};



// decrease quantity
export const decreaseQuantity = (productId) => async (dispatch) => {
    dispatch(decreaseQuantityStart());
    try {
        const response = await apiConnector("PUT", apiUrl + "decrease-qty", { productId });
        dispatch(decreaseQuantitySuccess(response.data));
    } catch (error) {
        toast.error(error.response.data.message || "Something went wrong.");
        dispatch(decreaseQuantityFail(error.response.data.message));
    }
};



// add to cart
export const addToCart = (productId , quantity) => async (dispatch) => {

    dispatch(addToCartStart());
    try {
        const response = await apiConnector("POST", apiUrl + "add-to-cart", { productId , quantity});
        dispatch(addToCartSuccess(response.data));
        toast.success(response?.data?.message);
    } catch (error) {
        toast.error(error.response.data.message || "Something went wrong.");
        dispatch(addToCartFail(error.response.data.message));
    }

};






// delete to cart
export const deleteFromCart = (productId) => async (dispatch) => {

    dispatch(deleteProductStart());
    try {
        const response = await apiConnector("DELETE", apiUrl + "delete-from-cart", { productId });
        dispatch(deleteProductSuccess(response.data?.cart));
        toast.success(response?.data?.message);
    } catch (error) {
        toast.error(error.response.data.message || "Something went wrong.");
        dispatch(deleteProductFail(error.response.data.message));
    }

};