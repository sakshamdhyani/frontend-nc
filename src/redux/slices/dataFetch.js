import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "./../apiConnector";
import toast from "react-hot-toast";
import { apiUrl } from "../apiUrl";


const initialState = {
    heroCarousel : {},
    picksForYou : {},
    product: {},
    category : {},
    categories:[],
    requests: [],
    complaints: []
}


const dataFetch = createSlice({

    name: "dataFetch",
    initialState,
    reducers: {


    // Home Carousel
    homeCarouselStart: (state) => {
        state.loading = true
    },

    homeCarouselSuccess: (state,action) => {
        state.loading = false
        state.heroCarousel = action.payload.carousel
    },

    homeCarouselFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },

    // Deals
    dealsStart: (state) => {
        state.loading = true
    },

    dealsSuccess: (state,action) => {
        state.loading = false
        state.picksForYou = action.payload.deals
        state.categories = action.payload.categories
    },

    dealsFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },


    // Product
    productInfoStart: (state) => {
        state.loading = true
    },

    productInfoSuccess: (state,action) => {
        state.loading = false
        state.product = action.payload
    },

    productInfoFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },


    // Category
    categoryInfoStart: (state) => {
        state.loading = true
    },

    categoryInfoSuccess: (state,action) => {
        state.loading = false
        state.category = action.payload
    },

    categoryInfoFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
        state.category = {}
    },


    // Complaints
    fetchComplaintsStart: (state) => {
        state.loading = true
    },

    fetchComplaintsSuccess: (state,action) => {
        state.loading = false
        state.complaints = action.payload
    },

    fetchComplaintsFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },


    // Requests
    fetchRequestsStart: (state) => {
        state.loading = true
    },

    fetchRequestsSuccess: (state,action) => {
        state.loading = false
        state.requests = action.payload
    },

    fetchRequestsFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },


}
})

export const {

    homeCarouselStart,
    homeCarouselSuccess,
    homeCarouselFail,
    dealsStart,
    dealsSuccess,
    dealsFail,
    productInfoStart,
    productInfoSuccess,
    productInfoFail,
    categoryInfoStart,
    categoryInfoSuccess,
    categoryInfoFail,
    fetchComplaintsStart,
    fetchComplaintsSuccess,
    fetchComplaintsFail,
    fetchRequestsStart,
    fetchRequestsSuccess,
    fetchRequestsFail,

} = dataFetch.actions;

export default dataFetch.reducer;







// Actions






// Home API 

// fetch carousel
export const fetchHomeCarousel = () => async (dispatch) => {

    dispatch(homeCarouselStart());

    try{
        const response = await apiConnector("GET" , apiUrl + "fetch-hero-carousel");

        // console.log(response);

        dispatch(homeCarouselSuccess(response.data));
    }
    catch(error){
        console.log(error);
        dispatch(homeCarouselFail());
    }

}





// fetch deals
export const fetchDeals = () => async (dispatch) => {

    dispatch(dealsStart());

    try{
        const response = await apiConnector("GET" , apiUrl + "fetch-deals");

        // console.log(response);

        dispatch(dealsSuccess(response.data));
    }
    catch(error){
        console.log(error);
        dispatch(dealsFail());
    }

}





// fetch product details
export const productDetails = (productId) => async (dispatch) => {

    dispatch(productInfoStart());

    try{
        const response = await apiConnector("GET" , apiUrl + `fetch-product-info/${productId}`);

        // console.log(response);

        dispatch(productInfoSuccess(response.data.product));
    }
    catch(error){
        console.log(error);
        dispatch(productInfoFail(error?.response?.data?.message));
    }

}





// fetch product details
export const categoryDetails = (categoryId) => async (dispatch) => {

    dispatch(categoryInfoStart());

    try{
        const response = await apiConnector("GET" , apiUrl + `fetch-category-products/${categoryId}`);

        // console.log(response);

        dispatch(categoryInfoSuccess(response.data.category));
    }
    catch(error){
        console.log(error);
        dispatch(categoryInfoFail(error?.response?.data?.message));
    }

}







// fetch customer complaint 
export const fetchComplaints = (productId) => async (dispatch) => {

    dispatch(fetchComplaintsStart());

    try{
        const response = await apiConnector("GET" , apiUrl + `fetch-complaints`);

        // console.log(response);

        dispatch(fetchComplaintsSuccess(response.data.complaints));
    }
    catch(error){
        console.log(error);
        dispatch(fetchComplaintsFail(error?.response?.data?.message));
    }

}







// fetch customer requests 
export const fetchRequests = (productId) => async (dispatch) => {

    dispatch(fetchRequestsStart());

    try{
        const response = await apiConnector("GET" , apiUrl + `fetch-requests`);

        // console.log(response);

        dispatch(fetchRequestsSuccess(response.data.requests));
    }
    catch(error){
        console.log(error);
        dispatch(fetchRequestsFail(error?.response?.data?.message));
    }

}