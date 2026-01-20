import React from "react";
import { Helmet } from "react-helmet-async";

export const Exchange = () => {
  return (
    <>
      {/* ✅ SEO */}
      <Helmet>
        <title>Exchange & Return Policy | Drive DNA – Easy Returns in India</title>

        <meta
          name="description"
          content="Read Drive DNA’s Exchange & Return Policy. Learn about eligibility, refunds, cancellations, and how to return damaged or incorrect car accessories in India."
        />

        <link rel="canonical" href="https://drivedna.in/exchange" />

        {/* Open Graph */}
        <meta property="og:title" content="Exchange & Return Policy | Drive DNA" />
        <meta
          property="og:description"
          content="Drive DNA return, exchange and cancellation policy for car accessories shipped across India."
        />
        <meta property="og:url" content="https://drivedna.in/exchange" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Exchange & Return Policy | Drive DNA" />
        <meta
          name="twitter:description"
          content="Learn how to exchange or return products at Drive DNA with our simple policy."
        />
      </Helmet>

      <div className="footer-container">
        <div className="text">
          <h1 className="text-color">Exchange & Return Policy</h1>

          <p>We want you to love every product you purchase from Drive DNA.</p>

          <p>
            <span className="p-bold">Eligibility:</span> Items can be returned or
            exchanged within 3 days of delivery if defective, damaged, or
            incorrect.
          </p>

          <p>
            <span className="p-bold">Condition:</span> Returned items must be
            unused, in original packaging, and accompanied by a purchase receipt.
          </p>

          <p>
            <span className="p-bold">Process:</span> Contact customer care with
            your order details and product images to initiate a return.
          </p>

          <p>
            <span className="p-bold">Non‑Returnable Items:</span> Customized,
            used, or clearance items are not eligible.
          </p>

          <p>
            <span className="p-bold">Refunds:</span> Approved refunds are
            processed within 7–10 business days to the original payment method.
          </p>

          <p>
            <span className="p-bold">
              How to request a return or exchange:
            </span>
          </p>

          <ul>
            <li>Email: Infodrivedna@gmail.com (subject: OrderNumber_exchange)</li>
            <li>WhatsApp: +91 9205957977</li>
            <li>Order number</li>
            <li>Description of the issue</li>
            <li>Clear photos + unboxing video</li>
          </ul>

          <p>
            Our team will contact you within 24 hours to assist with your return,
            exchange, or refund.
          </p>

          <h2 className="text-color mt-4">Cancellation Policy</h2>

          <p>
            <span className="p-bold">Before Dispatch:</span> Cancel within 12
            hours of placing the order.
          </p>

          <p>
            <span className="p-bold">After Dispatch:</span> Once shipped,
            cancellation is not possible.
          </p>

          <p>
            <span className="p-bold">Refund Timeline:</span> Processed within
            7–10 business days.
          </p>

          <p>
            <span className="p-bold">Drive DNA’s Right:</span> We may cancel due
            to stock issues, pricing errors, or suspicious transactions.
          </p>
        </div>
      </div>
    </>
  );
};
