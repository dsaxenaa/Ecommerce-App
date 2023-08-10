import "./App.css";

import { Route, Routes } from "react-router-dom";

import { About } from "./pages/about";
import { Admin } from "./components/routes/admin";
import { AdminDashboard } from "./pages/admin/adminDash";
import AdminOrders from "./pages/admin/adminOrders";
import CartPage from "./pages/cartPage";
import Categories from "./pages/categories";
import CategoryProduct from "./pages/categoryProduct";
import { Contact } from "./pages/contact";
import CreateCategory from "./pages/admin/createCategory";
import CreateProduct from "./pages/admin/createProduct";
import { Dashboard } from "./pages/users/dashboard";
import { ForgotPassword } from "./pages/forgotPassword";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import Orders from "./pages/users/orders";
import { PageNotFound } from "./pages/pageNotFound";
import { Policy } from "./pages/Policy";
import { Private } from "./components/routes/private";
import ProductDetails from "./pages/productDetails";
import Products from "./pages/admin/products";
import Profile from "./pages/users/profile";
import { Register } from "./pages/register";
import Search from "./pages/search";
import UpdateProduct from "./pages/admin/updateProduct";
import Users from "./pages/admin/users";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/category/:slug" element={<CategoryProduct/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Private />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<Admin />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
