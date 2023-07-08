import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import {} from "antd";
import Modal from "antd/es/modal/Modal";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setname] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //handle form created
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        setname("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong in nput form");
    }
  };
  // get all category
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

  // update Category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    }
  };

  //Delete Category
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${pid}`
      );
      if (data.success) {
        toast.success(`Category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
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
                  <div>
                    <h1 className="font-bold text-5xl">Manege Category</h1>
                    <div className="p-3">
                      <CategoryForm
                        handleSubmit={handleSubmit}
                        value={name}
                        setValue={setname}
                      />
                    </div>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories?.map((c) => (
                        <>
                          <tr>
                            <td key={c._id}>{c.name}</td>
                            <td>
                              <button
                                className="btn btn-info ms-2"
                                onClick={() => {
                                  setVisible(true);
                                  setUpdatedName(c.name);
                                  setSelected(c);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger ms-2"
                                onClick={() => {
                                  handleDelete(c._id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default CreateCategory;
