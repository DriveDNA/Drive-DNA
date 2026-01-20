import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Helmet } from "react-helmet-async";
import CardGroup from "react-bootstrap/CardGroup";
import Accordion from "react-bootstrap/Accordion";
import { Footer } from "../Footer/Footer";
import "./Home.css";
const API_URL = process.env.REACT_APP_API_URL;

export const Home = () => {
  // const gridRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  // featured products
  useEffect(() => {
    fetch(`${API_URL}/products/`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // reviews
  useEffect(() => {
    fetch(`${API_URL}/review/top/`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  useEffect(() => {
    // ✅ Wait until DOM is ready
    const slider = document.getElementById("productSlider");
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");

    if (slider && nextBtn && prevBtn) {
      const handleNext = () => {
        const cardWidth =
          slider.querySelector(".product-card")?.offsetWidth || 0;
        slider.scrollBy({ left: cardWidth + 16, behavior: "smooth" });
      };
      const handlePrev = () => {
        const cardWidth =
          slider.querySelector(".product-card")?.offsetWidth || 0;
        slider.scrollBy({ left: -(cardWidth + 16), behavior: "smooth" });
      };

      nextBtn.addEventListener("click", handleNext);
      prevBtn.addEventListener("click", handlePrev);

      // 🧹 Cleanup listeners when component unmounts
      return () => {
        nextBtn.removeEventListener("click", handleNext);
        prevBtn.removeEventListener("click", handlePrev);
      };
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Drive DNA | Premium Car Accessories & Modifications in India
        </title>

        <meta
          name="description"
          content="Shop premium car accessories, styling kits, and modification parts online in India at Drive DNA. Best quality, fast delivery, and trusted by car lovers."
        />

        <link rel="canonical" href="https://drivedna.in/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Drive DNA | Premium Car Accessories in India"
        />
        <meta
          property="og:description"
          content="Upgrade your ride with premium car accessories and modification parts from Drive DNA."
        />
        <meta
          property="og:image"
          content="https://drivedna.in/seo-banner.jpg"
        />
        <meta property="og:url" content="https://drivedna.in/" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Drive DNA | Premium Car Accessories"
        />
        <meta
          name="twitter:description"
          content="Shop premium car accessories and car modification parts online in India at Drive DNA."
        />
        <meta
          name="twitter:image"
          content="https://drivedna.in/seo-banner.jpg"
        />

        {/* ✅ Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Drive DNA",
            url: "https://drivedna.in",
            logo: "https://drivedna.in/logo.png",
            sameAs: [
              "https://www.instagram.com/drivedna",
              "https://www.facebook.com/drivedna",
            ],
          })}
        </script>

        {/* ✅ FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How do I return or exchange my order?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Contact Drive DNA support with your order details and product images. Our team will assist within 24 hours.",
                },
              },
              {
                "@type": "Question",
                name: "How long does delivery take?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Orders are delivered within 4–7 business days depending on location.",
                },
              },
              {
                "@type": "Question",
                name: "Can I cancel my order?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Orders can be cancelled within 12 hours of placing the order.",
                },
              },
            ],
          })}
        </script>
      </Helmet>

      {/* <!-- Hero Section --> */}
      <div className="hero">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-label="Drive DNA premium car accessories showcase"
        >
          <source src={`${process.env.PUBLIC_URL}/hero.mp4`} type="video/mp4" />
        </video>
        <div className="hero-content">
          <h1 className="display-4 fw-bold">Elevate Your Drive Style</h1>
          <p className="mt-3 d-4 fw-bold">Quality choice for every budget</p>
        </div>
      </div>

      {/* <!-- featured products --> */}
      <div className="container mx-auto mt-4 Featured-sec">
        <h1 className="mb-3 text-center f-tekture">Featured Products</h1>

        <div className="product-slider-wrapper">
          <button className="slider-btn prev-btn">‹</button>

          <div className="product-slider" id="productSlider">
            {products.slice(-8).map((p) => (
              <div className="product-card card shadow-sm" key={p._id}>
                <img
                  src={`${p.images?.[0]}`}
                  className="card-img-top"
                  alt={p.name + " premium car accessory from Drive DNA"}
                />
                <div className="card-body text-center mt-3">
                  <p>
                    {" "}
                    {p.name.length > 20
                      ? p.name.substring(0, 20) + "..."
                      : p.name}
                  </p>
                  <p className="price">₹{p.price}</p>
                  <Link to={`/product/${p._id}`}>View Product</Link>
                </div>
              </div>
            ))}
          </div>

          <button className="slider-btn next-btn">›</button>
        </div>

        <hr className="mt-4 line" />
      </div>

      {/* why choose section  */}
      <div className="container">
        <h1 className="mb-3 text-center f-tekture">Why Choose DriveDNA?</h1>
        <CardGroup>
          <Card style={{ border: "none" }}>
            <Card.Img className="d-img" variant="top" src="./w-1.png" />
            <Card.Body>
              <Card.Title className="text-center review-text fw-bold">
                Premium Quality Products
              </Card.Title>
              <Card.Text className="text-center">
                Engineered for durability, performance, and
                long-lasting results.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ border: "none" }}>
            <Card.Img className="d-img" variant="top" src="./w-2.png" />
            <Card.Body>
              <Card.Title className="text-center review-text fw-bold">
                Tested & Verified
              </Card.Title>
              <Card.Text className="text-center">
                Every product is quality-checked to meet real-world
                driving demands.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img className="d-img" variant="top" src="./w-3.png" />
            <Card.Body>
              <Card.Title className="text-center review-text fw-bold">
                Market-Best Pricing
              </Card.Title>
              <Card.Text className="text-center">
                Better prices than most online stores—without
                compromising quality.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
        <hr className="mt-4 line" />
      </div>

      {/* <!-- customer reviews --> */}
      <div className="container mx-auto reviews mt-4">
        <h1 className="text-center mb-3 f-tekture">Stories Unfiltered</h1>
        <div className="reviews-masonry">
          {reviews.slice(0, 6).map((r, i) => (
            <div className="review-card" key={i}>
              <p className="review-text fw-bold ">{r.productName}</p>
              <Card>
                <Card.Text className="p-3">
                  <strong>"</strong> {r.comment} <strong>"</strong>
                </Card.Text>
              </Card>
              <div className="d-flex mt-2">
                <span className="review-user">
                  — {r.username || "Anonymous"}
                </span>
                <span className="rating ms-auto">{"⭐".repeat(r.rating)}</span>
              </div>
            </div>
          ))}
        </div>
        <hr className="mt-4 line" />
      </div>

      {/* faqs */}
      <div className="container">
        <Accordion>
          <h1 className="text-center mb-3 f-tekture">FAQs</h1>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              How do I return or exchange my order?
            </Accordion.Header>
            <Accordion.Body>
              <p className="acc-ans">
                — Contact our customer care team with your order details and
                images of the product to initiate a return. Our team will
                contact you within 24 hours to assist with the return, exchange,
                or refund.
              </p>
              <p className="acc-ans">
                — For further information check our exchnage and return policy.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>How long does delivery take?</Accordion.Header>
            <Accordion.Body>
              <p className="acc-ans">
                — Orders are typically delivered within 4–7 business days,
                depending on your location.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Can I cancel my order?</Accordion.Header>
            <Accordion.Body>
              <p className="acc-ans">
                — Yes. Orders can be cancelled within 12 hours of order placed.
                After that, cancellation is not possible.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Is COD available?</Accordion.Header>
            <Accordion.Body>
              — No, COD is not available at the moment. Please make the payment
              at checkout using the QR code provided.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <hr className="mt-4 line" />
      </div>

      <Footer />
    </>
  );
};
