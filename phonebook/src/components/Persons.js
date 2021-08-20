import Person from 'components/Person';
import React from 'react';

const Persons = ({ persons }) => {
	return (
		<>
			{persons.length > 0 ? (
				<>
					{persons.map((person) => (
						<Person person={person} key={person.id} />
					))}
				</>
			) : (
				<p>No results</p>
			)}
		</>
	);
};

export default Persons;
