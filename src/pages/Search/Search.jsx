import React from "react";
import Layout from "../../components/Layouts/Layout";
import { useSearch } from "../../Context/Search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  // eslint-disable-next-line
  const [values, setValues] = useSearch();
  const navigate = useNavigate()
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1 className="text-5xl font-medium mt-4">Search Result</h1>
          <h6>
            {values?.length < 1
              ? "No Product Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
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

export default Search;
