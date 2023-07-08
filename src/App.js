import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Pagenotfoud from "./pages/Pagenotfoud";
import Policy from "./pages/Policy/Policy";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashbord from "./pages/User/Dashbord";
import PrivetRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/Admn";
import AdminDashbord from "./pages/Admin/AdminDashbord";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/User/Orders";
import Profile from "./pages/User/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search/Search";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Categories from "./pages/Categories/Categories";
import CategoryProduct from "./pages/Categories/CategoryProduct";
import CartPage from "./pages/Cart/CartPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:slug" element={<ProductDetails/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/category/:slug" element={<CategoryProduct/>} />
        <Route path="/search" element={<Search />} />

        {/* user private Dashbord route */}
        <Route path="/dashbord" element={<PrivetRoute />}>
          <Route path="user" element={<Dashbord />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        {/* Admin Private Dashbord Route */}
        <Route path="/dashbord" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashbord />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct/>} />
          <Route path="admin/products" element={<Products/>} />
          <Route path="admin/users" element={<Users />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privecy" element={<Policy />} />
        <Route path="/*" element={<Pagenotfoud />} />
      </Routes>
    </>
  );
}

export default App;
