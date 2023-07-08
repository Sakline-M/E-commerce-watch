import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import axios from "axios";
import { useAuth } from "../../Context/auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

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
                  <h2 className="card-title">Orders</h2>
                  <p>{JSON.stringify(orders, null, 4)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Orders;
