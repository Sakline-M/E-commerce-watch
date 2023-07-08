import React from "react";
import Layout from "../../components/Layouts/Layout";
const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus mt-16 my-auto pl-12">
        <div className="col-md-6">
          <img
            src="https://i.postimg.cc/mgw7J9vb/about.webp"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4 flex my-auto">
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
