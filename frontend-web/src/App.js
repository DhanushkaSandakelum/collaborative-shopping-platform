import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Register from "./views/auth/Register";
import Buyer_Dashboard from "./views/buyer/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/buyer" element={<MainLayout page={<Buyer_Dashboard />} />} />
        <Route exact path="/register" element={<MainLayout page={<Register />} />} />
      </Routes>
    </Router>
  );
}

export default App;
