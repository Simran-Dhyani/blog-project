import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // user NOT logged in but route needs auth
    if (authentication && !authStatus) {
      navigate("/login");
    }

    // user logged in but route is public
    if (!authentication && authStatus) {
      navigate("/");
    }

    setLoader(false);
  }, [authStatus, authentication, navigate]);

  if (loader) return <h1>Loading...</h1>;

  return <>{children}</>;
}

export default AuthLayout;
