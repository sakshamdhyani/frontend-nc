import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import React from 'react';

import { blockUnblockCustomer, fetchCustomer } from '../../redux/adminSlices/customerHandler';

const UpdateUser = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { customer } = useSelector((state) => state.customerHandler);
    const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchCustomer(params.id));
    }, [dispatch, params.id]);

    
    const handleApprovalToggle = async () => {
        setUpdateLoading(true);
        try {
            dispatch(blockUnblockCustomer(params.id))
        } catch (error) {
            console.error('Error updating approval status:', error);
        } finally {
            setUpdateLoading(false);
        }
    };

    return (
        <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-full p-6">
            <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">Customer Details</h2>
            
            <div className="space-y-6">

                <div className="border-b pb-4">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Personal Information</h3>
                    <p><strong>Name:</strong> {customer?.firstName} {customer?.lastName}</p>
                    <p><strong>Email:</strong> {customer?.email}</p>
                    <p><strong>Mobile Number:</strong> {customer?.mobileNumber}</p>
                </div>

                <div className="border-b pb-4">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Approval Status</h3>
                    <button
                        className={`py-2 px-4 rounded ${customer?.approved ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white font-medium`}
                        onClick={handleApprovalToggle}
                        disabled={updateLoading}
                    >
                        {updateLoading ? 'Updating...' : customer?.approved ? 'Block Account' : 'Unblock Account'}
                    </button>
                </div>

                <div className="border-b pb-4">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Addresses</h3>
                    {customer?.addresses?.map((address, index) => (
                        <div key={index} className="mb-4">
                            <p><strong>City:</strong> {address?.city}</p>
                            <p><strong>State:</strong> {address?.state}</p>
                            <p><strong>Postal Code:</strong> {address?.postalCode}</p>
                            <p><strong>Country:</strong> {address?.country}</p>
                            <p><strong>Contact Number:</strong> {address?.contactNumber}</p>
                            <p><strong>Address:</strong> {address?.address}</p>
                        </div>
                    ))}
                </div>

                <div className="border-b pb-4">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Cart Items</h3>
                    {customer?.cart?.items?.map((item, index) => (
                        <div key={index} className="mb-4">
                            <p><strong>Product Name:</strong> {item?.product?.name}</p>
                            <p><strong>Quantity:</strong> {item?.quantity}</p>
                        </div>
                    ))}
                </div>

                <div className="border-b pb-4">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Orders</h3>
                    {customer?.orders?.map((order, index) => (
                        console.log(order),
                        <div key={index} className="mb-4">
                            <p><strong>Order ID:</strong> {order?._id}</p>
                            <p><strong>Status:</strong> {order?.orderStatus}</p>
                        </div>
                    ))}
                </div>

                <div className="border-b pb-4">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Payments</h3>
                    {customer?.payments?.map((payment, index) => (
                        <div key={index} className="mb-4">
                            <p><strong>Payment ID:</strong> {payment?._id}</p>
                            <p><strong>Amount:</strong> ₹ {payment?.amount?.$numberDecimal}</p>
                            <p><strong>Status:</strong> {payment?.status}</p>
                        </div>
                    ))}
                </div>

                <div className="border-b pb-4">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Ratings and Reviews</h3>
                    {customer?.ratingAndReview?.map((review, index) => (
                        <div key={index} className="mb-4">
                            <p><strong>Review ID:</strong> {review?._id}</p>
                            <p><strong>Rating:</strong> {review?.rating}</p>
                            <p><strong>Review:</strong> {review?.review}</p>
                        </div>
                    ))}
                </div>

                <div className="border-b pb-4">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Complaints</h3>
                    {customer?.complaints?.map((complaint, index) => (
                        <div key={index} className="mb-4">
                            <p><strong>Complaint ID:</strong> {complaint?._id}</p>
                            <p><strong>Product :</strong> {complaint?.product?.name}</p>
                            <p><strong>Description:</strong> {complaint?.description}</p>
                        </div>
                    ))}
                </div>

                <div className="border-b pb-4">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Repair Requests</h3>
                    {customer?.repairRequests?.map((request, index) => (
                        <div key={index} className="mb-4">
                            <p><strong>Request ID:</strong> {request?._id}</p>
                            <p><strong>Product :</strong> {request?.product?.name}</p>
                            <p><strong>Description:</strong> {request?.description}</p>
                        </div>
                    ))}
                </div>

                <Link
                    className="mt-6 hover:bg-gray-100 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium"
                    to="/admin/customers"
                >
                    Back to Users
                </Link>
            </div>
        </div>
    );
};

export default UpdateUser;
