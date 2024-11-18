import React from "react";
import Country from "./Country";
import "./Countries.css"

const Countries = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>Loading or no countries available...</p>;
  }

  return (
    <div className="countries-grid">
      {data.map((country, index) => (
        <Country key={index} country={country} />
      ))}
    </div>
  );
};

export default Countries;
