import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "./../apiConnector";
import toast from "react-hot-toast";
import axios from "axios";
import { apiUrl } from "../apiUrl";

const initialState = {
    categories: [],
    category: {},
    deals: {},
    loading: false,
    error: null
};

const categoryHandler = createSlice({

    name: "categoryHandler",
    initialState,
    reducers: {

        // fetch all categories
        fetchCategoriesStart: (state) => {
            state.loading = true;
        },
        fetchCategoriesSuccess: (state, action) => {
            state.loading = false;
            state.categories = action.payload.categories;
        },
        fetchCategoriesFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },



        // create category
        createCategoryStart: (state) => {
            state.loading = true;
        },
        createCategorySuccess: (state, action) => {
            state.loading = false;
            state.categories = action.payload.categories;
        },
        createCategoryFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // update category
        updateCategoryStart: (state) => {
            state.loading = true;
        },
        updateCategorySuccess: (state, action) => {
            state.loading = false;
            state.categories = action.payload.categories;
        },
        updateCategoryFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // delete category
        deleteCategoryStart: (state) => {
            state.loading = true;
        },
        deleteCategorySuccess: (state, action) => {
            state.loading = false;
            state.categories = action.payload.categories;
        },
        deleteCategoryFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // create sub category
        createSubCategoryStart: (state) => {
            state.loading = true;
        },
        createSubCategorySuccess: (state, action) => {
            state.loading = false;
            state.categories = action.payload.categories;
        },
        createSubCategoryFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // delete category
        deleteSubCategoryStart: (state) => {
            state.loading = true;
        },
        deleteSubCategorySuccess: (state, action) => {
            state.loading = false;
            state.categories = action.payload.categories;
        },
        deleteSubCategoryFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // add products to deal
        addProductsToDealStart: (state) => {
            state.loading = true;
        },
        addProductsToDealSuccess: (state, action) => {
            state.loading = false;
            state.deals = action.payload.deals
        },
        addProductsToDealFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // delete category
        deleteProductFromDealStart: (state) => {
            state.loading = true;
        },
        deleteProductFromDealSuccess: (state, action) => {
            state.loading = false;
            state.deals = action.payload.deals
        },
        deleteProductFromDealFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // fetch deals
        fetchDealsStart: (state) => {
            state.loading = true;
        },
        fetchDealsSuccess: (state, action) => {
            state.loading = false;
            state.deals = action.payload.deals;
            state.categories = action.payload.categories
        },
        fetchDealsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


    }
});


export const {

    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFail,
    createCategoryStart,
    createCategorySuccess,
    createCategoryFail,
    updateCategoryStart,
    updateCategorySuccess,
    updateCategoryFail,
    deleteCategoryStart,
    deleteCategorySuccess,
    deleteCategoryFail,
    createSubCategoryStart,
    createSubCategorySuccess,
    createSubCategoryFail,
    deleteSubCategoryStart,
    deleteSubCategorySuccess,
    deleteSubCategoryFail,
    addProductsToDealStart,
    addProductsToDealSuccess,
    addProductsToDealFail,
    fetchDealsStart,
    fetchDealsSuccess,
    fetchDealsFail,
    deleteProductFromDealStart,
    deleteProductFromDealSuccess,
    deleteProductFromDealFail,
    
} = categoryHandler.actions;


export default categoryHandler.reducer;







// all products
export const fetchCategories = () => async (dispatch) => {

    dispatch(fetchCategoriesStart());
    try {
        const response = await apiConnector("GET", apiUrl + "all-categories");

        // console.log(response)

        dispatch(fetchCategoriesSuccess(response?.data));
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchCategoriesFail(error?.response?.data?.message));
    }
};




// create category
export const createCategory = (formData) => async (dispatch) => {

    dispatch(createCategoryStart());
    try {
        const response = await axios.post(apiUrl + 'create-category', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        // console.log(response)

        dispatch(createCategorySuccess(response?.data));
        toast.success("Category Created Successfully.")
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(createCategoryFail(error?.response?.data?.message));
    }
};



// update category




// delete category
export const deleteCategory = (id) => async (dispatch) => {

    dispatch(deleteCategoryStart());
    try {
        const response = await apiConnector("DELETE" , apiUrl + `delete-category/${id}`);

        dispatch(deleteCategorySuccess(response?.data));
        toast.success("Category Deleted Successfully.")
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(deleteCategoryFail(error?.response?.data?.message));
    }
};







// create sub category
export const createSubCategory = ({name , categoryId}) => async (dispatch) => {

    dispatch(createSubCategoryStart());
    try {
        const response = await apiConnector("POST" , apiUrl + "create-sub-category" , {name , categoryId});

        dispatch(createSubCategorySuccess(response?.data));
        toast.success("Sub Category Created Successfully.")
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(createSubCategoryFail(error?.response?.data?.message));
    }
};


// update sub category



// delete sub dategory
export const deleteSubCategory = (subCategoryId) => async (dispatch) => {

    dispatch(deleteSubCategoryStart());
    try {
        const response = await apiConnector("DELETE" , apiUrl + `delete-sub-category/${subCategoryId}`);

        dispatch(deleteSubCategorySuccess(response?.data));
        toast.success("Sub Category Deleted Successfully.")
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(deleteSubCategoryFail(error?.response?.data?.message));
    }
};






// add products to deals
export const addProductsToDeals = (updatedProduct) => async (dispatch) => {

    dispatch(addProductsToDealStart());
    try {
        const response = await apiConnector("PUT" , apiUrl + `add-products-deal` , {updatedProduct});

        dispatch(addProductsToDealSuccess(response?.data));
        console.log(response);
        toast.success("Products Added Successfully.")
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(addProductsToDealFail(error?.response?.data?.message));
    }
};


// fetch deals
export const fetchDeals = () => async (dispatch) => {

    dispatch(fetchDealsStart());
    try {
        const response = await apiConnector("GET" , apiUrl + `fetch-deals-admin`);

        dispatch(fetchDealsSuccess(response?.data));
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(fetchDealsFail(error?.response?.data?.message));
    }
};



// delete product from deal
export const deleteDealProduct = (dealName, productId) => async (dispatch) => {

    dispatch(deleteProductFromDealStart());
    try {
        const response = await apiConnector("PUT" , apiUrl + `remove-product-deal` , {dealName, productId});

        dispatch(deleteProductFromDealSuccess(response?.data));
    } 
    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong.");
        dispatch(deleteProductFromDealFail(error?.response?.data?.message));
    }
};