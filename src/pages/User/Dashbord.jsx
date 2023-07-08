import React from 'react'
import Layout from '../../components/Layouts/Layout'
import UserMenu from '../../components/Layouts/UserMenu'
import { useAuth } from "../../Context/auth";

const Dashbord = () => {
  const [auth] = useAuth()
  return (
    <Layout>
      <>
        <div className="container">
          <div className="row mt-10">
            <div className="col-md-3">
              <UserMenu/>
            </div>
            <div className="col-md-9">
              <div className="card w-auto bg-base-100 shadow-xl">

                <div className="card-body items-center text-center">
                <h2 className="card-title">{auth?.user?.name}</h2>
                <h2 className="card-title">{auth?.user?.email}</h2>
                <h2 className="card-title">{auth?.user?.address}</h2>
                </div>
              </div>

            </div>
          </div>
        </div>
      </>
    </Layout>
  )
}

export default Dashbord