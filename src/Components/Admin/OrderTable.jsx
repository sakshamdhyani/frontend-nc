import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Actions from './Actions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../redux/adminSlices/orderHandler';
import BigLoader from "../Loader/BigLoader"

const OrderTable = () => {
    const dispatch = useDispatch();
    const { orders, loading } = useSelector((state) => state.orderHandler);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const deleteOrderHandler = (id) => {
        // Simulate delete action
        // Implement your delete logic here
        console.log(`Deleting order with id: ${id}`);
        // enqueueSnackbar("Deleted Successfully", { variant: "success" });
    };

    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <>
                        {
                            params.row.status === "Delivered" ? (
                                <span className="text-sm bg-green-100 p-1 px-2 font-medium rounded-full text-green-800">{params.row.status}</span>
                            ) : params.row.status === "Shipped" ? (
                                <span className="text-sm bg-yellow-100 p-1 px-2 font-medium rounded-full text-yellow-800">{params.row.status}</span>
                            ) : (
                                <span className="text-sm bg-purple-100 p-1 px-2 font-medium rounded-full text-purple-800">{params.row.status}</span>
                            )
                        }
                    </>
                )
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 200,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <span>₹{params.row.amount.toLocaleString()}</span>
                );
            },
        },
        {
            field: "orderOn",
            headerName: "Order On",
            type: "date",
            minWidth: 100,
            flex: 0.5,
            align: 'right',
            headerAlign: 'right',
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 200,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions editRoute={"order"} deleteHandler={deleteOrderHandler} id={params.row.id} />
                );
            },
        },
    ];

    const rows = [];

    orders && orders.forEach((order) => {
        rows.unshift({
            id: order._id,
            itemsQty: order.orderItems.length,
            amount: order.totalPrice.$numberDecimal,
            orderOn: new Date(order.createdAt), // Format the date as needed
            status: order.orderStatus,
        });
    });

    return (

        loading ? <BigLoader/> :

        <>
            <h1 className="text-lg font-medium uppercase">Orders</h1>
            <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectIconOnClick
                    loading={loading}
                    sx={{
                        boxShadow: 0,
                        border: 0,
                    }}
                />
            </div>
        </>
    );
};

export default OrderTable;
