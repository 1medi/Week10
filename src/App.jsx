import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "../components/Countries";
import "../components/Countries.css"

const App = () => {
  const [filter, setFilter] = useState({
    continent: "",
    subregion: "",
    top10: false,
    sortAlpha: false,
  });

  const [countries, setCountries] = useState([]); 
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const MAX_COUNTRIES = 40;

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
        setFilteredData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let data = [...countries];

    if (filter.continent) {
      data = data.filter((country) =>
        country.continents?.includes(filter.continent)
      );
    }

    if (filter.subregion) {
      data = data.filter((country) => country.subregion === filter.subregion);
    }


    if (filter.top10) {
      data = data
        .slice()
        .sort((a, b) => b.population - a.population) 
        .slice(0, 10);
    }

    if (filter.sortAlpha) {
      data = data.slice().sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
    }

    setFilteredData(data);
  }, [filter, countries]);

  if (loading) {
    return <p>Loading countries...</p>;
  }

  return (
    <div style={{width:"100vw"}}>
      <h1>Country Explorer</h1>

      <div>
        <label>Continent: </label>
        <select
          value={filter.continent}
          onChange={(e) =>
            setFilter((prev) => ({
              ...prev,
              continent: e.target.value,
              subregion: "",
            }))
          }
        >
          <option value="" disabled>
            Select a Continent
          </option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Americas">Americas</option>
          <option value="Antarctica">Antarctica</option>
        </select>

        <label>Subregion: </label>
        <select
          value={filter.subregion}
          onChange={(e) =>
            setFilter((prev) => ({
              ...prev,
              subregion: e.target.value,
              continent: "",
            }))
          }
        >
          <option value="" disabled>
            Select a Subregion
          </option>
          {countries.length > 0 &&
            Array.from(new Set(countries.map((c) => c.subregion).filter(Boolean)))
              .sort()
              .map((subregion, index) => (
                <option key={index} value={subregion}>
                  {subregion}
                </option>
              ))}
        </select>

        <label>
          <input
            type="checkbox"
            checked={filter.top10}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, top10: e.target.checked }))
            }
          />
          Top 10 (Population)
        </label>

        <label>
          <input
            type="checkbox"
            checked={filter.sortAlpha}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, sortAlpha: e.target.checked }))
            }
          />
          Sort Alphabetically
        </label>

        <button onClick={() => setFilter({ continent: "", subregion: "", top10: false, sortAlpha: false })}>
          Reset Filters
        </button>
      </div>
            

      <div className="countries-container">
  <Countries data={filteredData.slice(0, MAX_COUNTRIES)} />
</div>



    </div>
  );
};

export default App;
