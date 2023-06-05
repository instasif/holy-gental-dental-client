import React from 'react';

const PrimaryBtn = ({children}) => {
    return (
      <button className="btn btn-primary bg-gradient-to-r from-secondary to-primary text-white">
        {children}
      </button>
    );
};

export default PrimaryBtn;