import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./views/public/Home";

import Login from "./views/auth/Login";
import Register from "./views/auth/Register";

import BuyerDashboard from "./views/buyer/BuyerDashboard";
import SellerDashboard from "./views/seller/SellerDashboard";

import Item from "./views/item/Item";
import Payment from "./views/payment/Payment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<MainLayout page={<Home />} />} />
        <Route exact path="/" element={<MainLayout page={<Home />} />} />
        <Route exact path="/buyer" element={<MainLayout page={<BuyerDashboard />} />} />
        <Route exact path="/seller" element={<MainLayout page={<SellerDashboard />} />} />
        <Route exact path="/item" element={<MainLayout page={<Item />} />} />
        <Route exact path="/item/payment" element={<MainLayout page={<Payment />} />} />

        <Route exact path="/login" element={<MainLayout public={true} page={<Login />} />} />
        <Route exact path="/register" element={<MainLayout public={true} page={<Register />} />} />
      </Routes>
    </Router>
  );
}

export default App;
