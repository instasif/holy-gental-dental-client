import React from 'react';
import Banner from './Banner/Banner';
import InfoCards from './InfoCards/InfoCards';
import Services from './Services/Services';
import Doctor from './Doctor/Doctor';
import Tesrimonial from './Tesrimonial/Tesrimonial';
import Doctors from './Doctors/Doctors';

const Home = () => {
    return (
      <div className="mx-5">
        <Banner />
        <InfoCards />
        <Services />
        <Doctors />
        <Doctor />
        <Tesrimonial />
      </div>
    );
};

export default Home;