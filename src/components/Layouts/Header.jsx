import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import toast from "react-hot-toast";
import SearchInout from "../Form/SearchInout";
import useCategory from "../../hooks/useCategory";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/cart";
import { Badge } from "antd";

const Header = () => {
  const navigete = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start ">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>
        <Link
          to={"/"}
          className="btn btn-ghost normal-case font-bold ml-5 text-3xl"
        >
          E-COMMERCE APP
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex ml-3">
        <ul className="menu menu-horizontal px-1 text-xl">
          <SearchInout />
          <li className=" rounded  hover:bg-sky-200">
            <Link to="/">HOME</Link>
          </li>

          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to={"/categories"}
              id="navbarDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Category
            </Link>
            <div className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to={"/categories"}>
                  All Categories
                </Link>
              </li>
              {categories?.map((c) => (
                <li>
                  <Link className="dropdown-item" to={`/category/${c.slug}`}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </div>
          </li>

          {!auth.user ? (
            <>
              <li className=" rounded hover:bg-sky-200">
                <Link to="/register">REGISTER</Link>
              </li>
              <li className=" rounded hover:bg-sky-200">
                <Link to="/login">LOGIN</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {auth?.user?.name}
                </NavLink>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={`/dashbord/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      DASHBORD
                    </NavLink>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="dropdown-item rounded hover:bg-sky-200"
                    >
                      LOGOUT
                    </NavLink>
                  </li>
                </div>
              </li>
            </>
          )}

          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <Badge >
                  <div className="indicator ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 "
                      fill="none "
                      viewBox="0 0 24 24 "
                      stroke="currentColor"
                      onClick={() => navigete("/cart")}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z "
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item font-bold text-sm text-green-500 bg-white-400">
                      {cart?.length}
                    </span>
                  </div>
                </Badge>
              </label>
              <div
                tabIndex={0}
                className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
              ></div>
            </div>
            <div className="dropdown dropdown-end"></div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
