import React from "react";
import Layout from "../../components/Layouts/Layout";
import { useCart } from "../../Context/cart";
import { useAuth } from "../../Context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  //total Price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>{`Hello ${auth?.token && auth?.user?.name}`}</h1>
            <h4 className="text-4xl text-center">
              {cart?.length > 0
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please Login to Checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row m-2 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top my-2"
                    alt="p.name"
                  />
                </div>
                <div className="col-md-8 mt-5">
                  <h6 className="text-3xl">{p.name}</h6>
                  <p className="text-lg">{p.description.substring(0, 30)}</p>
                  <h4 className="text-2xl">Price : {p.price}</h4>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h4 className="text-4xl">Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4 className="text-4xl">Total : {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashbord/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate('/dashbord/user/profile')}
                  >UPDATE USER</button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login")}>
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
