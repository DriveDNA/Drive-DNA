import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import Spinner from "react-bootstrap/Spinner";

const API_URL = process.env.REACT_APP_API_URL;

export const Myorders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  let user = JSON.parse(localStorage.getItem("user"));
  user = user?.result;

  const fetchMyOrders = useCallback(() => {
    if (!user?._id) return;

    setLoading(true);

    fetch(`${API_URL}/orders/user/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user?._id]);

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  if (!user) {
    return <h5 className="text-center mt-4">Please login to view orders</h5>;
  }

  // ✅ SPINNER UI
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    const res = await fetch(`${API_URL}/order/cancel/${orderId}`, {
      method: "PUT",
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Order cancelled");
      fetchMyOrders();
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h3 className="mb-4">My Orders</h3>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h6>Order #{order.orderNumber}</h6>
                <small>{new Date(order.createdAt).toLocaleString()}</small>
              </div>

              <hr />

              {order.items.map((item) => (
                <div key={item._id} className="mb-2">
                  <div className="d-flex justify-content-between">
                    <span>
                      <strong>{item.productId?.name}</strong>
                      <div>Qty: {item.quantity}</div>
                      <div>Price: Rs.{item.price}</div>
                    </span>
                    <span>
                      <img
                        src={item.productId?.images?.[0] || "/placeholder.png"}
                        alt={item.productId?.name || "Product Image"}
                        width="100"
                        className="rounded"
                      />
                    </span>
                  </div>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between">
                <h6>Total: Rs. {order.grandTotal}</h6>

                {order.orderStatus === "Placed" &&
                  Date.now() - new Date(order.createdAt).getTime() <
                    12 * 60 * 60 * 1000 && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => cancelOrder(order._id)}
                    >
                      Cancel Order
                    </button>
                  )}
              </div>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    order.orderStatus === "Cancelled"
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {order.orderStatus}
                </span>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
