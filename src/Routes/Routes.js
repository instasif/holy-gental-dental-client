import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Signup from "../Pages/Signup/Signup";
import NotFound from "../Pages/Notfound/NotFound";
import Appoinment from "../Pages/Appoinment/Appoinment/Appoinment";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import MyAppoinment from "../Pages/Dashboard/MyAppoinment/MyAppoinment";
import Allusers from "../Pages/Dashboard/AllUsers/Allusers";
import AdminRoute from "./AdminRoute";
import AddDoctors from "../Pages/Dashboard/AddDoctors/AddDoctors";
import ManageDoctors from "../Pages/Dashboard/ManageDoctors/ManageDoctors";
import AllBookings from "../Pages/Dashboard/AllBookings/AllBookings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/appoinment",
        element: (
          <PrivateRoute>
            <Appoinment />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <MyAppoinment />,
      },
      {
        path: "/dashboard/users",
        element: (
          <AdminRoute>
            <Allusers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addDoctors",
        element: (
          <AdminRoute>
            <AddDoctors />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageDoctors", //
        element: (
          <AdminRoute>
            <ManageDoctors />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allbookings",
        element: (
          <AdminRoute>
            <AllBookings />
          </AdminRoute>
        ),
      },
    ],
  },
]);
