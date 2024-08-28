import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useDispatch, useSelector } from 'react-redux';
import TrackStepper from '../Order/TrackStepper';
import Loading from './Loading';
import { orderDetails, updateOrderStatus } from '../../redux/adminSlices/orderHandler';

const UpdateOrder = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { order, loading } = useSelector((state) => state.orderHandler);
    const [status, setStatus] = useState('');

    useEffect(() => {
        dispatch(orderDetails(params.id));
    }, [dispatch, params.id]);

    useEffect(() => {
        if (order) {
            setStatus(order.orderStatus || 'pending');
        }
    }, [order]);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        if (order) {
            dispatch(updateOrderStatus(order._id, status)).then(() => {
                dispatch(orderDetails(params.id));
            });
        }
    };

    if (loading) return <Loading />;

    const getActiveStep = () => {
        switch (status) {
            case "delivered":
                return 3;
            case "shipped":
                return 2;
            case "processing":
                return 1;
            case "cancelled":
                return 1; // Show "Processing" as last step for cancelled
            default:
                return 0;
        }
    };

    return (
        <>
            {order && (
                <div className="flex flex-col gap-4">
                    <Link to="/admin/orders" className="ml-1 flex items-center gap-0 font-medium text-primary-blue uppercase">
                        <ArrowBackIosIcon sx={{ fontSize: "18px" }} />
                        Go Back
                    </Link>

                    <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg min-w-full">
                        <div className="sm:w-1/2 border-r">
                            <div className="flex flex-col gap-3 my-8 mx-10">
                                <h3 className="font-medium text-lg">Delivery Address</h3>
                                <h4 className="font-medium">{order?.customer?.name}</h4>
                                <p className="text-sm">{`${order?.shippingAddress?.address}, ${order?.shippingAddress?.city}, ${order?.shippingAddress?.state} - ${order?.shippingAddress?.postalCode}`}</p>
                                <div className="flex gap-2 text-sm">
                                    <p className="font-medium">Email</p>
                                    <p>{order?.customer?.email}</p>
                                </div>
                                <div className="flex gap-2 text-sm">
                                    <p className="font-medium">Phone Number</p>
                                    <p>{order?.shippingAddress?.contactNumber || 0}</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={updateOrderSubmitHandler} className="flex flex-col gap-3 p-8">
                            <h3 className="font-medium text-lg">Update Status</h3>
                            <div className="flex gap-2">
                                <p className="text-sm font-medium">Current Status:</p>
                                <p className="text-sm">
                                    {status === "shipped" && (`Shipped on ${new Date(order.shippedAt).toLocaleDateString()}`)}
                                    {status === "processing" && (`Ordered on ${new Date(order.createdAt).toLocaleDateString()}`)}
                                    {status === "delivered" && (`Delivered on ${new Date(order.deliveredAt).toLocaleDateString()}`)}
                                    {status === "pending" && (`Pending`)}
                                    {status === "cancelled" && (`Cancelled`)}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-sm font-medium">Order ID:</p>
                                <p className="text-sm">{order.orderId}</p>
                            </div>
                            <FormControl fullWidth sx={{ marginTop: 1 }}>
                                <InputLabel id="order-status-select-label">Status</InputLabel>
                                <Select
                                    labelId="order-status-select-label"
                                    id="order-status-select"
                                    value={status}
                                    label="Status"
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="processing">Processing</MenuItem>
                                    <MenuItem value="shipped">Shipped</MenuItem>
                                    <MenuItem value="delivered">Delivered</MenuItem>
                                    <MenuItem value="cancelled">Cancelled</MenuItem>
                                </Select>
                            </FormControl>
                            <button type="submit" className="bg-main_theme p-2.5 text-[#2e2e2e111] font-medium rounded shadow hover:shadow-lg">
                                Update
                            </button>
                        </form>
                    </div>

                    {order.orderItems && order.orderItems.map((item) => {
                        const { _id, product, name, price, quantity } = item;

                        return (
                            <div className="flex flex-col sm:flex-row min-w-full shadow-lg rounded-lg bg-white px-2 py-5" key={_id}>
                                <div className="flex flex-col sm:flex-row sm:w-1/2 gap-1">
                                    <div className="w-full sm:w-32 h-24">
                                        <img draggable="false" className="h-full w-full object-contain" src={product?.themeImage?.url} alt={name} />
                                    </div>
                                    <div className="flex flex-col gap-1 overflow-hidden">
                                        <p className="text-sm">{product?.name?.length > 45 ? `${product?.name?.substring(0, 45)}...` : product?.name}</p>
                                        <p className="text-xs text-gray-600 mt-2">Quantity: {quantity}</p>
                                        <p className="text-xs text-gray-600">Price: ₹{parseFloat(price.$numberDecimal).toLocaleString()}</p>
                                        <span className="font-medium">Total: ₹{(quantity * parseFloat(price.$numberDecimal)).toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col w-full sm:w-1/2">
                                    <h3 className="font-medium sm:text-center">Order Status</h3>
                                    <TrackStepper
                                        orderOn={order.createdAt}
                                        shippedAt={order.shippedAt}
                                        deliveredAt={order.deliveredAt}
                                        status={order.orderStatus}  // Pass the status here
                                        activeStep={getActiveStep()}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default UpdateOrder;
