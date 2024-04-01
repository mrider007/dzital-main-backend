import React from "react"; 
import { useNavigate, Outlet } from "react-router-dom";
import { useAppContext } from "../../contextApi/AppContext";
import Login from "./Login";
import Spinner from "react-bootstrap/Spinner";

function ProtectedRoute() {
  const navigate = useNavigate();
  const { isLogIn,loading } = useAppContext();

  if (loading===true) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <Spinner animation="border" role="status" variant="info">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!isLogIn) {
    navigate("/login");
    return <Login />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
