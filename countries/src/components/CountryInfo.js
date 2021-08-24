import axios from 'axios';
import Heading from 'components/Heading';
import React, { useEffect, useState } from 'react';

const CountryInfo = ({ country }) => {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		axios
			.get(
				`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`,
			)
			.then((res) => setWeather(res.data));
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

			<div>
				{weather === null ? (
					<p className='msg'>Loading...</p>
				) : (
					<>
						<Heading
							text={`Weather in ${weather.location.name}`}
							component='h3'
						/>
						<p>
							<strong>Temperature</strong> : {weather.current.temperature}{' '}
							Celcius
						</p>
						<img
							width='80px'
							src={weather.current.weather_icons[0]}
							alt={`Weather in ${weather.location.name}`}
						/>
						<p>
							<strong>Wind</strong> : {weather.current.wind_speed}mph
						</p>
						<p>
							<strong>Direction</strong> : {weather.current.wind_dir}
						</p>
					</>
				)}
			</div>
		</div>
	);
};

export default CountryInfo;
