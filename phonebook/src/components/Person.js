import React from 'react';

const Person = ({ person, handleDelete }) => {
	return (
		<li>
			<span>{person.name}</span>
			<span>{person.number}</span>
			<span>
				<button onClick={() => handleDelete(person)}>Delete</button>
			</span>
		</li>
	);
};

export default Person;
