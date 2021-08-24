import React from 'react';

const Filter = ({ search, handleSearchChange }) => {
	return (
		<input
			className='search'
			type='search'
			value={search}
			placeholder='Find countries'
			onInput={handleSearchChange}
		/>
	);
};

export default Filter;
