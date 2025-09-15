import { useState, useEffect } from "react";
import Countries from "./Components/Countries";
import "./App.css";

function App() {
  const [countryData, setCountryData] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Fetch API Data
  useEffect(() => {
    const getCountriesFlag = async () => {
      try {
        const res = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch country data");
        }
        const data = await res.json();
        setCountryData(data);
        setAllCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getCountriesFlag();
  }, []);

  // Search Functionality
  const performSearch = (query) => {
    if (!query.trim()) {
      setCountryData(allCountries);
      return;
    }

    const filtered = allCountries.filter((country) =>
      country.common.toLowerCase().includes(query.toLowerCase())
    );

    setCountryData(filtered.sort((a, b) => a.common.localeCompare(b.common)));
  };

  // Debounce Search Input
  const debounceSearch = (event) => {
    clearTimeout(debounceTimeout);
    const newTimeout = setTimeout(() => {
      performSearch(event.target.value);
    }, 500);
    setDebounceTimeout(newTimeout);
  };

  return (
    <div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Search for countries..."
          onChange={debounceSearch}
          className="input"
        />
      </div>
      <div className="App">
        {countryData.length > 0 ? (
          countryData.map((data) => <Countries Data={data} key={data.png} />)
        ) : (
          <p>No countries found</p>
        )}
      </div>
    </div>
  );
}

export default App;