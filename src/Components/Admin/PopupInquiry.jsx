import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Actions from './Actions';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BigLoader from '../Loader/BigLoader';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInquiry, fetchInquiries } from '../../redux/adminSlices/popupFormHandler';
import io from 'socket.io-client';
import { addNewInquiry } from '../../redux/adminSlices/popupFormHandler';

const PopupInquiry = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const { inquiries, loading } = useSelector((state) => state.popupFormHandler);

    useEffect(() => {
        dispatch(fetchInquiries());

        const socket = io('http://localhost:4005'); // Replace with your server URL and port

        socket.on('newPopupForm', (newInquiry) => {
            dispatch(addNewInquiry(newInquiry));
        });

        return () => {
            socket.disconnect();
        };
    }, [dispatch]);

    const handleSearch = (event) => {
        const keyword = event.target.value.toLowerCase();
        setSearchTerm(keyword);
    };

    const deleteInquiryHandler = (id) => {
        dispatch(deleteInquiry(id));
    };

    const filteredInquiries = inquiries.filter(inquiry =>
        inquiry.fullName.toLowerCase().includes(searchTerm) ||
        inquiry.email.toLowerCase().includes(searchTerm)
    );

    const columns = [
        {
            field: "id",
            headerName: "Id",
            minWidth: 200,
            flex: 0.4,
            renderCell: (params) => params.row._id
        },
        {
            field: "date",
            headerName: "Date",
            minWidth: 200,
            flex: 0.4,
            renderCell: (params) => params.row._id
        },
        {
            field: "fullName",
            headerName: "Full Name",
            minWidth: 200,
            flex: 0.2,
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 0.3,
        },
        {
            field: "phone",
            headerName: "Phone",
            minWidth: 150,
            flex: 0.2,
        },
        {
            field: "inquiry",
            headerName: "Inquiry",
            minWidth: 300,
            flex: 0.4,
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.2,
            renderCell: (params) => (
                <span className={`text-sm font-medium rounded-full py-1 px-2 capitalize ${params.row.status === 'unmarked' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {params.row.status}
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
                <Actions editRoute={"inquiry"} deleteHandler={deleteInquiryHandler} id={params.row.id} name={params.row.fullName} />
            ),
        },
    ];

    function formatDateString(dateString) {
        // Parse the date string
        const date = new Date(dateString);
      
        // Extract the day, month, and year
        const day = date.getUTCDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getUTCFullYear();
      
        // Determine the appropriate suffix for the day
        let daySuffix;
        if (day % 10 === 1 && day !== 11) {
          daySuffix = 'st';
        } else if (day % 10 === 2 && day !== 12) {
          daySuffix = 'nd';
        } else if (day % 10 === 3 && day !== 13) {
          daySuffix = 'rd';
        } else {
          daySuffix = 'th';
        }
      
        // Format the date as "28th July 2024"
        return `${day}${daySuffix} ${month} ${year}`;
    }

    const rows = filteredInquiries.map((inquiry) => ({
        id: inquiry._id,
        fullName: inquiry.fullName,
        email: inquiry.email,
        phone: inquiry.phone,
        inquiry: inquiry.inquiry,
        status: inquiry.status,
        date: formatDateString(inquiry.createdAt) ,
    }));




      

    return (
        loading ? <BigLoader /> :
            <>
                <h1 className="text-lg font-medium uppercase">Inquiries</h1>
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

export default PopupInquiry;
