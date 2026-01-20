import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Helmet } from "react-helmet-async";
import "../css/Category.css";

const API_URL = process.env.REACT_APP_API_URL;

export const Category = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    setLoading(true);
    setProducts([]);

    fetch(`${API_URL}/products/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryName(data?.[0]?.category?.name || "Car Accessories");
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoryId]);

  const handleView = (id) => {
    navigate(`/product/${id}`);
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

  return (
    <>
      {/* ✅ SEO */}
      <Helmet>
        <title>
          {categoryName} for Cars in India | Buy Online at Drive DNA
        </title>

        <meta
          name="description"
          content={`Shop premium ${categoryName} for cars in India at Drive DNA. Best prices on high quality car accessories and modification parts with fast delivery.`}
        />

        <link
          rel="canonical"
          href={`https://drivedna.in/category/${categoryId}`}
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={`${categoryName} for Cars | Drive DNA`}
        />
        <meta
          property="og:description"
          content={`Buy premium ${categoryName} for your car online from Drive DNA with fast shipping across India.`}
        />
        <meta
          property="og:url"
          content={`https://drivedna.in/category/${categoryId}`}
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${categoryName} for Cars | Drive DNA`}
        />
        <meta
          name="twitter:description"
          content={`Shop ${categoryName} online at Drive DNA – premium car accessories store.`}
        />
      </Helmet>

      <h1 className="text-center text-danger mt-3">
        {categoryName || "Products"}
      </h1>

      <div className="container1 card-group mt-4">
        {products.map((p) => (
          <div className="product" key={p._id}>
            <div className="card pc-card m-1 product-overlay-card">
              <img
                src={p.images?.[0]}
                alt={p.name + " car accessory"}
                className="card-img-top pc-img"
              />

              <div className="overlay">
                <div className="items head">
                  <p>{p.name}</p>
                  <hr />
                </div>

                <div className="items price">
                  <p className="new">₹{p.price}</p>
                </div>

                <div className="items cart">
                  <span onClick={() => handleView(p._id)}>VIEW PRODUCT</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
