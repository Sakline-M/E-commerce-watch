import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spain = ({ path = "login" }) => {
  const [count, setcount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setcount((preValue) => --preValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <>
      <div className="flex justify-center items-center mt-96">
        <h1 className="font-medium">Redirecting to you in {count} second</h1>
        <span className="loading loading-spinner text-info  "></span>
      </div>
    </>
  );
};

export default Spain;
