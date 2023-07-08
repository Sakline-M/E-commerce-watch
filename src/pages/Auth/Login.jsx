import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { useNavigate,useLocation, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const location = useLocation()

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate( location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="hero mt-5">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 max-w-sm shadow-2xl bg-base-100 w-80">
            <div className="font-medium text-3xl mx-auto pt-1">Login Page</div>
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  className="input input-bordered"
                />

                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="input input-bordered"
                />

                <label className="label">
                  <Link to="/forgot-password" className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>

                <button type="submit" className="btn btn-primary mt-2">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
