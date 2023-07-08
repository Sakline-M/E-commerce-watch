import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewpassword] = useState("");

  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const location = useLocation();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/forgot-password",
        {
          email,
          newPassword,
          answer,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
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
            <div className="font-medium text-3xl mx-auto pt-1">
              RESET PASSWORD
            </div>
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
                  <span className="label-text">Answer</span>
                </label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="What is your fab food?"
                  className="input input-bordered"
                />

                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewpassword(e.target.value)}
                  placeholder="password"
                  className="input input-bordered"
                />

                <button type="submit" className="btn btn-primary mt-2">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
