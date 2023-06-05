import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddDoctors = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { data: specialties = [] } = useQuery({
    queryKey: ["appoinmentSpecialty"],
    queryFn: async () => {
      const res = await fetch(
        "https://holy-gental-dental-server.vercel.app/appoinmentSpecialty"
      );
      const data = res.json();
      return data;
    },
  });

  const imgHostKey = process.env.REACT_APP_imgbbKey;

  const handleDoctorsForm = (data) => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        const doctor = {
          name: data.name,
          email: data.email,
          specialty: data.specialty,
          photo: imgData.data.url,
        };

        //? save doctors info to the database
        fetch("https://holy-gental-dental-server.vercel.app/doctors", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(doctor),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if (res.acknowledged) {
              toast.success(`Dr. ${data.name} added successfully!`);
              navigate("/dashboard/manageDoctors");
            }
          });
      });
  };
  return (
    <div className="mt-[7%]">
      <h2 className="text-3xl mb-5">Add Doctors</h2>

      <form onSubmit={handleSubmit(handleDoctorsForm)} className=" ms-4">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="name"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.name && (
            <p role="alert" className="text-red-600 mt-2 text-xs">
              {errors.name?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.email && (
            <p role="alert" className="text-red-600 mt-2 text-xs">
              {errors.email?.message}
            </p>
          )}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Specialty</span>
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            {...register("specialty", { required: true })}
          >
            {specialties?.map((specialty, index) => (
              <option key={index} value={specialty?.name}>
                {specialty?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            placeholder="file"
            {...register("img", { required: "Photo is required" })}
            className="input w-full max-w-xs"
          />
          {errors.img && (
            <p role="alert" className="text-red-600 mt-2 text-xs">
              {errors.img?.message}
            </p>
          )}
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary bg-gradient-to-r from-secondary to-primary w-full max-w-xs mt-3 text-white"
        />
      </form>
    </div>
  );
};

export default AddDoctors;
