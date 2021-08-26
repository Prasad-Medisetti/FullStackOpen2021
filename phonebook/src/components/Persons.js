import Person from 'components/Person';
import React from 'react';

const Persons = ({ persons, handleDelete, loadingMessage }) => {
	return (
		<>
			{persons.length > 0 ? (
				<ul>
					{persons.map((person) => (
						<Person
							person={person}
							key={person.id}
							handleDelete={handleDelete}
						/>
					))}
				</ul>
			) : (
				<p>{loadingMessage ? loadingMessage : 'No Contacts ...'}</p>
			)}
		</>
	);
};

export default Persons;
