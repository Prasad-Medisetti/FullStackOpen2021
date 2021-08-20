import axios from 'axios';
import Filter from 'components/Filter';
import Heading from 'components/Heading';
import PersonForm from 'components/PersonForm';
import Persons from 'components/Persons';
import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [search, setSearch] = useState('');

	useEffect(() => {
		axios.get('http://localhost:3001/persons').then((response) => {
			setPersons(response.data);
		});
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
		const allPersons = persons.filter((person) => person.name === newName);
		if (newName === '') {
			alert('Please enter  name and number.');
			return;
		} else if (allPersons.length > 0) {
			console.log(persons.filter((person) => person.name === newName));
			alert(`${newName} is already added to phonebook`);
			return;
		} else {
			const newPerson = {
				name: newName,
				number: newNumber,
				date: new Date().toISOString(),
				id: persons.length + 1,
			};

			setPersons(persons.concat(newPerson));
			setNewName('');
			setNewNumber('');
		}
	};

	return (
		<>
			<Heading text='Phonebook' component='h2' />
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
			<Persons persons={filteredPersons} />
		</>
	);
};

export default App;
