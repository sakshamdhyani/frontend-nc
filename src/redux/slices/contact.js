import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "./../apiConnector";
import toast from "react-hot-toast";
import axios from 'axios';
import { apiUrl } from "../apiUrl";


const initialState = {
    categories : [],
    loading: false,
    error: null,
    data: {},
}


const contact = createSlice({

    name: "contact",
    initialState,
    reducers: {



    // Category
    fetchCategoriesStart: (state) => {
        state.loading = true
    },

    fetchCategoriesSuccess: (state,action) => {
        state.loading = false
        state.categories = action.payload
    },

    fetchCategoriesFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },


    // Register
    registerStart: (state) => {
        state.loading = true
    },

    registerSuccess: (state,action) => {
        state.loading = false
    },

    registerFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },



    // fetch data (this can be complaint or request)
    fetchDataStart: (state) => {
        state.loading = true
    },

    fetchDataSuccess: (state,action) => {
        state.loading = false,
        state.data = action.payload
    },

    fetchDataFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
        state.data = {}
    },

}
})

export const {

    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFail,
    registerStart,
    registerSuccess,
    registerFail,
    fetchDataStart,
    fetchDataSuccess,
    fetchDataFail,

} = contact.actions;

export default contact.reducer;







// Actions




// Home API 

// fetch categories
export const fetchAllCategories = () => async (dispatch) => {

    dispatch(fetchCategoriesStart());

    try{
        const response = await apiConnector("GET" , apiUrl + "fetch-categories");

        // console.log(response);

        dispatch(fetchCategoriesSuccess(response.data.categories));
    }
    catch(error){
        console.log(error);
        dispatch(fetchCategoriesFail());
    }

}




// register complaint
export const registerComplaint = (formData, setFormData) => async (dispatch) => {
  dispatch(registerStart());

  try {
    const formDataToSend = new FormData();

    // Append all fields from formData to formDataToSend
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });


    const response = await axios.post(apiUrl + "register-complaint", formDataToSend, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });


    dispatch(registerSuccess());
    toast.success(response?.data?.message);

    setFormData({
        serialNumber: '',
        category: '',
        subCategory: '',
        productId: '',
        nature: '',
        description: '',
        contactNumber: '',
        address: '',
        pincode: '',
        bill: null
    });
  } catch (error) {
    console.error('Error registering complaint:', error);
    toast.error(error?.response?.data?.message)
    dispatch(registerFail());
  }
};





// register request
export const registerRequest = (formData, setFormData) => async (dispatch) => {

    dispatch(registerStart());


    try{

        const response = await apiConnector("POST" , apiUrl + "register-request" , {formData});

        dispatch(registerSuccess());
        toast.success(response?.data?.message)

        setFormData({
            serialNumber: '',
            category: '',
            subCategory: '',
            productId: '',
            address: '',
            pincode: '',
            description: '',
            contactNumber: '',
        })

    }
    catch(error){
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(registerFail())
    }
      
};
  



// fetch single complaint
export const fetchSingleComplaint = (complaintId) => async (dispatch) => {

    dispatch(fetchDataStart());


    try{

        const response = await apiConnector("GET" , apiUrl + `fetch-complaint/${complaintId}`);

        // console.log(response);

        dispatch(fetchDataSuccess(response?.data?.complaint));


    }
    catch(error){
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchDataFail())
    }
      
};


// fetch single request
export const fetchSingleRequest = (requestId) => async (dispatch) => {

    dispatch(fetchDataStart());


    try{

        const response = await apiConnector("GET" , apiUrl + `fetch-request/${requestId}`);

        console.log(response);

        dispatch(fetchDataSuccess(response?.data?.request));


    }
    catch(error){
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchDataFail())
    }
      
};




// contact us
export const contactUs = (formData , setFormData) => async (dispatch) => {

    dispatch(registerStart());


    try{

        const response = await apiConnector("POST" , apiUrl + `contact-us` , {formData});

        console.log(response);

        dispatch(registerSuccess());
        toast.success(response?.data?.message);

        setFormData({
            name: '',
            contactNumber: '',
            email: '',
            subject: '',
            message: '',
        })
    }
    catch(error){
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(registerFail())
    }
      
};





// submit popup form
export const popupFormSubmit = (formData) => async (dispatch) => {

    dispatch(registerStart());


    try{

        const response = await apiConnector("POST" , apiUrl + `popup-form` , {formData});
        console.log("k")
        // console.log(response);

        dispatch(registerSuccess());

        toast.success(response?.data?.message || "Form Submitted");
    }
    catch(error){
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(registerFail())
    }
      
};
