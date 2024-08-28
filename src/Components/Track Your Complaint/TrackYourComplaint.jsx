import React, { useState } from 'react';
import './trackYourComplaint.css';
import { CiSearch } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleComplaint } from '../../redux/slices/contact';
import Loader from '../Loader/Loader';
import MetaData from '../Layouts/MetaData'; // Import MetaData component

const TrackYourComplaint = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.contact);
  const [complaintId, setComplaintId] = useState('');

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const searchHandler = () => {
    if (!complaintId) return;
    dispatch(fetchSingleComplaint(complaintId));
  };

  return (
    <div className="trackYourComplaintBody">
      <MetaData title="Track Your Complaint - Moseta" description="Track your complaint status with Moseta." />

      <h1 className="trackYourComplaintHeading">Track Complaint Status</h1>

      <div className="trackYourComplaintContainer">
        <div className="trackYourComplaintContainerSearchParent">
          <input
            className="trackYourComplaintContainerSearch"
            type="text"
            placeholder="Search Your Complaint Here"
            value={complaintId}
            onChange={(e) => setComplaintId(e.target.value)}
          />

          <div className="trackYourComplaintContainerSearchIcon">
            {loading ? <Loader /> : <CiSearch onClick={searchHandler} />}
          </div>
        </div>

        {!isEmpty(data) && (
          <div className="orderDetailsContainer">
            <img src={data?.product?.themeImage?.url} alt="Product" className="trackYourComplaintProductImage" />
            <div className="trackYourComplaintProductDetails">
              <p className="trackYourComplaintProductName">{data?.product?.name}</p>
              <p className="trackYourComplaintProductStatus">Status: {data?.status}</p>
              <p className="trackYourComplaintProductStatus">Note: {data?.comment}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackYourComplaint;
