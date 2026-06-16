import React from "react";

const Error404 = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="error-actions">
          <a href="/" className="btn-home">
            Go Home
          </a>
          <button
            className="btn-back"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error404;
