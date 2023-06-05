import React from "react";
import flouride from "../../../assets/images/fluoride.png";
import cavity from "../../../assets/images/cavity.png";
import whitening from "../../../assets/images/whitening.png";
import Service from "./Service";

const Services = () => {
  const datas = [
    {
      img: flouride,
      name: "Fluoride Treatment",
      descpription:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
    },
    {
      img: cavity,
      name: "Cavity Filling",
      descpription:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
    },
    {
      img: whitening,
      name: "Teeth Whitening",
      descpription:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
    },
  ];

  return (
    <>
      <div className="text-center">
        <h3 className="text-xl text-primary uppercase text-bold">
          Our Services
        </h3>
        <h2 className="text-2xl font-semibold">Services We Provide</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
        {datas.map((data, index) => (
          <Service key={index} data={data} />
        ))}
      </div>
    </>
  );
};

export default Services;
