import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "./../apiConnector";
import toast from "react-hot-toast";
import { apiUrl } from "../apiUrl";


const initialState = {
    reviews: [],
    loading: false,
    error: null
};

const reviewsHandler = createSlice({

    name: "reviewsHandler",
    initialState,
    reducers: {

        // fetch all customers
        fetchReviewsStart: (state) => {
            state.loading = true;
        },
        fetchReviewsSuccess: (state, action) => {
            state.loading = false;
            state.reviews = action.payload.reviews;
        },
        fetchReviewsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // fetch all customers
        reviewHandleStart: (state) => {
            state.loading = true;
        },
        reviewHandleSuccess: (state, action) => {
            state.loading = false;
            state.reviews = action.payload.reviews;
        },
        reviewHandleFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },




    }
});


export const {

    fetchReviewsStart,
    fetchReviewsSuccess,
    fetchReviewsFail,
    reviewHandleStart,
    reviewHandleSuccess,
    reviewHandleFail,

} = reviewsHandler.actions;


export default reviewsHandler.reducer;







// all customers
export const fetchReviews = () => async (dispatch) => {

    dispatch(fetchReviewsStart());
    try {
        const response = await apiConnector("GET", apiUrl + "all-reviews");

        // console.log(response)

        dispatch(fetchReviewsSuccess(response?.data));
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchReviewsFail(error?.response?.data?.message));
    }
};



// single customer
export const deleteReview = (id) => async (dispatch) => {

    dispatch(reviewHandleStart());
    try {
        const response = await apiConnector("DELETE", apiUrl + `delete-review/${id}`);

        // console.log(response)

        dispatch(reviewHandleSuccess(response?.data));
        toast.success("Review Deleted Successfully.")
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(reviewHandleFail(error?.response?.data?.message));
    }
};




