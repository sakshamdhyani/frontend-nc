import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "./../apiConnector";
import toast from "react-hot-toast";
import axios from "axios";
import { apiUrl } from "../apiUrl";

const initialState = {
    products: [],
    product: {}
};

const productHandler = createSlice({

    name: "productHandler",
    initialState,
    reducers: {

        // fetch all orders
        fetchProductsStart: (state) => {
            state.loading = true;
        },
        fetchProductsSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
        },
        fetchProductsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // fetch product details
        fetchProductDetailsStart: (state) => {
            state.loading = true;
        },
        fetchProductDetailsSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload.product;
        },
        fetchProductDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // update product details
        updateProductDetailsStart: (state) => {
            state.loading = true;
        },
        updateProductDetailsSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload.product;
        },
        updateProductDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // update product details
        createProductStart: (state) => {
            state.loading = true;
        },
        createProductSuccess: (state, action) => {
            state.loading = false;
        },
        createProductFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // fetch all orders
        deleteProductStart: (state) => {
            state.loading = true;
        },
        deleteProductSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
        },
        deleteProductFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    }
});


export const {

    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFail,
    fetchProductDetailsStart,
    fetchProductDetailsSuccess,
    fetchProductDetailsFail,
    updateProductDetailsStart,
    updateProductDetailsSuccess,
    updateProductDetailsFail,
    createProductStart,
    createProductSuccess,
    createProductFail,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFail,


} = productHandler.actions;


export default productHandler.reducer;







// all products
export const fetchProducts = () => async (dispatch) => {

    dispatch(fetchProductsStart());
    try {
        const response = await apiConnector("GET", apiUrl + "all-products");

        // console.log(response)

        dispatch(fetchProductsSuccess(response?.data));
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchProductsFail(error?.response?.data?.message));
    }
};




// single product
export const productDetails = (id) => async (dispatch) => {

    dispatch(fetchProductDetailsStart());
    try {
        const response = await apiConnector("GET", apiUrl + `product/${id}` );

        // console.log(response)

        dispatch(fetchProductDetailsSuccess(response?.data));
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchProductDetailsFail(error?.response?.data?.message));
    }
};




// update product
export const updateProductDetails = (formData , productId) => async (dispatch) => {

    dispatch(updateProductDetailsStart());
    try {
        const response = await apiConnector("PUT", apiUrl + `update-product-details` , {formData , productId} );

        // console.log(response)

        dispatch(updateProductDetailsSuccess(response?.data));
        toast.success("Product Updated Successfully");
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(updateProductDetailsFail(error?.response?.data?.message));
    }
};






export const updateProductImages = (productId, newThemeImage, newOtherImages) => async (dispatch) => {

    dispatch(updateProductDetailsStart());

    try {
        const formData = new FormData();
        formData.append('productId', productId);
        if (newThemeImage) {
            formData.append('newThemeImage', newThemeImage);
        }
        newOtherImages.forEach((image, index) => {
            formData.append('newOtherImages', image);
        });

        const response = await axios.put(apiUrl + 'update-product-images', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        dispatch(updateProductDetailsSuccess(response?.data));
        toast.success('Product Images Successfully');
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || 'Something went wrong.');
        dispatch(updateProductDetailsFail(error?.response?.data?.message));
    }
};








// create product
export const createProduct = (formData , clearForm) => async (dispatch) => {

    dispatch(createProductStart());
    try {
        const response = await axios.post(apiUrl + 'create-product', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        // console.log(response)

        dispatch(createProductSuccess());
        toast.success("Product Created Successfully");
        clearForm();
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(createProductFail(error?.response?.data?.message));
    }
};



// delete product
export const deleteProduct = (productId , navigate) => async (dispatch) => {

    dispatch(deleteProductStart());
    try {

        const response = await apiConnector("DELETE" , apiUrl + `delete-product/${productId}`)

        dispatch(deleteProductSuccess(response?.data));
        toast.success("Product Deleted Successfully");
        // Reload the current page
        window.location.reload();

    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(createProductFail(error?.response?.data?.message));
    }
};






