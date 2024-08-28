import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "./../apiConnector";
import toast from "react-hot-toast";
import { apiUrl } from "../apiUrl";


const initialState = {
    requests: [],
    complaints: [],
    request: {},
    complaint:{},
    loading: false,
    error: null
};

const repairAndComplaint = createSlice({

    name: "repairAndComplaint",
    initialState,
    reducers: {

        // fetch all requests
        fetchRequestsStart: (state) => {
            state.loading = true;
        },
        fetchRequestsSuccess: (state, action) => {
            state.loading = false;
            state.requests = action.payload.requests;
        },
        fetchRequestsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // fetch single request
        fetchRequestStart: (state) => {
            state.loading = true;
        },
        fetchRequestSuccess: (state, action) => {
            state.loading = false;
            state.request = action.payload.request;
        },
        fetchRequestFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // handle request
        requestHandleStart: (state) => {
            state.loading = true;
        },
        requestHandleSuccess: (state, action) => {
            state.loading = false;
            state.requests = action.payload.requests;
        },
        requestHandleFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // ----------------------------------------------------------------------------


        // fetch all complaints
        fetchComplaintsStart: (state) => {
            state.loading = true;
        },
        fetchComplaintsSuccess: (state, action) => {
            state.loading = false;
            state.complaints = action.payload.complaints;
        },
        fetchComplaintsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // fetch single complaint
        fetchComplaintStart: (state) => {
            state.loading = true;
        },
        fetchComplaintSuccess: (state, action) => {
            state.loading = false;
            state.complaint = action.payload.complaint;
        },
        fetchComplaintFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // handle compalint
        complaintHandleStart: (state) => {
            state.loading = true;
        },
        complaintHandleSuccess: (state, action) => {
            state.loading = false;
            state.complaints = action.payload.complaints;
        },
        complaintHandleFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },




    }
});


export const {


    fetchRequestsStart,
    fetchRequestsSuccess,
    fetchRequestsFail,
    fetchRequestStart,
    fetchRequestSuccess,
    fetchRequestFail,
    requestHandleStart,
    requestHandleSuccess,
    requestHandleFail,
    fetchComplaintsStart,
    fetchComplaintsSuccess,
    fetchComplaintsFail,
    fetchComplaintStart,
    fetchComplaintSuccess,
    fetchComplaintFail,
    complaintHandleStart,
    complaintHandleSuccess,
    complaintHandleFail,


} = repairAndComplaint.actions;


export default repairAndComplaint.reducer;







// all requests
export const fetchRepairRequests = () => async (dispatch) => {

    dispatch(fetchRequestsStart());
    try {
        const response = await apiConnector("GET", apiUrl + "all-requests");

        // console.log(response)

        dispatch(fetchRequestsSuccess(response?.data));
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchRequestsFail(error?.response?.data?.message));
    }
};



// single request
export const fetchSingleRepairRequest = (id) => async (dispatch) => {

    dispatch(fetchRequestStart());
    try {
        const response = await apiConnector("GET", apiUrl + `request/${id}`);

        // console.log(response)

        dispatch(fetchRequestSuccess(response?.data));
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchRequestFail(error?.response?.data?.message));
    }
};




// update request
export const updateRepairRequest = (id , status) => async (dispatch) => {

    dispatch(requestHandleStart());
    try {
        const response = await apiConnector("PUT", apiUrl + `update-request` , {id , status});

        // console.log(response)

        dispatch(requestHandleSuccess(response?.data));
        toast.success("Request Updated Successfully")
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(requestHandleFail(error?.response?.data?.message));
    }
};




// delete request
export const deleteRepairRequest = (id) => async (dispatch) => {

    dispatch(requestHandleStart());
    try {
        const response = await apiConnector("DELETE", apiUrl + `delete-request/${id}`);

        // console.log(response)

        dispatch(requestHandleSuccess(response?.data));
        toast.success("Request Deleted Successfully")
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(requestHandleFail(error?.response?.data?.message));
    }
};





// -----------------------------------------------------------------------------------------


// all complaints
export const fetchComplaintsAdmin = () => async (dispatch) => {

    dispatch(fetchComplaintsStart());
    try {
        const response = await apiConnector("GET", apiUrl + "all-complaints");

        // console.log(response)

        dispatch(fetchComplaintsSuccess(response?.data));
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchComplaintsFail(error?.response?.data?.message));
    }
};



// single complaint
export const fetchSingleComplaintAdmin = (id) => async (dispatch) => {

    dispatch(fetchComplaintStart());
    try {
        const response = await apiConnector("GET", apiUrl + `complaint/${id}`);

        // console.log(response)

        dispatch(fetchComplaintSuccess(response?.data));
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchComplaintFail(error?.response?.data?.message));
    }
};




// update complaint
export const updateComplaintAdmin= (id , status , comment) => async (dispatch) => {

    dispatch(complaintHandleStart());
    try {
        const response = await apiConnector("PUT", apiUrl + `update-complaint` , {id , status , comment});

        // console.log(response)

        dispatch(complaintHandleSuccess(response?.data));
        toast.success("Complaint Updated Successfully")
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(complaintHandleFail(error?.response?.data?.message));
    }
};





// delete complaint
export const deleteComplaintAdmin = (id) => async (dispatch) => {

    dispatch(complaintHandleStart());
    try {
        const response = await apiConnector("DELETE", apiUrl + `delete-complaint/${id}`);

        // console.log(response)

        dispatch(complaintHandleSuccess(response?.data));
        toast.success("Complaint Deleted Successfully")
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(complaintHandleFail(error?.response?.data?.message));
    }
};