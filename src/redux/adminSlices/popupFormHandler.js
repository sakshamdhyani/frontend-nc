import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "./../apiConnector";
import toast from "react-hot-toast";
import { apiUrl } from "../apiUrl";

const initialState = {
    inquiries: [],
    inquiry: {},
    loading: false,
    error: null
};

const popupHandler = createSlice({
    name: "popupHandler",
    initialState,
    reducers: {
        fetchInquiriesStart: (state) => {
            state.loading = true;
        },
        fetchInquiriesSuccess: (state, action) => {
            state.loading = false;
            state.inquiries = action.payload.inquiries;
        },
        fetchInquiriesFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchInquiryStart: (state) => {
            state.loading = true;
        },
        fetchInquirySuccess: (state, action) => {
            state.loading = false;
            state.inquiry = action.payload.inquiry;
        },
        fetchInquiryFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        inquiryHandlerStart: (state) => {
            state.loading = true;
        },
        inquiryHandlerSuccess: (state, action) => {
            state.loading = false;
            state.inquiries = action.payload.inquiries;
        },
        inquiryHandlerFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addNewInquiry: (state, action) => {
            state.inquiries.push(action.payload);
        }
    }
});

export const {
    fetchInquiriesStart,
    fetchInquiriesSuccess,
    fetchInquiriesFail,
    fetchInquiryStart,
    fetchInquirySuccess,
    fetchInquiryFail,
    inquiryHandlerStart,
    inquiryHandlerSuccess,
    inquiryHandlerFail,
    addNewInquiry
} = popupHandler.actions;

export default popupHandler.reducer;





export const fetchInquiries = () => async (dispatch) => {
    dispatch(fetchInquiriesStart());
    try {
        const response = await apiConnector("GET", apiUrl + "all-inquiries");
        dispatch(fetchInquiriesSuccess(response?.data));
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchInquiriesFail(error?.response?.data?.message));
    }
};

export const fetchInquiry = (id) => async (dispatch) => {
    dispatch(fetchInquiryStart());
    try {
        const response = await apiConnector("GET", apiUrl + `inquiry/${id}`);
        dispatch(fetchInquirySuccess(response?.data));
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchInquiryFail(error?.response?.data?.message));
    }
};

export const updateInquiry = (updatedInquiry) => async (dispatch) => {
    dispatch(inquiryHandlerStart());
    try {
        const response = await apiConnector("PUT", apiUrl + `update-inquiry`, { updatedInquiry });
        dispatch(inquiryHandlerSuccess(response?.data));
        toast.success(response?.data?.message);
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(inquiryHandlerFail(error?.response?.data?.message));
    }
};

export const deleteInquiry = (id) => async (dispatch) => {
    dispatch(inquiryHandlerStart());
    try {
        const response = await apiConnector("DELETE", apiUrl + `delete-inquiry/${id}`);
        dispatch(inquiryHandlerSuccess(response?.data));
        toast.success(response?.data?.message);
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(inquiryHandlerFail(error?.response?.data?.message));
    }
};
