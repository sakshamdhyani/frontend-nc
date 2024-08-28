import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { fetchSingleComplaintAdmin, updateComplaintAdmin } from '../../redux/adminSlices/requestAndComplaint';

const UpdateComplaint = () => {
    const { id } = useParams(); // Renaming id to complaintId for clarity
    const [status, setStatus] = useState(''); // Initialize with an empty string
    const [comment, setComment] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { complaint, loading } = useSelector((state) => state.requestAndComplaint);

    useEffect(() => {
        dispatch(fetchSingleComplaintAdmin(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (complaint) {
            setStatus(complaint.status || ''); // Set status to an empty string if it's undefined
            setComment(complaint.comment || ''); // Set comment to an empty string if it's undefined
        }
    }, [complaint]);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleUpdateComplaint = () => {
        dispatch(updateComplaintAdmin({ id, status, comment }));
    };

    return (
        <div className="mx-auto mt-4 p-4 w-full">
            <h1 className="text-2xl font-semibold mb-4">Update Complaint Details</h1>
            
            <div className="bg-white shadow-md rounded-lg p-4">
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Complaint ID: {complaint.complaintId}</p>
                </div>
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Description: {complaint.description}</p>
                </div>
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Contact Number: {complaint.contactNumber}</p>
                </div>
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Address: {complaint?.address}</p>
                </div>
                <div className="mb-4">  
                    <p className="text-sm font-medium text-gray-700">Status:</p>
                    <select
                        value={status} // Ensure status is controlled here
                        onChange={handleStatusChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        {['pending', 'resolved', 'closed'].map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Comment:</label>
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        rows={3}
                    />
                </div>

                <div className='flex gap-2'>
                    <button
                        className="flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={handleUpdateComplaint}
                    >
                        Update Complaint
                        {loading ? <Loader /> : null}
                    </button>

                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        onClick={() => navigate("/admin/complaints")}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateComplaint;
