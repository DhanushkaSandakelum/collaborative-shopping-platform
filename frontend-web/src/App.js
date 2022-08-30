import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./views/public/Home";

import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Buyer_Dashboard from "./views/buyer/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<MainLayout page={<Home />} />} />
        <Route exact path="/" element={<MainLayout page={<Home />} />} />
        <Route exact path="/buyer" element={<MainLayout page={<Buyer_Dashboard />} />} />
        <Route exact path="/login" element={<MainLayout public={true} page={<Login />} />} />
        <Route exact path="/register" element={<MainLayout public={true} page={<Register />} />} />
      </Routes>
    </Router>
  );
}

export default App;
