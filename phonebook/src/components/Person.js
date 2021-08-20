import React from 'react';

const Person = ({ person }) => {
	return (
		<p>
			<span>{person.name}</span> <span>{person.number}</span>
		</p>
	);
};

export default Person;
