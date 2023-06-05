import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Spinner from "../../../Componants/Spinner/Spinner";
import ConfirmModal from "../../Shared/ConfirmModal/ConfirmModal";
import { toast } from "react-hot-toast";

const AllBookings = () => {
  const [allBooking, setAllBooking] = useState(null);
  const closeModal = () => {
    setAllBooking(null);
  };
  const url = "http://localhost:5000/allBookings";
  const { data: allBookings, isLoading, refetch } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const handleDeleteAppoinment = (appoinment) => {
    console.log(appoinment);
    fetch(`http://localhost:5000/allBookings/${appoinment?._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`Successfully deleted Dr. ${appoinment.patient}`);
        }
        refetch();
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mt-[7%]">
      <h2 className="text-3xl mb-5">All The Bookings</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Treatment</th>
              <th>Date</th>
              <th>Time</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allBookings?.map((booking, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{booking?.patient}</td>
                <td>{booking?.treatment}</td>
                <td>{booking?.appoinmentDate}</td>
                <td>{booking?.slot}</td>
                <td>
                  <label
                    htmlFor="confirmationModal"
                    onClick={() => setAllBooking(booking)}
                    className="btn btn-xs bg-red-600 text-white border-none"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {allBooking && (
        <ConfirmModal
          title={`Are you sure you want to delete?`}
          closeModal={closeModal}
          modalData={allBooking}
          handleDelete={handleDeleteAppoinment}
          successBtnName={"delete"}
          closeBtnName={"cancel"}
        />
      )}
    </div>
  );
};

export default AllBookings;
