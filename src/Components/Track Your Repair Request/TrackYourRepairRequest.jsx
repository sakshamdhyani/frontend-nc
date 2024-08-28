import React, { useState } from 'react';
import "./trackYourRepairRequest.css";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { fetchSingleRequest } from '../../redux/slices/contact';
import MetaData from '../Layouts/MetaData'; // Import MetaData component

const TrackYourRepairRequest = () => {

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.contact);
  const [requestId, setRequestId] = useState("");

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const searchHandler = () => {
    if (!requestId) {
      return;
    }
    dispatch(fetchSingleRequest(requestId));
  }

  return (
    <div className='trackYourRepairRequestBody'>
      <MetaData title="Track Your Repair Request - Moseta" description="Track your repair request status with Moseta. Enter your request ID to check the current status." />

      <h1 className='trackYourRepairRequestHeading'>Track Your Repair Request Status</h1>

      <div className='trackYourRepairRequestContainer'>

        <div className='trackYourRepairRequestContainerSearchParent'>

          <input
            className='trackYourComplaintContainerSearch'
            type="text"
            placeholder='Search Your Request Here'
            value={requestId}
            onChange={(e) => setRequestId(e.target.value)}
          />

          <div className='trackYourComplaintContainerSearchIcon'>
            {loading ? <Loader /> : <CiSearch onClick={searchHandler} />}
          </div>

        </div>

        {
          !isEmpty(data) &&

          <div className='orderDetailsContainer'>
            <img src={data?.product?.themeImage?.url} alt="Product" className='trackYourComplaintProductImage' />
            <div className='trackYourComplaintProductDetails'>
              <p className='trackYourComplaintProductName'>{data?.product?.name}</p>
              <p className='trackYourComplaintProductStatus'>Status: {data?.status}</p>
              <p className='trackYourComplaintProductStatus'>Description: {data?.description}</p>

              {data.note ? <p className='trackYourComplaintProductStatus'>Note: {data?.note}</p> : null}
            </div>
          </div>
        }

      </div>
    </div>
  );
}

export default TrackYourRepairRequest;
