import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Spinner from "../../../Componants/Spinner/Spinner";
import ConfirmModal from "../../Shared/ConfirmModal/ConfirmModal";
import { toast } from "react-hot-toast";

const ManageDoctors = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);

  const closeModal = () => {
    setDeletingDoctor(null);
  };

  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: "doctors",
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/doctors", {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = res.json();
      return data;
    },
  });

  const handleDeleteDoctor = (doctor) => {
    fetch(`http://localhost:5000/doctors/${doctor?._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`Successfully deleted Dr. ${doctor.name}`);
        }
        refetch();
      });
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="mt-[7%]">
      <p className="text-3xl mb-5">Manage Doctors: {doctors?.length}</p>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Photo</th>
              <th>Name</th>
              <th>Specialty</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {doctors?.map((doctor, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td className="avatar placeholder">
                  <div className="rounded-full w-12">
                    <img src={doctor?.photo} alt="doctor" />
                  </div>
                </td>
                <td>{doctor?.name}</td>
                <td>{doctor?.specialty}</td>
                <td>{doctor?.email}</td>
                <td>
                  <label
                    htmlFor="confirmationModal"
                    onClick={() => setDeletingDoctor(doctor)}
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
      {deletingDoctor && (
        <ConfirmModal
          title={`Are you sure you want to delete?`}
          message={`If you delete Dr. ${deletingDoctor?.name} It can't be recover it.`}
          closeModal={closeModal}
          handleDelete={handleDeleteDoctor}
          modalData={deletingDoctor}
          successBtnName={"delete"}
          closeBtnName={"cancel"}
        />
      )}
    </div>
  );
};

export default ManageDoctors;
