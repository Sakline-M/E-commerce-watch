import React from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";

const Users = () => {
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
                  <div>All Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Users;
