import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequests } from '../../redux/slices/dataFetch';
import BigLoader from "../Loader/BigLoader"

const MyRequests = () => {

    const { user } = useSelector((state) => state.userAuth);
    const {requests , loading} = useSelector((state) => state.dataFetch);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchRequests());
    },[])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    return (

        loading ? <BigLoader/> :

        
        <div className="complaints">
            <h2>My Requests</h2>

            {
                requests.length === 0 ?
                
                <div>No Requests found !</div>

                :

                (requests.map((request, index) => (
                    <div className="complaint-card" key={index}>
                        <div className="complaint-header">
                            <div>
                                <span className="complaint-id">Request ID : {request?.requestId}</span>
                                <span className="complaint-date">Date : {formatDate(request?.createdAt)}</span>
                            </div>
                            <div className={`complaint-status ${request?.status?.toLowerCase()?.replace(/\s+/g, '-')}`}>{request.status}</div>
                        </div>
                        <div className="complaint-body">
                            <div className="complaint-details">
                                <div className="product-info">
                                    <img src={request?.product?.themeImage?.url} alt={request?.product?.name} className="product-image" />
                                    <span className="product-name">Product : {request.product.name}</span>
                                </div>
                                <p className="complaint-description">Status : {request?.status}</p>
                                <p className="complaint-description">Description : {request?.description}</p>
                                <p className="complaint-description">Address : {request?.address}</p>
                                <p className="complaint-description">Contact Number : {request?.contactNumber}</p>
                            </div>
                        </div>
                    </div>
                )))
            }

        </div>
    );
};

export default MyRequests;
