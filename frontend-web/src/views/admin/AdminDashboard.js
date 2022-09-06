import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CButtonGroup, CButton } from "@coreui/react";

import AdminDelivery from "./AdminDelivery";
import AdminPayment from "./AdminPayment";

function AdminDashboard() {
  const [page, setPage] = useState("delivery");

  const handlePageChange = (pageName) => {
    setPage(pageName);
  };

  return (
    <div>
      <h3 className="display-6">Admin Dashboard</h3>

      <CButtonGroup
        role="group"
        aria-label="Basic mixed styles example"
        className="my-3"
      >
        <CButton color="success" onClick={() => handlePageChange("delivery")}>
          Delivery
        </CButton>
        <CButton color="info" onClick={() => handlePageChange("payment")}>
          Payment
        </CButton>
      </CButtonGroup>

      <br />
      {page === "delivery" && <AdminDelivery />}
      {page === "payment" && <AdminPayment />}
    </div>
  );
}

export default AdminDashboard;
