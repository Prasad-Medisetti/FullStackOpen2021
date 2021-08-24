import axios from 'axios';
import Countries from 'components/Countries';
import CountryInfo from 'components/CountryInfo';
import Filter from 'components/Filter';
import Heading from 'components/Heading';
import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState('');
	const [country, setCountry] = useState([]);

	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
			// console.log('fulfilled', response);
			setCountries(response.data);
		});
	}, []);

	useEffect(() => {
		setCountry([]);
	}, [search]);

	const handleSearchChange = (event) => {
		event.preventDefault();
		setSearch(event.target.value);
	};

	const filteredCountries = countries.filter((country) =>
		country.name.toLowerCase().includes(search.toLowerCase()),
	);

	const showInfo = (countryName) => {
		let country = countries.filter((country) => country.name === countryName);
		setCountry(country);
	};

	return (
		<>
			<Heading
				text='Countries'
				component='h1'
				style={{ textAlign: 'center' }}
			/>
			<Filter search={search} handleSearchChange={handleSearchChange} />
			<div className='container'>
				{countries.length === 0 || filteredCountries.length === 0 ? (
					<p className='msg'>No countries found</p>
				) : filteredCountries.length === 1 ? (
					<CountryInfo country={filteredCountries[0]} />
				) : (
					<Countries
						search={search}
						showInfo={showInfo}
						countries={filteredCountries ? filteredCountries : []}
					/>
				)}
				{country.length >= 1 && <CountryInfo country={country[0]} />}
			</div>
		</>
	);
};

export default App;
