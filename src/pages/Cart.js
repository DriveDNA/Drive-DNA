import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "react-bootstrap/Spinner";
import "../css/Cart.css";
const API_URL = process.env.REACT_APP_API_URL;

export const Cart = () => {
  const [loading, setLoading] = useState(true);
  const didFetch = useRef(false);
  const [syncingId, setSyncingId] = useState(null);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  let user = localStorage.getItem("user");
  user = user ? JSON.parse(user).result : null;

  useEffect(() => {
  if (!user || didFetch.current) return;

  didFetch.current = true;

  fetch(`${API_URL}/cart/${user._id}`)
    .then((res) => res.json())
    .then((data) => {
      setCart(data.items || []);
      setLoading(false);
    });
}, [user]);

  if (!user)
    return <h3 className="text-center mt-3">Please login to view cart</h3>;

  // ------------------------------
  // REMOVE ITEM
  // ------------------------------
  const removeItem = async (itemId, index) => {
    try {
      const response = await fetch(`${API_URL}/cart/item/${itemId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Item removed from cart!");

        // Remove from UI
        const updated = cart.filter((_, i) => i !== index);
        setCart(updated);
      } else {
        toast.error("Failed to delete item!");
      }
    } catch (error) {
      toast.error("Failed to delete item!");
    }
  };

  // ------------------------------
  // UPDATE QUANTITY
  // ------------------------------
  const updateQuantity = async (itemId, productId, change) => {
    // prevent double clicks while syncing same item
    if (syncingId === itemId) return;

    setSyncingId(itemId);

    // ✅ OPTIMISTIC UI
    setCart((prev) =>
      prev.map((item) =>
        item._id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );

    try {
      await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          productId,
          quantity: change,
        }),
      });
    } catch (err) {
      console.error("Update quantity failed:", err);
      toast.error("Failed to update quantity");
    } finally {
      setSyncingId(null);
    }
  };

  // ------------------------------
  // CALCULATE TOTALS
  // ------------------------------
  const subTotal = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

  const shipping = 50;
  const grandTotal = subTotal + shipping;

  const checkout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
    } else {
      navigate("/checkout", {
        state: {
          cart,
          subTotal,
          shipping,
          grandTotal,
        },
      });
    }
  };

  if (loading)
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

  // ------------------------------
  // JSX RENDER
  // ------------------------------
  return (
    <div className="container mt-3">
      <div className="row">
        {/* LEFT SIDE CART ITEMS */}
        <div className="col-12 col-md-8">
          {cart.length === 0 ? (
            <h4>Your cart is empty 🛒</h4>
          ) : (
            cart.map((item, index) => (
              <div key={item._id} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex align-items-start border-bottom pb-3">
                    <div className="me-4">
                      <img
                        src={`${item.productId.images[0]}`}
                        alt={item.productId.name}
                        width="100"
                        className="rounded"
                      />
                    </div>

                    <div className="flex-grow-1">
                      <h5>{item.productId.name}</h5>
                    </div>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(item._id, index)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="row">
                    <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                      <p className="text-muted mb-1">Price</p>
                      <h5>Rs. {item.productId.price}</h5>
                    </div>
                    <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                      <p className="text-muted mb-1">Quantity</p>
                      <button
                        className="btn btn-secondary"
                        disabled={item.quantity <= 1 || syncingId === item._id}
                        onClick={() =>
                          updateQuantity(item._id, item.productId._id, -1)
                        }
                      >
                        -
                      </button>

                      <strong className="mx-3">{item.quantity}</strong>

                      <button
                        className="btn btn-secondary"
                        disabled={syncingId === item._id}
                        onClick={() =>
                          updateQuantity(item._id, item.productId._id, 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <p className="text-muted mb-1">Total</p>
                      <h5>Rs. {item.productId.price * item.quantity}</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE ORDER SUMMARY */}
        <div className="col-12 col-md-4">
          <div className="card">
            <div className="card-header bg-transparent border-bottom">
              <h5>Order Summary</h5>
            </div>

            <div className="card-body">
              <table className="table">
                <tbody>
                  <tr>
                    <td>Sub Total:</td>
                    <td className="text-end">Rs. {subTotal}</td>
                  </tr>
                  <tr>
                    <td>Shipping Charge:</td>
                    <td className="text-end">Rs. {shipping}</td>
                  </tr>
                  <tr className="bg-light">
                    <th>Total:</th>
                    <td className="text-end fw-bold">Rs. {grandTotal}</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <strong>Note: </strong>Before you checkout, please take a moment
                to review our Exchange & Return Policy to avoid any
                inconvenience later.
              </div>

              <button className="btn btn-primary w-100 mt-3" onClick={checkout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
