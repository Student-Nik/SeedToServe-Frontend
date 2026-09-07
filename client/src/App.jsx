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
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import OnlyAdminAllowed from "./components/OnlyAdminAllowed";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
import AdminDeliveryBoys from "./pages/admin/AdminDeliveryBoys";

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

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        {/* Farmer Routes */}
        <Route element={<OnlyFarmerAllowed />}>
          <Route path="/farmer-popup" element={<FarmerPopup />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/addproducts" element={<AddProduct />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<OnlyAdminAllowed />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            {/* <Route path="/admin/profile" element={<AdminProfile />} /> */}
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />
            <Route path="/admin/delivery-boys" element={<AdminDeliveryBoys />} />
          </Route>
        </Route>

        {/* User Dashboard */}
        <Route path="/dashboard" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="order-details" element={<OrderDetailsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
