import React from "react";
import InfoCard from "./InfoCard";
import clock from "../../../assets/icons/clock.svg";
import marker from "../../../assets/icons/marker.svg";
import phone from "../../../assets/icons/phone.svg";

const InfoCards = () => {
  const datas = [
    {
      name: "Opening Hours",
      description: "Open 6.00 am to 5.00 om everyday",
      icon: clock,
      bg: "gradient-to-r from-secondary to-primary",
    },
    {
      name: "Visit our location",
      description: "Brooklyn, NY 10036, United States",
      icon: marker,
      bg: "gradient-to-r from-secondary to-primary",
    },
    {
      name: "Contact us now",
      description: "+000 123 456789",
      icon: phone,
      bg: "gradient-to-r from-secondary to-primary",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3  mt-8 mb-32">
      {datas.map((data, index) => (
        <InfoCard key={index} data={data} />
      ))}
    </div>
  );
};

export default InfoCards;
