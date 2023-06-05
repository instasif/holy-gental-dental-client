import React from "react";

const InfoCard = ({ data }) => {
  const { name, description, icon, bg } = data;
  return (
    <div className={`card md:card-side shadow-xl p-5 bg-${bg}`}>
      <figure>
        <img src={icon} alt="icon" />
      </figure>
      <div className="card-body text-white">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
