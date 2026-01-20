import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Footer } from "../components/Footer/Footer";
import Form from "react-bootstrap/Form";
const API_URL = process.env.REACT_APP_API_URL;

export const Checkout = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);

  const navigate = useNavigate();
  let user = localStorage.getItem("user");
  user = user ? JSON.parse(user).result : null;

  let { cart, subTotal, shipping, grandTotal } = state;
  shipping=50;
  grandTotal=subTotal+shipping

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
    upi: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (
      !address.name ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.pincode ||
      !address.upi
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);

    const orderData = {
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      checkStatus: check,
      items: cart.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      address,
      subTotal,
      shipping,
      grandTotal,
    };

    try {
      const res = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        throw new Error("Failed to place order");
      }

      const data = await res.json();
    

      if (data.success) {
        setLoading(false)
        toast.success("Order has been placed");
        navigate("/");
        return
      } else {
        toast.error("Order failed");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mt-4 mb-5 py-3 border-bottom">
        <div className="row">
          {/* LEFT – ADDRESS */}
          <div className="col-md-7">
            <h4 className="mb-3">Delivery Address</h4>

            <input
              className="form-control mb-2"
              placeholder="Full Name"
              name="name"
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              placeholder="Phone Number"
              name="phone"
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              placeholder="Address"
              name="street"
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              placeholder="City"
              name="city"
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              placeholder="Pincode"
              name="pincode"
              onChange={handleChange}
            />

            <label htmlFor="upi" className="mb-2 fw-bold">
              Please enter your transaction id here before placing order
            </label>
            <input
              className="form-control mb-2"
              name="upi"
              placeholder="Transaction ID"
              onChange={handleChange}
            />
          </div>

          {/* RIGHT – ORDER SUMMARY */}
          <div className="col-md-5">
            <div className="card">
              <div className="card-header">Order Summary</div>
              <div className="card-body">
                {cart.map((item) => (
                  <div key={item.productId._id} className="mb-2">
                    <strong>{item.productId.name}</strong>
                    <div>
                      {item.quantity} × Rs.{item.productId.price}
                    </div>
                  </div>
                ))}

                <hr />

                <p>Sub Total: Rs. {subTotal}</p>
                <p>Shipping: Rs. {shipping}</p>
                <h5>Total: Rs. {grandTotal}</h5>
                <img
                  src="./pay-img.jpg"
                  height={"300px"}
                  style={{ display: "block", margin: "0 auto" }}
                  alt=""
                />
                <p className="mt-2">
                  <strong>Note:- </strong> Please make payment before placing
                  order
                </p>

                <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch"
                  label="I have read and agree to the Exchange & Return Policy before placing this order."
                  checked={check}
                  onChange={(e) => setCheck(e.target.checked)}
                />

                <button
                  className="btn btn-success w-100 mt-1"
                  onClick={placeOrder}
                  disabled={loading || !check}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Placing Order...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
