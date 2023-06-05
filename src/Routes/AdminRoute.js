import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../Componants/Spinner/Spinner";
import { useAdmin } from "../hooks/useAdmin";
import { toast } from "react-hot-toast";

const AdminRoute = ({ children }) => {
  const { user, loading, logOut } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const location = useLocation();
  if (loading || isAdminLoading) {
    return <Spinner />;
  }
  if (user?.uid && isAdmin) {
    return children;
  }
  if (!isAdmin) {
    logOut()
      .then((res) => {
        if (res === undefined) {
          toast.error("Sorry, This user is not Admin");
        }
      })
      .catch((err) => {
        if (err.message) {
          toast.error(err.message);
        }
      });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default AdminRoute;
