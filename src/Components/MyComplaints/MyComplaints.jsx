import React, { useEffect, useState } from 'react';
import './myComplaints.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComplaints } from '../../redux/slices/dataFetch';
import BigLoader from "../Loader/BigLoader"

const MyComplaints = () => {

    const { user } = useSelector((state) => state.userAuth);
    const { complaints , loading } = useSelector((state) => state.dataFetch);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchComplaints());
    }, [dispatch]);




    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (

        loading ? <BigLoader/> :

        <div className="complaints">
            <h2>My Complaints</h2>
            
            {complaints?.length === 0 ? (
                <div className='noComplaintsDiv'>No complaints found !</div>
            ) : (
                complaints?.map((complaint, index) => (
                    <div className="complaint-card" key={index}>
                        <div className="complaint-header">
                            <div>
                                <span className="complaint-id">Complaint ID: {complaint?.complaintId}</span>
                                <span className="complaint-date">Date: {formatDate(complaint?.createdAt)}</span>
                            </div>
                            <div className={`complaint-status ${complaint?.status?.toLowerCase()?.replace(/\s+/g, '-')}`}>{complaint.status}</div>
                        </div>
                        <div className="complaint-body">
                            <div className="complaint-details">
                                <div className="product-info">
                                    <img src={complaint?.product?.themeImage?.url} alt={complaint.product.name} className="product-image" />
                                    <span className="product-name">Product: {complaint.product.name}</span>
                                </div>
                                <p className="complaint-description">Status: {complaint?.status}</p>
                                <p className="complaint-description">Description: {complaint?.description}</p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyComplaints;
