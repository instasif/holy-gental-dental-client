import React from "react";
import { DayPicker } from "react-day-picker";
import chair from "../../../assets/images/chair.png";
import bg from "../../../assets/images/bg.png";

const AppoinmentBanner = ({ selectedDate, setSelectedDate }) => {
  return (
    <header className="py-8 h-3/5 me-12" style={{ backgroundImage: `url(${bg})` }}>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse gap-12 justify-center align-content-center">
          <img
            src={chair}
            className="max-w-sm lg:w-1/2 rounded-lg shadow-2xl"
            alt="chair"
          />
          <div>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppoinmentBanner;
