import React from 'react';
import Activities from './Activities';

function Main(props) {
  return (
    <>
      <div className=" text-center m-top-80">
        <h1 className="title">Monthly Activity Tracker</h1>
        <Activities />
      </div>
    </>
  );
}

export default Main;
