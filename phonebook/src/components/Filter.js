import React from 'react';

const Filter = ({ search, handleSearchChange }) => {
	return (
		<div>
			<input
				className='search'
				placeholder='Search'
				type='search'
				value={search}
				onChange={handleSearchChange}
			/>
		</div>
	);
};

export default Filter;
