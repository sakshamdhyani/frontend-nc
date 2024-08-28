import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRepairRequest, fetchRepairRequests } from '../../redux/adminSlices/requestAndComplaint';

const RepairRequestsTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { requests , loading } = useSelector((state) => state.requestAndComplaint);

    useEffect(() => {
        dispatch(fetchRepairRequests());
    }, [dispatch]);


    const deleteRequestHandler = (id) => {
        const confirm = window.confirm(`are you sure you want to delete this request ?`);

        if(confirm){
            dispatch(deleteRepairRequest(id));
        }
    };

    const columns = [
        {
            field: "id",
            headerName: "Request ID",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "user",
            headerName: "User",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "product",
            headerName: "Product",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "request",
            headerName: "Request",
            minWidth: 200,
            flex: 1.5,
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 1,
            renderCell: (params) => {
                return (
                    <span>{params.row.status}</span>
                );
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 150,
            flex: 1,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <div>
                        <IconButton
                            color="primary"
                            onClick={() => navigate(`/admin/request/${params.row.id}`)}
                        >
                            <EditIcon />
                        </IconButton>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => deleteRequestHandler(params.row.id)}
                        >
                            Delete
                        </Button>
                    </div>
                );
            },
        },
    ];

    const rows = requests.map((request) => ({
        id: request._id,
        request: request.description,
        status: request.status,
        product: request?.product?.name,
        user: request.customer?.firstName || 'Unknown User', // Assuming the customer object has a name field
    }));

    return (
        <>
            <div className="flex justify-between items-center gap-2 sm:gap-12">
                <div>
                    <h1 className="text-lg font-medium uppercase">Repair Requests</h1>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 450 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    loading={loading}
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

export default RepairRequestsTable;
