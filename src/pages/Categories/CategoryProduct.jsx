import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layouts/Layout";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <h1 className="text-6xl text-center mt-5">{category?.name}</h1>
        <h1 className="text-2xl text-center">{products?.length} result found</h1>
        <div className="row">
        <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt="p.name"
                  />

                  <div className="card-body">
                    <div>
                      <h5 className="card-title text-xl">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 30)}...
                      </p>
                      <p className="card-text"> $ {p.price}</p>
                    </div>
                    <div className="flex gap-1 pr-5 pt-3">
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => navigate(`/product/${p.slug}`)}>
                        More Details
                      </button>
                      <button className="btn btn-sm btn-success">
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
