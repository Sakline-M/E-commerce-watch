import React, { useEffect, useState } from "react";
import UserMenu from "../../components/Layouts/UserMenu";
import Layout from "../../components/Layouts/Layout";
import { useAuth } from "../../Context/auth";
import { toast } from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/auth/profile`,
        { name,email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error)
      }else{
        setAuth({...auth, user:data?.updatedUser})
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth', JSON.stringify(ls))
        toast.success("Profile Updated Sucessfully")
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <>
        <div className="container">
          <div className="row mt-10">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-auto bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                  <div className="hero mt-5">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                      <div className="card flex-shrink-0 max-w-sm shadow-2xl bg-base-100 w-80">
                        <div className="font-medium text-3xl mx-auto pt-1">
                          USER PROFILE
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div className="card-body">
                            <label className="label">
                              <span className="label-text">Name</span>
                            </label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="name"
                              className="input input-bordered"
                            />

                            <label className="label">
                              <span className="label-text">Email</span>
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="email"
                              className="input input-bordered"
                              disabled
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
                              <span className="label-text">Phone</span>
                            </label>
                            <input
                              type="text"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="number"
                              className="input input-bordered"
                            />

                            <label className="label">
                              <span className="label-text">Address</span>
                            </label>

                            <input
                              type="text"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="address"
                              className="input input-bordered"
                            />

                            <button
                              type="submit"
                              className="btn btn-primary mt-2"
                            >
                              UPDATE
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Profile;
