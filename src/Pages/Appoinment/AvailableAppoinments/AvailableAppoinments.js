import React, { useState } from "react";
import { format } from "date-fns";
import ServiceCard from "./ServiceCard";
import BookingModal from "../BookingModal/BookingModal";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../Componants/Spinner/Spinner";

const AvailableAppoinments = ({ selectedDate }) => {
  const date = format(selectedDate, "PP");
  /*
  !treatment is just another name of services  
  ? this is modal open & close state
  */
  const [treatment, setTreatment] = useState(null);

  //!use empty array or isLoading
  const {
    data: services,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["appoinmentOptions", date],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/appoinmentOptions?date=${date}`
      );
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <p className="text-center text-2xl font-bold text-secondary mt-16">
        Available Appoinments on {format(selectedDate, "PP")}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 my-12">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            service={service}
            setTreatment={setTreatment}
          />
        ))}
      </div>
      {treatment && (
        <BookingModal
          treatment={treatment}
          selectedDate={selectedDate}
          setTreatment={setTreatment}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default AvailableAppoinments;
