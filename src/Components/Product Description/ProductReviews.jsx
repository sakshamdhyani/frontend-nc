import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import './productReviews.css';
import { useDispatch, useSelector } from 'react-redux';
import { submitReview } from '../../redux/slices/reviewSlice';
import Loader from '../Loader/Loader';

const ProductReviews = ({ product }) => {

  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([]);
  const { isAuth } = useSelector((state) => state.userAuth);
  const { loading } = useSelector((state) => state.review);

  useEffect(() => {
    if (product && product.reviews) {
      setReviews(product.reviews);
    }
  }, [product]);

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 0,
    review: '',
    productId: product._id
  });

  const [errors, setErrors] = useState({
    name: false,
    rating: false,
    review: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newReview.name || !newReview.rating || !newReview.review) {
      setErrors({
        name: !newReview.name,
        rating: !newReview.rating,
        review: !newReview.review,
      });
      return;
    }

    // Ensure productId is set correctly before dispatching
    newReview.productId = product._id;

    dispatch(submitReview(newReview, setReviews, setNewReview, reviews));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const handleRatingChange = (event, newValue) => {
    setNewReview((prevReview) => ({ ...prevReview, rating: newValue }));
    setErrors((prevErrors) => ({ ...prevErrors, rating: false }));
  };

  return (
    <div id='reviewsBody' className='productReviewsBody'>
      <div className='productReviewsHeading'>
        <p className='productReviewsTitle'>Customer Reviews</p>
      </div>

      {isAuth && (
        <form className='reviewForm' onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Your Name'
            value={newReview.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className='error-message'>Name is required</p>}
          <Rating
            name='rating'
            size='large'
            value={newReview.rating}
            onChange={handleRatingChange}
            required
          />
          {errors.rating && <p className='error-message'>Rating is required</p>}
          <textarea
            name='review'
            placeholder='Write your review...'
            value={newReview.review}
            onChange={handleChange}
            required
          ></textarea>
          {errors.review && <p className='error-message'>Review is required</p>}
          <button type='submit' className='flex justify-center items-center gap-2'>
            Submit Review
            {loading ? <span> <Loader /> </span> : null}
          </button>
        </form>
      )}

      <div className='productReviewsContainer'>
        {reviews.length === 0 ? (
          <p className='noReviewsMessage'>No reviews yet.</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className='productReviewBox'>
              <div className='reviewHeader'>
                <h3>{review?.customer?.firstName}</h3>
                <p className='reviewDate'>{new Date(review.createdAt).toDateString()}</p>
              </div>
              <Rating value={review.rating} readOnly />
              <p className='reviewText'>{review.review}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
