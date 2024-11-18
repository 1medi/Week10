import React from "react";

const Country = ({ country }) => {
  return (
    <div className="country-card" style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        style={{ width: "100px", height: "auto" }}
      />
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital ? country.capital[0] : "N/A"}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Area: {country.area.toLocaleString()} km²</p>
      <p>Continent: {country.continents.join(", ")}</p>
      <p>Subregion: {country.subregion || "N/A"}</p>
    </div>
  );
};

export default Country;
