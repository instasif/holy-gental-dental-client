import React, { useContext } from "react";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";
import { AuthContext } from "../Contexts/AuthProvider"; // 

const DashboardLayout = () => {
  const {user} = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);

  const list = (
    <ul className="menu p-4 mt-14 w-80 bg-base-100 text-base-content">
      <li>
        <Link to="/dashboard">My Appoinments</Link>
      </li>
      {isAdmin && (
        <>
          <li>
            <Link to="/dashboard/allbookings">All The Bookings</Link>
          </li>
          <li>
            <Link to="/dashboard/users">All Users</Link>
          </li>
          <li>
            <Link to="/dashboard/addDoctors">Add Doctors</Link>
          </li>
          <li>
            <Link to="/dashboard/manageDoctors">Manage Doctors</Link>
          </li>
        </>
      )}
    </ul>
  );
  return (
    <div>
      <Navbar />

      <div className="drawer drawer-mobile">
        <input
          id="dashboard-toggle"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-toggle" className="drawer-overlay"></label>
          {list}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
