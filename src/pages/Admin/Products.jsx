import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layouts/AdminMenu";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all product
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Somthing Went Wrong");
    }
  }; //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="text-center text-4xl font-bold">
                All Products List
              </div>
              <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <Link key={p._id} to={`/dashbord/admin/product/${p.slug}`}>
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <img
                        src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt="p.name"
                      />

                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Products;
