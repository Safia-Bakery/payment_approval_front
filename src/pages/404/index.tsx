import React from "react";

const NotFound = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">Страница не найдена.</p>
        <a href="/history-orders" className="btn btn-primary">
          На главное
        </a>
      </div>
    </div>
  );
};

export default NotFound;
