import React from "react";
import quote from "../../../assets/icons/quote.svg";
import people1 from "../../../assets/images/people1.png";
import people2 from "../../../assets/images/people2.png";
import people3 from "../../../assets/images/people3.png";
import TestmonialCard from "./TestmonialCard";

const Tesrimonial = () => {
  const datas = [
    {
      name: "Winson Herry",
      review:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      img: people1,
      location: "Calfornia",
    },
    {
      name: "Maleka Banu",
      review:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      img: people2,
      location: "Calfornia",
    },
    {
      name: "Jorina Khondokar",
      review:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      img: people3,
      location: "Calfornia",
    },
  ];

  return (
    <section className="my-16">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-xl text-primary text-bold">Tesrimonial</h4>
          <h2 className="text-4xl">What Our Patients Says</h2>
        </div>
        <figure>
          <img className="lg:w-48 w-24" src={quote} alt="" />
        </figure>
      </div>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        {
            datas.map((data, index) => (
                <TestmonialCard key={index} data={data}/>
            ))
        }
      </div>
    </section>
  );
};

export default Tesrimonial;
