import React, { useState, useEffect } from 'react';
import CountryCard from './CountryCard';
import './App.css';

const App = () => {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setCountries([]);
            return;
        }

        const fetchCountries = async () => {
            try {
                setError(null); // Clear previous errors
                const response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}?fields=cca3,name,flags`);
                if (!response.ok) throw new Error('Network response was not ok.');
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error('Fetch error:', error);
                setCountries([]); // Clear previous data if error
                setError('Failed to fetch countries.');
            }
        };

        fetchCountries();
    }, [searchTerm]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    return (
        <div className="App">
            <input
                type="text"
                placeholder="Search for a country..."
                value={searchTerm}
                onChange={handleSearch}
                className="searchBar"
            />
            {error && <p className="error">{error}</p>}
            <div className="countryContainer">
                {countries.length > 0 ? (
                    countries.map((country) => (
                        <CountryCard
                            key={country.cca3}
                            name={country.name.common}
                            flag={country.flags.png}
                        />
                    ))
                ) : (
                    searchTerm && <p>No countries found.</p>
                )}
            </div>
        </div>
    );
};

export default App;
