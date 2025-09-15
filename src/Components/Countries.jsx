import React from "react";
import "./Countries.css";

export default function Countries({ Data }) {
  return (
    <div className="countryCard">
      <img
        src={Data.png}
        alt={`${Data.common} flag`}
        style={{ width: "100px", height: "100px" }}
      />
      <h2>{Data.common}</h2>
    </div>
  );
}