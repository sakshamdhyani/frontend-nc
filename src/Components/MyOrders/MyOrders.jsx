import React, { useEffect } from 'react';
import './myOrders.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../redux/slices/order';
import BigLoader from '../Loader/BigLoader';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    loading ? <BigLoader /> :
    <div className="recent-orders">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No Orders yet</p>
          <Link to="/" className="shop-now-button">Shop Now</Link>
        </div>
      ) : (
        orders.map((order, index) => (
          <div className="order-card" key={index}>
            
            <div className="order-header myOrderHeading">
              <div>
                <span className="order-id">Order ID: {order.orderId}</span>
                <span className="order-date">Date: {formatDate(order.createdAt)}</span>
              </div>
              
              <div className='myOrderStatus'>
                <div>
                  <p>Payment Status : </p>
                  <div className={`order-status ${order.orderStatus.toLowerCase()}`}>{order.paymentStatus}</div>
                </div>
                <div>
                  <p>Order Status : </p>
                  <div className={`order-status ${order.orderStatus.toLowerCase()}`}>{order.orderStatus}</div>
                </div>
              </div>
            
            </div>

            <div className="order-body">
              <div className="order-items">
                {order.orderItems.map((item, idx) => (
                  <div className="order-item" key={idx}>
                    <div className='itemImageAndNameContainer'>
                      <div className='item-image'>
                        <img src={item?.product?.themeImage?.url} alt="" />
                      </div>
                      <span className="item-name">{item?.product?.name}</span>
                    </div>
                    <div className="item-details">
                      <span className="item-quantity">{item?.quantity}x</span>
                      <span className="item-price">₹ {item?.price?.$numberDecimal}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-total">
                Total: ₹ {
                  order.orderItems.reduce((acc, curr) => {
                    return acc + (parseFloat(curr.price?.$numberDecimal) * curr.quantity);
                  }, 0).toFixed(2) // Convert total to fixed decimal places
                }
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
