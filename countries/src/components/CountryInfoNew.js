import axios from 'axios';
import Heading from 'components/Heading';
import React, { useEffect, useState } from 'react';

const CountryInfo = ({ country }) => {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		axios
			.get(
				`https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=${process.env.REACT_APP_WEATHER_API_KEY}&city=${country.capital}`,
			)
			.then((res) => setWeather(res.data.data[0]));
	}, [country]);

	return (
		<div className='info'>
			<Heading text={country.name} component='h2' />
			<p>
				<strong>Capital</strong> : {country.capital}
			</p>
			<p>
				<strong>Population</strong> : {country.population}
			</p>
			<Heading text='Spoken Languages' component='h3' />

			<ul>
				{country.languages.map((language) => (
					<li style={{ listStylePosition: 'inside' }} key={language.name}>
						{language.name}
					</li>
				))}
			</ul>
			<img width='180px' src={country.flag} alt={`${country.name} flag`} />

			{weather === null ? (
				<p className='msg'>Loading...</p>
			) : (
				<>
					<Heading text={`Weather in ${weather.city_name}`} component='h3' />
					<p>
						<strong>Temperature</strong> : {weather.temp} Celcius
					</p>
					<img
						width='80px'
						src={`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`}
						alt={`Weather in ${weather.weather.description}`}
					/>
					<p>
						<strong>Wind</strong> : {weather.wind_spd} mph
					</p>
					<p>
						<strong>Direction</strong> : {weather.wind_cdir}
					</p>
				</>
			)}
		</div>
	);
};

export default CountryInfo;
