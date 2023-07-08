import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initial  details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/single-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row pt-12">
          <div className="card card-side bg-base-100 shadow-xl ">
            <figure>
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
              />
            </figure>
            <div className="card-body">
              <h1 className="text-3xl">Product Details</h1>
              <hr />
              <h2 className="card-title pt-2">Name :{product.name}</h2>
              <h6>Price : {product.price}</h6>
              <h6>Category : {product.category?.name}</h6>
              <h6>Description : {product.description}</h6>
              <button className="btn btn-info ms-1 w-36 text-white">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <h1>Similar Product not working</h1>
          {/* <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
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
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-sm btn-success">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
