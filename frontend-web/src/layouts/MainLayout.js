import React from "react";

import { ToastContainer } from "react-toastify";

import AppNavbar from "../components/navbar/AppNavbar";
import AppFooter from "../components/footer/AppFooter";

function MainLayout(props) {
  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppNavbar />
      <ToastContainer autoClose={2000} />
      <div className="body flex-grow-1 p-3">{props.page}</div>
      <AppFooter />
    </div>
  );
}

export default MainLayout;
