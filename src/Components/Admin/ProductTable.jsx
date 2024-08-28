import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Actions from './Actions';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProducts } from '../../redux/adminSlices/productHandler';

const ProductTable = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { products, loading, error } = useSelector((state) => state.productHandler);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const deleteProductHandler = (id) => {
        // Dispatch delete action here if needed
        dispatch(deleteProduct(id , navigate))
    };

    const columns = [
        {
            field: '_id',
            headerName: 'Product ID',
            minWidth: 250,
            flex: 0.5,
        },
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 600,
            flex: 1,
            renderCell: (params) => (
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full">
                        <img draggable="false" src={params.row.themeImage?.url} alt={"Product-image"} className="w-full h-full rounded-full object-cover" />
                    </div>
                    {params.row.name}
                </div>
            ),
        },
        {
            field: 'category',
            headerName: 'Category',
            minWidth: 200,
            flex: 0.1,
            renderCell: (params) => (
                <span>{params.row.category.name}</span>
            ),
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            minWidth: 100,
            headerAlign: 'left',
            align: 'left',
            flex: 0.2,
            renderCell: (params) => (
                <span>₹ {params.row.price.$numberDecimal}</span>
            ),
        },
        {
            field: 'cuttedPrice',
            headerName: 'Cutted Price',
            type: 'number',
            minWidth: 150,
            headerAlign: 'left',
            align: 'left',
            flex: 0.2,
            renderCell: (params) => (
                <span>₹ {params.row.cuttedPrice.$numberDecimal}</span>
            ),
        },
        {
            field: 'ratings',
            headerName: 'Rating',
            type: 'number',
            minWidth: 100,
            flex: 0.1,
            align: 'left',
            headerAlign: 'left',
            renderCell: (params) => (
                <Rating readOnly value={params.row.ratings} size="small" precision={0.5} />
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 200,
            flex: 0.3,
            type: 'number',
            sortable: false,
            renderCell: (params) => (
                <Actions editRoute={'product'} deleteHandler={deleteProductHandler} id={params.row._id} />
            ),
        },
    ];

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium uppercase">Products</h1>
                <Link to="/admin/new_product" className="py-2 px-4 rounded shadow font-medium text-white bg-primary-blue hover:shadow-lg">New Product</Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>
                <DataGrid
                    rows={products}
                    columns={columns}
                    pageSize={100}
                    loading={loading}
                    getRowId={(row) => row._id} // Specify custom row ID field
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

export default ProductTable;
