import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import UserLayout from "./layouts/UserLayout";

import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";

import AuthSuccess from "./components/AuthSucess";
import OnlyFarmerAllowed from "./components/OnlyFramerAllowed";

import FarmerPopup from "./pages/Farmer/FarmerPopup";
import AddCategory from "./pages/Farmer/AddCategory";
import AddProduct from "./pages/Farmer/AddProducts";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Products from "./pages/dashboard/Products";
import ProductDetails from "./pages/dashboard/ProductDetails";

const App = () => {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/auth-success" element={<AuthSuccess />} />

      {/* Landing Page */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
      </Route>

      {/* Farmer Routes */}
      <Route element={<OnlyFarmerAllowed />}>
        <Route path="/farmer-popup" element={<FarmerPopup />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/addproducts" element={<AddProduct />} />
      </Route>

      {/* User Dashboard */}
      <Route path="/dashboard" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
};

export default App;
