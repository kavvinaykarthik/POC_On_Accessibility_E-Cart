import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import ProductsPage from "./ProductsPage";
import ProfilePage from "./ProfilePage";
import "../index.css"

class Page extends Component {
  render() {
    return (
      <Router>
        <div className="app-container">
          <nav className="navbar">
            <h2 className="logo">My_Mart</h2>
            <div className="nav-links">
              <NavLink to="/" className="link">Home</NavLink>
              <NavLink to="/products" className="link">Products</NavLink>
              <NavLink to="/profile" className="link">Profile</NavLink>
            </div>
          </nav>

          <div className="page-container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default Page;
