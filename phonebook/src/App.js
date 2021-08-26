import Filter from 'components/Filter';
import Heading from 'components/Heading';
import PersonForm from 'components/PersonForm';
import Persons from 'components/Persons';
import React, { useEffect, useState } from 'react';
import personsService from 'services/persons';
import './App.css';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [search, setSearch] = useState('');

	useEffect(() => {
		personsService
			.getAll()
			.then((initialPersons) => {
				setPersons(initialPersons);
			})
			.catch((err) => alert(err));
	}, []);

	const handleNameChange = (event) => {
		event.preventDefault();
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		event.preventDefault();
		setNewNumber(event.target.value);
	};

	const handleSearchChange = (event) => {
		event.preventDefault();
		setSearch(event.target.value);
	};

	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(search.toLowerCase()),
	);

	// Filter using Regex
	// const filteredPersons = persons.filter((person) =>
	// 	person.name.match(new RegExp(search, 'i')),
	// );

	const addPerson = (event) => {
		event.preventDefault();

		// Check the person already exists in the database
		const existingPerson = persons.filter(
			(person) => person.name.toLowerCase() === newName.toLowerCase(),
		)[0];

		// Verify the fields were filled
		if (newName === '' || newNumber === '') {
			alert('Please fill the fields.');
			return;
		}

		// Check the person exists and name already exists in the database
		else if (existingPerson && existingPerson.name === newName) {
			// The person exists and check the number is not same as the number in the database then update the number
			if (
				existingPerson.number !== newNumber &&
				window.confirm(
					`"${existingPerson.name}" is already added to phonebook, replace the old number "${existingPerson.number}" with the new number "${newNumber}" ?`,
				)
			) {
				const changedPerson = { ...existingPerson, number: newNumber };
				personsService
					.update(changedPerson.id, changedPerson)
					.then((savedPerson) => {
						setPersons(
							persons.map((person) =>
								person.id !== savedPerson.id ? person : savedPerson,
							),
						);
						setNewName('');
						setNewNumber('');
						return;
					})
					.catch((err) => alert(err));
				return;
			}

			// The person exists and both name and number are same as the database
			else {
				alert(`"${newName}" is already added to phonebook`);
				return;
			}
		}

		// The person doesn't exists in the database
		else {
			const newPerson = {
				name: newName,
				number: newNumber,
				date: new Date().toISOString(),
				id: persons.length + 1,
			};

			personsService
				.create(newPerson)
				.then((savedPerson) => {
					setPersons(persons.concat(savedPerson));
					setNewName('');
					setNewNumber('');
				})
				.catch((err) => alert(err));
		}
	};

	const handleDelete = (personTobeDeleted) => {
		if (window.confirm(`Delete "${personTobeDeleted.name}" ?`)) {
			personsService
				.remove(personTobeDeleted.id)
				.then(() => {
					setPersons(
						persons.filter((person) => person.id !== personTobeDeleted.id),
					);
				})
				.catch((err) => alert(err));
		} else {
			return;
		}
	};

	return (
		<>
			<Heading text='Phonebook' component='h1' />
			<Filter search={search} handleSearchChange={handleSearchChange} />
			<Heading text='Add new person' component='h2' />
			<PersonForm
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
				addPerson={addPerson}
			/>
			<Heading text='Numbers' component='h2' />
			<Persons persons={filteredPersons} handleDelete={handleDelete} />
		</>
	);
};

export default App;
