import React from "react";

const DoctorsCard = ({ doctor }) => {
  const { name, specialty, photo } = doctor;
  return (
    <a href="/" className="group relative block bg-black">
      <img
        alt="Developer"
        src={photo}
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
      />

      <div className="relative p-4 sm:p-6 lg:p-8">
        <p className="text-sm font-medium uppercase tracking-widest text-secondary">
          Specialty: {specialty}
        </p>

        <p className="text-xl font-bold text-white sm:text-2xl">{name}</p>

        <div className="mt-32 sm:mt-48 lg:mt-64">
          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm text-white">
              Dr. Victor Pearlywhite is a highly skilled and charismatic dentist
              with a passion for creating confident smiles. With a gentle touch
              and a friendly demeanor, he has been providing exceptional dental
              care for over a decade. 
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default DoctorsCard;
