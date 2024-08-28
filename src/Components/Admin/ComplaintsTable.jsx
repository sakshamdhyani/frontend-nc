import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComplaintAdmin, fetchComplaintsAdmin } from '../../redux/adminSlices/requestAndComplaint';

const ComplaintsTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { complaints, loading } = useSelector((state) => state.requestAndComplaint);

    useEffect(() => {
        dispatch(fetchComplaintsAdmin());
    }, [dispatch]);

    // Delete complaint handler
    const deleteComplaintHandler = (id) => {
        const confirm = window.confirm(`Are you sure you want to delete this complaint?`);

        if (confirm) {
            dispatch(deleteComplaintAdmin(id));
        }
    };

    // View bill handler
    const viewBillHandler = (secureUrl) => {
        window.open(secureUrl, '_blank');
    };

    // Data grid columns configuration
    const columns = [
        {
            field: "id",
            headerName: "Complaint ID",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "customer",
            headerName: "Customer",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "address",
            headerName: "Address",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "nature",
            headerName: "Nature",
            minWidth: 200,
            flex: 1.5,
        },
        {
            field: "description",
            headerName: "Description",
            minWidth: 200,
            flex: 1.5,
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 1,
            renderCell: (params) => <span>{params.row.status}</span>,
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 300,
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <div className='flex gap-5'>
                    <IconButton
                        color="primary"
                        onClick={() => navigate(`/admin/complaint/${params.row.id}`)}
                    >
                        <EditIcon />
                    </IconButton>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteComplaintHandler(params.row.id)}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => viewBillHandler(params.row.bill?.secureUrl)}
                    >
                        View Bill
                    </Button>
                </div>
            ),
        },
    ];

    // Prepare rows from complaints data
    const rows = complaints.map((complaint) => ({
        id: complaint._id,
        description: complaint.description,
        status: complaint.status,
        address: complaint?.address,
        customer: complaint.customer.firstName,
        nature: complaint.nature,
        bill: complaint.bill, // Assuming complaint object has a bill field containing secureUrl
    }));

    return (
        <>
            <div className="flex justify-between items-center gap-2 sm:gap-12">
                <h1 className="text-lg font-medium uppercase">Complaints</h1>
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

export default ComplaintsTable;
