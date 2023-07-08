import React from "react";
import Layout from "../../components/Layouts/Layout";
import { useAuth } from "../../Context/auth";
import AdminMenu from "../../components/Layouts/AdminMenu";

const AdminDashbord = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <>
        <div className="container">
          <div className="row mt-10">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-auto bg-base-100 shadow-xl">

                <div className="card-body items-center text-center">
                  <h2 className="card-title">Admin Name : {auth?.user?.name}</h2>
                  <h2 className="card-title">Admin email : {auth?.user?.email}</h2>
                  <h2 className="card-title">Admin Contact : {auth?.user?.phone}</h2>
                  

                </div>
              </div>

            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default AdminDashbord;
