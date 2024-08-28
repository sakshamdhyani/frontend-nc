import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "./../apiConnector";
import toast from "react-hot-toast";
import axios from "axios";
import { apiUrl } from "../apiUrl";

const initialState = {
    carousel: {},
    loading: false,
    error: null
};

const carouselHandler = createSlice({

    name: "carouselHandler",
    initialState,
    reducers: {

        
        fetchHomeCarouselAdminStart: (state) => {
            state.loading = true;
        },
        fetchHomeCarouselAdminSuccess: (state, action) => {
            state.loading = false;
            state.carousel = action.payload.carousel;
        },
        fetchHomeCarouselAdminFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateHomeCarouselAdminStart: (state) => {
            state.loading = true;
        },
        updateHomeCarouselAdminSuccess: (state, action) => {
            state.loading = false;
            state.carousel = action.payload.carousel;
        },
        updateHomeCarouselAdminFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    }
});


export const {

    updateHomeCarouselAdminStart,
    updateHomeCarouselAdminSuccess,
    updateHomeCarouselAdminFail,
    fetchHomeCarouselAdminStart,
    fetchHomeCarouselAdminSuccess,
    fetchHomeCarouselAdminFail,
    
} = carouselHandler.actions;


export default carouselHandler.reducer;








// fetch carousel
export const fetchHomeCarouselAdmin = (carouselId , newImagesOrder) => async (dispatch) => {

    dispatch(fetchHomeCarouselAdminStart());
    try {
        const response = await apiConnector("GET", apiUrl + "fetch-hero-carousel");

        // console.log(response)

        dispatch(fetchHomeCarouselAdminSuccess(response?.data));
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchHomeCarouselAdminFail(error?.response?.data?.message));
    }
};



export const updateHomeCarouselAdmin = (carouselId , newImagesOrder) => async (dispatch) => {

    dispatch(updateHomeCarouselAdminStart());
    try {
        const response = await apiConnector("PUT", apiUrl + "update-carousel-order" , {carouselId , newImagesOrder});

        // console.log(response)

        dispatch(updateHomeCarouselAdminSuccess(response?.data));
        toast.success("Carousel Order Updated Successfully");
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(updateHomeCarouselAdminFail(error?.response?.data?.message));
    }
};







export const addNewImagesToCarousel = (carouselId , formData) => async (dispatch) => {
    dispatch(updateHomeCarouselAdminStart());


    try {
        const response = await axios.put(`${apiUrl}update-carousel/${carouselId}`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        dispatch(updateHomeCarouselAdminSuccess(response?.data));
        toast.success("Carousel Updated Successfully");
    } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(updateHomeCarouselAdminFail(error?.response?.data?.message));
    }
};
