import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/cart";
import { toast } from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //Get All Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //useEffect
  useEffect(() => {
    getAllCategory();
  }, []);

  //get All products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //useEffect getTotal
  useEffect(() => {
    getTotal();
  }, []);

  // Load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line
  }, [page]);

  //filter by  category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    // eslint-disable-next-line
  }, [checked, radio]);

  //get Filter Prduct
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row mt-14">
          <div className="col-md-2">
            <h6 className=" text-4xl">Filter By Category</h6>
            <div className="d-flex flex-col mt-2 text-3xl font-semibold">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* Price Filter */}
            <h6 className=" text-4xl mt-4">Filter By Prices</h6>
            <div className="d-flex flex-col mt-2 text-3xl font-semibold">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-col mt-2 text-3xl font-semibold">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                Reset Filter
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h1 className="text-center text-4xl fonr-bold">All Products</h1>
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
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem('cart', JSON.stringify([...cart, p]))
                          toast.success("Item Added to Cart")
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "Loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
