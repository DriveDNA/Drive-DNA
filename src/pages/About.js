import React from "react";
import { Helmet } from "react-helmet-async";
import "../css/fstyle.css";

export const About = () => {
  return (
    <>
      {/* ✅ SEO */}
      <Helmet>
        <title>
          About | Drive DNA – Premium Car Accessories & Modification Parts
        </title>

        <meta
          name="description"
          content="Learn about Drive DNA – your trusted destination for premium car accessories, modification parts, and automotive lifestyle products in India."
        />

        <link rel="canonical" href="https://drivedna.in/about" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="About Drive DNA – Car Accessories Store"
        />
        <meta
          property="og:description"
          content="Discover Drive DNA’s journey, values, and passion for premium car accessories and modification parts."
        />
        <meta property="og:url" content="https://drivedna.in/about" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Drive DNA – Premium Car Accessories"
        />
        <meta
          name="twitter:description"
          content="Drive DNA provides premium car accessories and modification parts designed for style, comfort, and performance."
        />
      </Helmet>

      <div className="footer-container">
        <div className="text">
          <h1 className="text-color">Welcome to Drive DNA!!</h1>

          <p>
            We believe your car is more than just a machine – it’s a reflection
            of your personality. Drive DNA provides the full spectrum of
            automotive expression, from timeless elegance to everyday comfort.
            We deliver products that help you express your unique drive story –
            because when it’s in your DNA, it shows on the road.
          </p>

          <h2 className="text-color">Our Story</h2>

          <p>
            Founded with a passion by Arjun Kumar Ghai for automotive excellence
            and design innovation, Drive DNA was created to redefine the way
            people experience their vehicles. Drive DNA began with a simple idea
            — car lovers shouldn’t have to compromise between quality, design,
            and convenience. With a strong focus on careful product selection,
            customer experience, and authenticity, the store brings together
            products that enhance comfort, style, and everyday driving. Rather
            than creating products in-house, Drive DNA partners with reliable
            and established brands, curating a collection that meets strict
            standards of quality, durability, and design. Every product listed
            is chosen to help customers personalize their vehicles with
            confidence.
          </p>

          <h2 className="text-color">Our Core Values</h2>

          <p>
            <span className="p-bold">Quality:</span> We deliver only top‑tier
            products designed for durability, precision, and style that lasts.
          </p>

          <p>
            <span className="p-bold">Customer Focus:</span> We create and
            deliver experiences that elevate every journey.
          </p>

          <p>
            <span className="p-bold">Expression:</span> We empower drivers to
            showcase their unique style through design and innovation.
          </p>
        </div>
      </div>
    </>
  );
};
