import { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spain from "../Spain";



const  PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  // eslint-disable-next-line 
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`http://localhost:8080/api/v1/auth/user-auth`);
      if(res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet/> : <Spain/>
}

export default PrivateRoute;
