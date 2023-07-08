import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  //All state
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/single-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);

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
      toast.error("Somthing went wrong");
    }
  };
  //useEffect
  useEffect(() => {
    getAllCategory();
  }, []);

  //craete product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashbord/admin/products");
      } else {
        toast.error("Not Working")
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Succfully");
      navigate("/dashbord/admin/products");
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
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-auto bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                  <div className="text-4xl font-bold">Update Product</div>
                  <div className="m-1 w-75">
                    <Select
                      bordered={false}
                      placeholder="Select a category"
                      size="large"
                      showSearch
                      className="form-select mb-3"
                      onChange={(value) => {
                        setCategory(value);
                      }}
                      value={category.name}
                    >
                      {categories?.map((c) => (
                        <Option key={c._id} value={c._id}>
                          {c.name}
                        </Option>
                      ))}
                    </Select>
                    {/* photo upload */}
                    <div className="mb-3">
                      <label className="btn btn-outline-secondary col-md-12">
                        {photo ? photo.name : "Upload Photo"}
                        <input
                          type="file"
                          name="photo"
                          accept="image/*"
                          onChange={(e) => setPhoto(e.target.files[0])}
                          hidden
                        />
                      </label>
                    </div>
                    <div className="mb-3">
                      {photo ? (
                        <div className="text-center">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt="product-photo"
                            height={"200px"}
                            className="img img-responsive"
                          />
                        </div>
                      ) : (
                        <div className="text-center">
                          <img
                            src={`http://localhost:8080/api/v1/product/product-photo/${id}`}
                            alt="product_photo"
                            height={"200px"}
                            className="img img-responsive"
                          />
                        </div>
                      )}
                    </div>
                    {/* Product name  */}
                    <div className="mb-3">
                      <input
                        type="text"
                        value={name}
                        placeholder="write a name"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    {/* Description */}
                    <div className="mb-3">
                      <textarea
                        type="text"
                        value={description}
                        placeholder="write a description"
                        className="form-control"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    {/* Price */}
                    <div className="mb-3">
                      <input
                        type="number"
                        value={price}
                        placeholder="write a Price"
                        className="form-control"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    {/* Quantity */}
                    <div className="mb-3">
                      <input
                        type="number"
                        value={quantity}
                        placeholder="write a quantity"
                        className="form-control"
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                    {/* Shiping */}
                    <div className="mb-3">
                      <Select
                        bordered={false}
                        placeholder="Select Shipping "
                        size="large"
                        showSearch
                        className="form-select mb-3"
                        onChange={(value) => {
                          setShipping(value);
                        }}
                        value={shipping ? "yes" : "No"}
                      >
                        <Option value="1">Yes</Option>
                        <Option value="0">No</Option>
                      </Select>
                    </div>
                    <div className="mb-3">
                      <button
                        className="btn btn-primary"
                        onClick={handleUpdate}
                      >
                        UPDATE PRODUCT
                      </button>
                      <button className="btn btn-danger" onClick={handleDelete}>
                        DELETE PRODUCT
                      </button>
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

export default UpdateProduct;
