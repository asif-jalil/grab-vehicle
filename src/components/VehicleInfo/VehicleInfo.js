import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./VahicleInfo.css";

const VehicleInfo = ({ vehicle }) => {
  return (
    <div className="single-search shadow">
      <div className="search-img">
        <img src={vehicle.img} alt="" />
      </div>
      <div className="search-details">
        <h6>{vehicle.name}</h6>
        <FontAwesomeIcon icon={["fas", "users"]} />
        <span>{vehicle.seat}</span>
      </div>
      <div className="booking-cost">
        <span>{vehicle.price}</span>
      </div>
    </div>
  );
};

export default VehicleInfo;
