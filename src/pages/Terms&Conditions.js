import React from "react";
import { Helmet } from "react-helmet-async";

export const Terms = () => {
  return (
    <>
      {/* ✅ SEO */}
      <Helmet>
        <title>Terms & Conditions | Drive DNA – Premium Car Accessories & Modification Parts</title>

        <meta
          name="description"
          content="Read the Terms and Conditions of Drive DNA. Learn about order policies, pricing, usage rules, and legal information for our car accessories store."
        />

        <link rel="canonical" href="https://drivedna.in/terms&conditions" />

        {/* Open Graph */}
        <meta property="og:title" content="Terms & Conditions | Drive DNA" />
        <meta
          property="og:description"
          content="Review Drive DNA’s terms for purchasing car accessories, website usage, pricing, and liability policies."
        />
        <meta property="og:url" content="https://drivedna.in/terms&conditions" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms & Conditions | Drive DNA" />
        <meta
          name="twitter:description"
          content="Official Terms & Conditions for shopping premium car accessories at Drive DNA."
        />
      </Helmet>

      <div className="footer-container">
        <div className="text">
          <h1 className="text-color">Terms and Conditions</h1>

          <p>
            By using our website and making a purchase from Drive DNA, you agree
            to comply with the following terms and conditions:
          </p>

          <p>
            <span className="p-bold">1. Product Accuracy:</span> We strive to
            ensure that all descriptions, images, and prices are accurate.
            However, slight variations may occur due to product updates or screen
            display differences.
          </p>

          <p>
            <span className="p-bold">2. Order Acceptance:</span> All orders are
            subject to acceptance and availability. Drive DNA reserves the right
            to cancel or refuse any order if an item is out of stock, mispriced, or
            suspected of fraudulent activity.
          </p>

          <p>
            <span className="p-bold">3. Pricing:</span> Prices are listed in INR
            and include all applicable taxes unless otherwise stated.
          </p>

          <p>
            <span className="p-bold">4. Use of Website:</span> Users must not
            misuse the website by introducing harmful software, attempting
            unauthorized access, or interfering with website functionality.
          </p>

          <p>
            <span className="p-bold">5. Liability:</span> Drive DNA shall not be
            held liable for indirect or consequential damages arising from the
            use or inability to use our products.
          </p>

          <p>
            *Note: All legal actions or disputes arising out of or in connection
            with the use of this website or any of its services shall be subject
            to the exclusive jurisdiction of the courts in Delhi, India.
          </p>
        </div>
      </div>
    </>
  );
};
