import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import toast from "react-hot-toast";
import "../css/Product.css";
const API_URL = process.env.REACT_APP_API_URL;

export const Product = () => {
  const [visibleReviews, setVisibleReviews] = useState(3);
  const navigate = useNavigate();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [formData, setFormData] = useState({ review: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const submitReview = async (event) => {
    event.preventDefault();
    let user = localStorage.getItem("user");
    user = user ? JSON.parse(user).result : null;
    if (!user) return toast.error("Please login to add review");

    await fetch(`${API_URL}/review/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        username: user.name,
        productId: product._id,
        comment: formData.review,
        rating,
      }),
    });
    fetchReviews();

    toast.success("Review submitted!");
  };

  const fetchProduct = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/product/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await res.json();
      if (!data || !data.images) {
        throw new Error("Invalid product data");
      }
      setProduct(data);
      setMainImage(data.images[0] || "");
    } catch (err) {
      console.error("FETCH PRODUCT ERROR:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct().finally(() => setLoading(false));
  }, [fetchProduct]);

  const fetchReviews = useCallback(async () => {
    const res = await fetch(`${API_URL}/review/product/${id}`);
    const data = await res.json();
    setReviews(data);
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

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
  if (!product) return <h2>Product not found</h2>;

  const buynow = () => {
    let user = localStorage.getItem("user");
    user = user ? JSON.parse(user).result : null;
    if (!user) return toast.error("Please login to buy");
    navigate("/checkout", {
      state: {
        cart: [{ productId: product, quantity: 1 }],
        subTotal: product.price,
        shipping: 50,
        grandTotal: product.price,
      },
    });
  };
  const addtocart = async (productId) => {
    let user = localStorage.getItem("user");
    user = user ? JSON.parse(user).result : null;
    if (!user) {
      toast.error("Please login before adding to cart!");
      return;
    }

    await fetch(`${API_URL}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        productId,
        quantity: 1,
      }),
    });

    toast.success("Added to cart");
  };

  // ⭐ Rating calculations
  const totalReviews = reviews.length;

  const averageRating =
    totalReviews === 0
      ? 0
      : (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(
          1,
        );

  // count per star (1–5)
  const ratingCount = [1, 2, 3, 4, 5].reduce((acc, star) => {
    acc[star] = reviews.filter((r) => r.rating === star).length;
    return acc;
  }, {});

  const ratingPercent = (star) =>
    totalReviews === 0 ? 0 : (ratingCount[star] / totalReviews) * 100;

  return (
    <>
    <Helmet>
  <title>
    {product.name} | Buy Online in India at Drive DNA
  </title>

  <meta
    name="description"
    content={`Buy ${product.name} at best price in India. Premium car accessories and modification parts from Drive DNA with fast delivery.`}
  />

  <link
    rel="canonical"
    href={`https://drivedna.in/product/${id}`}
  />

  {/* Open Graph */}
  <meta property="og:type" content="product" />
  <meta property="og:title" content={product.name + " | Drive DNA"} />
  <meta
    property="og:description"
    content={`Shop ${product.name} online from Drive DNA – premium car accessories store.`}
  />
  <meta property="og:image" content={product.images?.[0]} />
  <meta property="og:url" content={`https://drivedna.in/product/${id}`} />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={product.name + " | Drive DNA"} />
  <meta
    name="twitter:description"
    content={`Buy ${product.name} online at Drive DNA.`}
  />
  <meta name="twitter:image" content={product.images?.[0]} />

  {/* ✅ Product Schema */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: product.images,
      description: product.discription,
      sku: product._id,
      brand: {
        "@type": "Brand",
        name: "Drive DNA",
      },
      offers: {
        "@type": "Offer",
        url: `https://drivedna.in/product/${id}`,
        priceCurrency: "INR",
        price: product.price,
        availability: product.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: averageRating || "5",
        reviewCount: totalReviews || "1",
      },
    })}
  </script>
