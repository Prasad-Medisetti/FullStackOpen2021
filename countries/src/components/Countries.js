import Country from 'components/Country';
import React from 'react';

const Countries = ({ search, countries, showInfo }) => {
	return (
		<>
			{search && countries.length >= 10 ? (
				<p className='msg'>Too many matches, specify another filter</p>
			) : (
				<ul>
					{countries.map((country) => (
						<Country
							country={country}
							search={search}
							showInfo={showInfo}
							key={country.alpha3Code}
						/>
					))}
				</ul>
			)}
		</>
	);
};

export default Countries;
