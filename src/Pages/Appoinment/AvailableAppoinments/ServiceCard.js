import React from "react";

const ServiceCard = ({ service, setTreatment }) => {
  const { name, slots } = service;
  return (
    <div className="card w-[425px] shadow-xl">
      <div className="card-body  text-center">
        <h2 className="text-2xl text-secondary font-semibold">{name}</h2>
        <p>{slots.length > 0 ? slots[0] : "Try another day!"}</p>
        <p>
          {slots.length} {slots.length > 1 ? "spaces" : "space"} available
        </p>
        <label
          htmlFor="appoinmentModal"
          disabled={slots.length === 0}
          className="btn btn-primary bg-gradient-to-r from-secondary to-primary text-white"
          onClick={() => setTreatment(service)}
        >
          Book Appoinment
        </label>
      </div>
    </div>
  );
};

export default ServiceCard;
