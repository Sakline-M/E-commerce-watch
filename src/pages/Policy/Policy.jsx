import React from "react";
import Layout from "../../components/Layouts/Layout";

const Policy = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="policy row contactus mt-16 my-auto pl-12">
        <div className="col-md-6 ml-5 mt-20">
          <img
            src="https://i.postimg.cc/Gpjs8Fz6/contactus.webp"
            alt="contactus"
            style={{ width: "90%" }}
          />
        </div>
        <div className="col-md-4 flex my-auto">
          <div className=" flex-col gap-5 text-justify">
            <p>add privacy policy</p>
            <br />
            <p>add privacy policy</p>
            <br />
            <p>add privacy policy</p>
            <br />
            <p>add privacy policy</p>
            <br />
            <p>add privacy policy</p>
            <br />
            <p>add privacy policy</p>
            <br />
            <p>add privacy policy</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
