import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleRepairRequest, updateRepairRequest } from '../../redux/adminSlices/requestAndComplaint';
import Loader from '../Loader/Loader';


const UpdateRequest = () => {
    const { id } = useParams(); // Renaming id to requestId for clarity
    const [status, setStatus] = useState(''); // Initialize with an empty string
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { request, loading } = useSelector((state) => state.requestAndComplaint);

    useEffect(() => {
        dispatch(fetchSingleRepairRequest(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (request) {
            setStatus(request.status || ''); // Set status to an empty string if it's undefined
        }
    }, [request]);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleUpdateStatus = () => {
        // Make API call to update status
        // console.log(status)
        dispatch(updateRepairRequest(id , status))
    };



    return (
        <div className="mx-auto mt-4 p-4 w-full">
            <h1 className="text-2xl font-semibold mb-4">Update Request Details</h1>
            <div className="bg-white shadow-md rounded-lg p-4">
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Request ID: {request._id}</p>
                </div>
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Description: {request.description}</p>
                </div>
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Contact Number: {request.contactNumber}</p>
                </div>
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Address: {request.address}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Status:</label>
                    <select
                        value={status} // Ensure status is controlled here
                        onChange={handleStatusChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        {['pending', 'processing', 'completed', 'cancelled'].map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className='flex gap-2'>
                    <button
                        className="flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={handleUpdateStatus}
                    >
                        Update Status

                        {loading ? <Loader/> : null}
                    </button>

                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        onClick={() => navigate("/admin/requests")}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateRequest;
