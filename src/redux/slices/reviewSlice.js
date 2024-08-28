import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "../apiConnector";
import { apiUrl } from "../apiUrl";

const initialState = {
  loading: false,
  error: null,
};

const review = createSlice({
  name: "review",
  initialState,
  reducers: {
    submitReviewStart: (state) => {
      state.loading = true;
    },
    submitReviewSuccess: (state) => {
      state.loading = false;
    },
    submitReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  submitReviewStart,
  submitReviewSuccess,
  submitReviewFail,
} = review.actions;

export default review.reducer;



export const submitReview = (newReview, setReviews, setNewReview, reviews) => async (dispatch) => {
  dispatch(submitReviewStart());

  try {
    const response = await apiConnector("POST", apiUrl + "create-review", { newReview });

    dispatch(submitReviewSuccess());

    setNewReview({
      name: '',
      rating: 0,
      review: '',
      productId: newReview.productId
    });

    const updatedReviews = reviews.filter(review => review.customer._id !== response.data.review.customer._id);
    updatedReviews.unshift(response.data.review);
    setReviews(updatedReviews);

  } catch (error) {
    console.log(error);
    dispatch(submitReviewFail(error?.response?.data?.message));
  }
};
