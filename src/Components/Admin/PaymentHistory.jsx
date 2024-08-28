import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayments } from '../../redux/adminSlices/paymentHandler';

const PaymentHistory = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const { payments, loading: paymentsLoading, error: paymentsError } = useSelector((state) => state.paymentHandler);

    useEffect(() => {
        dispatch(fetchPayments());
    }, [dispatch]);

    useEffect(() => {
        if (paymentsError) {
            enqueueSnackbar(paymentsError, { variant: "error" });
        }
    }, [paymentsError, enqueueSnackbar]);

    // Map payments to DataGrid rows
    const rows = payments.map((payment) => ({
        id: payment.paymentId || payment._id,
        date: new Date(payment.createdAt).toLocaleDateString(),
        amount: parseFloat(payment.amount.$numberDecimal),
        description: `Payment by ${payment.customer.firstName}`, // Assuming `customer` field contains some description
        status: payment.status,
    }));

    const columns = [
        { field: 'id', headerName: 'Transaction ID', flex: 0.5 },
        { field: 'date', headerName: 'Date', flex: 0.5 },
        { field: 'amount', headerName: 'Amount', flex: 0.5, type: 'number' },
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 0.5 },
    ];

    return (
        <>
            <div className="flex justify-between items-center gap-2 sm:gap-12 mb-4">
                <h1 className="text-lg font-medium uppercase">Payment History</h1>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(fetchPayments())} // Simulate fetching updated data
                >
                    Refresh
                </Button>
            </div>
            <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 450 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    loading={paymentsLoading}
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

export default PaymentHistory;
