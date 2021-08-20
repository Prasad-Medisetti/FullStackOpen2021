import React from 'react';

const Filter = ({ search, handleSearchChange }) => {
	return (
		<div>
			<span>Filter shown with </span>
			<input type='search' value={search} onChange={handleSearchChange} />
		</div>
	);
};

export default Filter;
