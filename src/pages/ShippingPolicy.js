import React from "react";
import { Helmet } from "react-helmet-async";

export const ShippingPolicy = () => {
  return (
    <>
      {/* ✅ SEO */}
      <Helmet>
        <title>Shipping Policy | Drive DNA – Fast & Reliable Delivery in India</title>

        <meta
          name="description"
          content="Read Drive DNA’s Shipping Policy to learn about order processing time, delivery timelines, tracking, and courier partners for car accessories across India."
        />

        <link rel="canonical" href="https://drivedna.in/shippingpolicy" />

        {/* Open Graph */}
        <meta property="og:title" content="Shipping Policy | Drive DNA" />
        <meta
          property="og:description"
          content="Drive DNA shipping policy covering processing time, delivery, tracking and courier services across India."
        />
        <meta property="og:url" content="https://drivedna.in/shippingpolicy" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shipping Policy | Drive DNA" />
        <meta
          name="twitter:description"
          content="Learn how Drive DNA ships car accessories quickly and safely across India."
        />
      </Helmet>

      <div className="footer-container">
        <div className="text">
          <h1 className="text-color">Shipping Policy</h1>

          <p>We want your shopping experience to be smooth and reliable.</p>

          <p>
            <span className="p-bold">Processing Time:</span> Orders are processed
            within 2–3 business days after payment confirmation.
          </p>

          <p>
            <span className="p-bold">Shipping Time:</span> Depending on your
            location, delivery usually takes 4–7 business days via our trusted
            courier partners.
          </p>

          <p>
            <span className="p-bold">Tracking:</span> Once your order ships, you
            will receive a tracking link via email or SMS.
          </p>

          <p>
            <span className="p-bold">Delays:</span> Drive DNA is not responsible
            for delays caused by courier partners, weather conditions, or
            unforeseen events.
          </p>

          <p>
            <span className="p-bold">International Shipping:</span> Currently, we
            only ship within India (international shipping may be introduced
            soon).
          </p>
        </div>
      </div>
    </>
  );
};
