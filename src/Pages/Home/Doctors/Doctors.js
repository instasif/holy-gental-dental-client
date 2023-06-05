import React from "react";
import DoctorsCard from "./DoctorsCard";
import { useQuery } from "@tanstack/react-query";

const Doctors = () => {
  const { data: doctors = [] } = useQuery({
    queryKey: "allDoctors",
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/allDoctors");
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className="mt-[100px] lg:mb-[200px]">
      <div className="text-center">
        <h3 className="text-xl text-primary uppercase text-bold">
          Our Doctors
        </h3>
        <h2 className="text-2xl font-semibold">Dedicated Doctors</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
        {doctors.map((doctor) => (
          <DoctorsCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default Doctors;
