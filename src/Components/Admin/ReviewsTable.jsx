import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import Rating from '@mui/material/Rating';
import Actions from './Actions';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview, fetchReviews } from '../../redux/adminSlices/reviewHandler';
import React from 'react';


const ReviewsTable = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [productId, setProductId] = useState("");
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);

    const dispatch = useDispatch();
    const { reviews: rev } = useSelector((state) => state.reviewHandler);

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);


    const deleteReviewHandler = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this review ?");

        if(confirm){
            dispatch(deleteReview(id));
        }
    };


    const columns = [
        {
            field: "id",
            headerName: "Review ID",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "user",
            headerName: "User",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 200,
            flex: 0.3,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => {
                return <Rating readOnly value={params.row.rating} size="small" precision={0.5} />;
            }
        },
        {
            field: "review",
            headerName: "Review",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "product",
            headerName: "Product",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className='border flex'>
                        <Actions editRoute={"review"} deleteHandler={deleteReviewHandler} id={params.row.id} />
                    </div>
                );
            },
        },
    ];

    const rows = [];

    rev && rev.forEach((review) => {
        rows.push({
            id: review._id,
            rating: review.rating,
            review: review.review,
            user: review.customer.firstName,
            product: review.product.name,
        });
    });

    return (
        <>
            <div className="flex justify-between items-center gap-2 sm:gap-12">
                <h1 className="text-lg font-medium uppercase">Reviews</h1>
                <input type="text" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} className="outline-none border-0 rounded p-2 w-full shadow hover:shadow-lg" />
            </div>
            <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 450 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    sx={{
                        boxShadow: 0,
                        border: 0,
                    }}
                />
            </div>
        </>
    );
};

export default ReviewsTable;
