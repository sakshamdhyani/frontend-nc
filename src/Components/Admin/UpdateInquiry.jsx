import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchInquiry, updateInquiry } from '../../redux/adminSlices/popupFormHandler';
import Loader from "../Loader/Loader"

const UpdateInquiry = () => {
    const dispatch = useDispatch();
    const { inquiry , loading } = useSelector((state) => state.popupFormHandler);
    const params = useParams();

    const [comment, setComment] = useState('');
    const [status, setStatus] = useState('unmarked');

    useEffect(() => {
        dispatch(fetchInquiry(params.id));
    }, [dispatch, params.id]);

    useEffect(() => {
        if (inquiry) {
            setComment(inquiry.comment || '');
            setStatus(inquiry.status);
        }
    }, [inquiry]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedInquiry = {
            ...inquiry,
            comment,
            status
        };
        dispatch(updateInquiry(updatedInquiry))
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Update Inquiry</h1>
            {inquiry &&
                <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Full Name:</label>
                        <p className="text-gray-900">{inquiry.fullName}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
                        <p className="text-gray-900">{inquiry.email}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Phone:</label>
                        <p className="text-gray-900">{inquiry.phone}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Inquiry:</label>
                        <p className="text-gray-900">{inquiry.inquiry}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Comment:</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows="4"
                            cols="50"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Status:</label>
                        <select 
                            value={status} 
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="unmarked">Unmarked</option>
                            <option value="marked">Marked</option>
                        </select>
                    </div>
                    <button 
                        type="submit"
                        className="w-full flex justify-center items-center gap-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                    >
                        Update Inquiry

                        {loading ? <Loader/> : null}
                    </button>
                </form>
            }
        </div>
    );
};

export default UpdateInquiry;
