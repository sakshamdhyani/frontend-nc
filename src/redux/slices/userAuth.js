import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "./../apiConnector";
import toast from "react-hot-toast";
import { apiUrl } from "../apiUrl";


const initialState = {
    user: {},
    loading: false,
    error: null,
    isAuth: false,
    accountType: null,
}


const userAuth = createSlice({

    name: "userAuth",
    initialState,
    reducers: {


    // Login
    loginStart: (state) => {
        state.loading = true
    },

    loginSuccess: (state,action) => {
        state.loading = false,
        state.user = action.payload,
        state.isAuth = true,
        state.accountType = action.payload.role   
    },

    loginFail: (state,action) => {
        state.loading = false,
        state.error = action.payload,
        state.isAuth = false    
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

    // Register
    otpStart: (state) => {
        state.loading = true
    },

    otpSuccess: (state,action) => {
        state.loading = false
    },

    otpFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },



    // Load user
    loadUserStart: (state) => {
        state.loading = true
    },

    loadUserSuccess: (state,action) => {
        state.loading = false,
        state.user = action.payload
        state.isAuth = true,
        state.accountType = action.payload.role    
    },

    loadUserFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
        state.isAuth = false
    },

    

    // Logout
    logoutStart: (state) => {
        state.loading = true    
    },

    logoutSuccess: (state) => {
        state.loading = false,
        state.user = null,
        state.isAuth = false
        state.accountType = null    
    },

    logoutFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },
    

    // Update Profile
    updateProfileStart: (state) => {
        state.loading = true    
    },

    updateProfileSuccess: (state , action) => {
        state.loading = false
        state.user = action.payload
    },

    updateProfileFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },


    // Address
    addressStart: (state) => {
        state.loading = true    
    },

    addressSuccess: (state , action) => {
        state.loading = false
    },

    addressFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },



    }
})

export const {

    loginStart,
    loginSuccess,
    loginFail,
    loadUserStart,
    loadUserSuccess,
    loadUserFail,
    logoutStart,
    logoutSuccess,
    logoutFail,
    registerStart,
    registerSuccess,
    registerFail,
    otpStart,
    otpSuccess,
    otpFail,
    updateProfileStart,
    updateProfileSuccess,
    updateProfileFail,
    addressStart,
    addressSuccess,
    addressFail

} = userAuth.actions;

export default userAuth.reducer;







// Actions






// Login 
export const login = (formData , navigate) => async (dispatch) => {

    dispatch(loginStart());

    try{
        const email = formData.email;
        const password = formData.password;
        const response = await apiConnector("POST" , apiUrl + "login/customer" , {email,password});

        // console.log(response);

        dispatch(loginSuccess(response.data.user));
        toast.success("Logged in successfully")
        navigate("/");
    }
    catch(error){
        // console.log(error.response.data.error);
        toast.error(error?.response?.data?.message || "Something went wrong.")
        dispatch(loginFail());
    }

}



// Login 
export const loginAdmin = (email , password , navigate) => async (dispatch) => {

    dispatch(loginStart());

    try{

        const response = await apiConnector("POST" , apiUrl + "login/admin" , {email,password});

        // console.log(response);

        dispatch(loginSuccess(response.data.user));
        toast.success("Logged in successfully")
        navigate("/admin/dashboard");
    }
    catch(error){
        // console.log(error.response.data.error);
        toast.error(error?.response?.data?.error || "Something went wrong.")
        dispatch(loginFail());
    }

}


// Register 
export const register = (formData , navigate ) => async (dispatch) => {

    dispatch(registerStart());

    try{
        const response = await apiConnector("POST" , apiUrl + "register" , {formData});

        // console.log(response);

        dispatch(registerSuccess(response.data.user));
        toast.success("Registered successfully")
        navigate("/login")
    }
    catch(error){
        // console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong.")
        dispatch(registerFail());
    }

}


// send otp
export const sendOtp = (email , setShowOtpPopup) => async (dispatch) => {

    dispatch(otpStart());

    try{
        const response = await apiConnector("POST" , apiUrl + "send-otp" , {email});

        // console.log(response);

        dispatch(otpSuccess(response.data.user));
        toast.success("Otp Sent successfully");
        setShowOtpPopup(true);
    }
    catch(error){
        setShowOtpPopup(false);
        toast.error(error?.response?.data?.message || "Failed to sent OTP.")
        dispatch(otpFail());
    }

}



// load user
export const loadUser = () => async (dispatch) => {

    dispatch(loadUserStart());

    try{
        const response = await apiConnector("GET", `${apiUrl}load-user`);

        // console.log(response);

        dispatch(loadUserSuccess(response.data.user));
    }
    catch(error){
        // console.log(error);
        dispatch(loadUserFail());
    }

}



// logout
export const logout = (navigate) => async (dispatch) => {

    dispatch(logoutStart());

    try{
        const response = await apiConnector("POST" , apiUrl + "logout");


        dispatch(logoutSuccess());
        toast.success("Logout Successfully")
        navigate("/");
    }
    catch(error){
        // console.log(error);
        dispatch(logoutFail());
        toast.error("Logout Fail")
    }

}





// Update Profile 
export const updateUserProfile = (updatedUser , setIsEditing) => async (dispatch) => {

    dispatch(updateProfileStart());

    try{
        const response = await apiConnector("PUT" , apiUrl + "update-customer-profile" , {updatedUser});

        // console.log(response);

        dispatch(updateProfileSuccess(response.data.user));
        toast.success("Profile Updated successfully");
        setIsEditing(false);
    }
    catch(error){
        // console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong.")
        dispatch(updateProfileFail(error?.response?.data?.error));
    }

}




// Update Password 
export const updateUserPassword = (oldPassword , newPassword , setIsEditing) => async (dispatch) => {

    dispatch(updateProfileStart());

    try{
        const response = await apiConnector("PUT" , apiUrl + "update-password-customer" , {oldPassword , newPassword});

        // console.log(response);

        toast.success("Password Updated successfully");
        setIsEditing(false);
    }
    catch(error){
        // console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong.")
        dispatch(updateProfileFail(error?.response?.data?.error));
    }

}



// add address
export const addAddress = (currentAddress, handleClose) => async (dispatch) => {
    dispatch(addressStart());

    try {
        const response = await apiConnector("POST", apiUrl + "add-address", { currentAddress });

        // Assuming the response contains the updated user object
        dispatch(loadUserSuccess(response.data.customer));
        toast.success("Address added successfully");
        handleClose();
    } 
    catch (error) {
        // console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(addressFail(error?.response?.data?.error));
    }
};



// update address
export const updateAddress = (editIndex, currentAddress, handleClose) => async (dispatch) => {
// console.log(editIndex)
    dispatch(addressStart());

    try {
        const response = await apiConnector("PUT", apiUrl + `update-address`, { currentAddress , addressId: editIndex });

        // Assuming the response contains the updated user object
        dispatch(loadUserSuccess(response.data.customer));
        toast.success("Address updated successfully");
        handleClose();
    } 
    catch (error) {
        // console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(addressFail(error?.response?.data?.error));
    }
};



// delete address
export const deleteAddress = (index) => async (dispatch) => {

    dispatch(addressStart());

    try {
        const response = await apiConnector("DELETE", apiUrl + "delete-address", { addressId: index });

        // Assuming the response contains the updated user object
        dispatch(loadUserSuccess(response.data.customer));
        toast.success("Address deleted successfully");
    } 
    catch (error) {
        // console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(addressFail(error?.response?.data?.error));
    }
};