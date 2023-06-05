import React from "react";
import doctor from "../../../assets/images/doctor-small.png";
import appointment from "../../../assets/images/appointment.png";
import PrimaryBtn from "../../../Componants/PrimaryBtn/PrimaryBtn";
import { Link } from "react-router-dom";

const Doctor = () => {
  return (
    <div
      className="hero mt-32 h[533px] "
      style={{ backgroundImage: `url(${appointment})` }}
    >
      <div className="hero-content flex-col lg:flex-row pb-0">
        <img
          src={doctor}
          className="-mt-32 lg:w-1/2 rounded-lg shadow-2xl bg-none lg:flex hidden "
          alt="doctor"
        />
        <div className="text-white">
          <h3 className="text-xl font-bold text-primary">Appoinment</h3>
          <h1 className="text-4xl font-bold">Make an appointment Today</h1>
          <p className="py-6">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsumis that it has a more-or-less normal
            distribution of letters,as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page
          </p>
            <Link to={"/appoinment"}>
              <PrimaryBtn>Appoinment</PrimaryBtn>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Doctor;

//    