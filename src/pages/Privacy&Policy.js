import React from "react";
import { Helmet } from "react-helmet-async";

export const Privacy = () => {
  return (
    <>
      {/* ✅ SEO */}
      <Helmet>
        <title>Privacy Policy | Drive DNA – Premium Car Accessories & Modification Parts</title>

        <meta
          name="description"
          content="Read Drive DNA’s Privacy Policy to learn how we collect, use, and protect your personal data when shopping for car accessories and modification parts."
        />

        <link rel="canonical" href="https://drivedna.in/privacy&policy" />

        {/* Open Graph */}
        <meta property="og:title" content="Privacy Policy | Drive DNA" />
        <meta
          property="og:description"
          content="Learn how Drive DNA protects your data, privacy, and personal information while shopping car accessories online."
        />
        <meta property="og:url" content="https://drivedna.in/privacy&policy" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy | Drive DNA" />
        <meta
          name="twitter:description"
          content="Drive DNA Privacy Policy for secure shopping of car accessories and modification parts."
        />
      </Helmet>

      <div className="footer-container">
        <div className="text">
          <h1 className="text-color">Privacy Policy</h1>

          <p>
            At Drive DNA, we value your privacy and are committed to protecting
            your personal information.
          </p>

          <p>
            <span className="p-bold">Information We Collect:</span> We collect only
            necessary details such as name, contact number, address, and payment
            details to process your order.
          </p>

          <p>
            <span className="p-bold">Data Usage:</span> Your data is used solely
            for order fulfilment, delivery, and customer support.
          </p>

          <p>
            <span className="p-bold">Data Security:</span> All sensitive
            information (such as payment details) is encrypted and processed
            securely through trusted payment gateways.
          </p>

          <p>
            <span className="p-bold">Third-Party Disclosure:</span> We never sell,
            trade, or rent your personal information to third parties.
          </p>

          <p>
            <span className="p-bold">Cookies:</span> Our website may use cookies to
            enhance user experience and track preferences.
          </p>

          <p>
            <span className="p-bold">User Rights:</span> You may request deletion
            or modification of your personal data by contacting our support team.
          </p>
        </div>
      </div>
    </>
  );
};
