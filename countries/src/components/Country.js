import React from 'react';

function Country({ country, search, showInfo }) {
	return (
		<li className='li_item'>
			{country.name}
			{search && <button onClick={() => showInfo(country.name)}>Show</button>}
		</li>
	);
}

export default Country;