</Helmet>

      <div className="container">
        <div className=" mt-4" id="product-details">
          <div className="row ">
            {/* LEFT SIDE — IMAGE GALLERY */}
            <div className="col-md-6 text-center c1 mb-3">
              {/* Main Image */}
              <img
                src={`${mainImage}`}
                alt={product.name + " car accessory by Drive DNA"}
                className="img-fluid rounded m-image"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />

              {/* Thumbnails */}
              <div className="d-flex mt-3  justify-content-center gap-2 flex-wrap">
                {product.images?.map((img, i) => (
                  <img
                    key={i}
                    src={`${img}`}
                    alt={product.name + " preview image"}
                    onClick={() => setMainImage(img)}
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "5px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border:
                        mainImage === img
                          ? "2px solid #007bff"
                          : "1px solid #ddd",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT SIDE — PRODUCT INFO */}
            <div className="col-md-6">
              <h3>{product.name}</h3>
              <p>
                <strong>{product.sname}</strong>
              </p>
              <p>{product.discription}</p>

              <p>
                <strong>Key Features:</strong>
              </p>
              <ul>
                {product.features?.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              <p>
                <strong>Price:</strong> ₹{product.price}
                <strong> (Inclusive of all taxes)</strong>
              </p>
              <div className="d-flex gap-2">
                {product.inStock === false ? (
                  <button id="out-of-stock" className="btn b-gray">
                    Out of stock
                  </button>
                ) : (
                  <button
                    id="add-to-cart"
                    onClick={() => addtocart(product._id)}
                    className="btn b-gray"
                  >
                    Add to Cart
                  </button>
                )}
                <button onClick={buynow} className="btn btn-danger">
                  Buy now
                </button>
              </div>
            </div>
            <div>
              <h1 className="text-center mt-4 f-tekture">Reviews</h1>
              <Form onSubmit={submitReview}>
                <InputGroup className="mb-3 mt-3">
                  <Form.Control
                    placeholder="Add your review"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    name="review"
                    type="text"
                    value={formData.review}
                    onChange={handleChange}
                  />
                  <div className="text-center bg-body-tertiary p-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        style={{
                          fontSize: "25px",
                          cursor: "pointer",
                          color: star <= rating ? "gold" : "gray",
                        }}
                        onClick={() => setRating(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <Button
                    variant=" btn btn-danger"
                    type="submit"
                    id="button-addon2"
                  >
                    Submit
                  </Button>
                </InputGroup>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div>
          <div className="align-items-center">
            <div className="container">
              <div className="row align-items-center r-sec-col1 pb-3">
                <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 text-center">
                  {" "}
                  <div className="col-auto text-center">
                    <h3 className="display-2 fw-bold">{averageRating}</h3>
                    <span className="fs-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={12}
                        height={12}
                        fill="currentColor"
                        className="bi bi-star-fill text-warning"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={12}
                        height={12}
                        fill="currentColor"
                        className="bi bi-star-fill text-warning"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={12}
                        height={12}
                        fill="currentColor"
                        className="bi bi-star-fill text-warning"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={12}
                        height={12}
                        fill="currentColor"
                        className="bi bi-star-fill text-warning"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={12}
                        height={12}
                        fill="currentColor"
                        className="bi bi-star-fill text-warning"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    </span>
                    <p className="mb-0 fs-6">
                      (Based on {totalReviews} reviews)
                    </p>
                  </div>
                </div>
                <div className="col-8 col-sm-6 col-md-6 col-lg-6 col-xl-7 text-center">
                  <div className="col order-3 order-md-2">
                    {[5, 4, 3, 2, 1].map((star, index, arr) => (
                      <div
                        key={star}
                        className={`progress ${
                          index !== arr.length - 1 ? "mb-3" : ""
                        }`}
                        style={{ height: 8 }}
                      >
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          style={{ width: `${ratingPercent(star)}%` }}
                          aria-valuenow={ratingPercent(star)}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-4 col-sm-6 col-md-3 col-lg-3 col-xl-2 text-start">
                  <div>
                    <div>
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star}>
                          <span className="fs-6">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <svg
                                key={s}
                                xmlns="http://www.w3.org/2000/svg"
                                width={10}
                                height={10}
                                fill="currentColor"
                                className={`bi bi-star-fill ${
                                  s <= star ? "text-warning" : "text-light"
                                }`}
                                viewBox="0 0 16 16"
                              >
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                              </svg>
                            ))}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="mb-3">
          {/* Rating */}
          <div className="pb-4 mb-4">
            <div className="ms-0 ">
              {reviews.slice(0, visibleReviews).map((r) => (
                <div key={r._id} className=" r-sec-col pt-3  pb-2 mb-3 p-3">
                  <div className="ms-3 d-flex">
                    <div className="c-name">
                      <h5 className="mb-1 text-danger fw-bold">{r.username}</h5>
                      <div className="r-date text-muted">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="mb-2 ms-auto">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          style={{
                            color: star <= r.rating ? "gold" : "gray",
                            fontSize: "14px",
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <Card.Text className=" r-com p-3 mt-2">
                    <strong>"</strong> {r.comment} <strong>"</strong>
                  </Card.Text>
                </div>
              ))}
            </div>
            {visibleReviews < reviews.length && (
              <div className="text-center mt-3">
                <button
                  className="btn btn-danger"
                  onClick={() => setVisibleReviews((prev) => prev + 3)}
                >
                  Show More Reviews
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
