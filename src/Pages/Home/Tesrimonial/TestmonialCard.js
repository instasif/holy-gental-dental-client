import React from "react";

const TestmonialCard = ({ data }) => {
  const { name, img, location, review } = data;
  return (
    <div className="card shadow-xl">
      <div className="card-body">
        <p>{review}</p>
        <div className="flex gap-4 items-center mt-6">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={img} alt="users" />
            </div>
          </div>
          <div>
            <h5 className="text-lg">{name}</h5>
            <p>{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestmonialCard;
