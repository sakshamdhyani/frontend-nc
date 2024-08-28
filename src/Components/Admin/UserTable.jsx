import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Actions from './Actions';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCustomer, fetchCustomers } from '../../redux/adminSlices/customerHandler';
import BigLoader from '../Loader/BigLoader';

const CustomerTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const { customers, loading } = useSelector((state) => state.customerHandler);

    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch]);

    const deleteCustomerHandler = (id) => {
        // Simulate delete action
        dispatch(deleteCustomer(id));
    };

    const handleSearch = (event) => {
        const keyword = event.target.value.toLowerCase();
        setSearchTerm(keyword);
    };

    const filteredCustomers = customers.filter(customer =>
        customer.firstName.toLowerCase().includes(searchTerm) ||
        customer.lastName.toLowerCase().includes(searchTerm)
    );

    const columns = [
        {
            field: "id",
            headerName: "Id",
            minWidth: 200,
            flex: 0.4,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 0.2,
            renderCell: (params) => (
                <span>{params?.row.firstName} {params?.row.lastName}</span>
            )
        },
        {
            field: "role",
            headerName: "Role",
            minWidth: 150,
            flex: 0.2,
            renderCell: (params) => (
                <span className={`text-sm font-medium rounded-full py-1 px-2 capitalize ${params?.row?.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                    {params?.row?.role}
                </span>
            )
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 200,
            flex: 0.4,
            sortable: false,
            renderCell: (params) => (
                <Actions editRoute={"customer"} deleteHandler={deleteCustomerHandler} id={params?.row?.id} name={params?.row?.name} />
            ),
        },
    ];

    const rows = filteredCustomers.map((item) => ({
        id: item._id,
        firstName: item.firstName,
        lastName: item.lastName,
        role: item.role,
    }));

    return (
        <>
            <h1 className="text-lg font-medium uppercase">Customers</h1>
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                fullWidth
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                className="mb-4"
            />
            <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectIconOnClick
                    sx={{
                        boxShadow: 0,
                        border: 0,
                    }}
                />
            </div>
            {loading && <BigLoader />} {/* Show loader if loading state is true */}
        </>
    );
};

export default CustomerTable;
