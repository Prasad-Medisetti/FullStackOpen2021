import Filter from 'components/Filter';
import Heading from 'components/Heading';
import Notification from 'components/Notification';
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
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [loadingMessage, setLoadingMessage] = useState(null);

	useEffect(() => {
		setLoadingMessage('Loading...');
		personsService
			.getAll()
			.then((initialPersons) => {
				setPersons(initialPersons);
				setLoadingMessage(null);
			})
			.catch((err) => {
				setErrorMessage(
					`A network error occurred while connecting to the server...`,
				);
				setLoadingMessage(
					`A network error occurred while connecting to the server...`,
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
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

		// Check the person already exists in the database
		const existingPerson = persons.filter(
			(person) => person.name.toLowerCase() === newName.toLowerCase(),
		)[0];

		// Verify the fields were filled
		if (newName === '' || newNumber === '') {
			setErrorMessage('Please fill the fields.');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
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
						setSuccessMessage(
							`Updated "${changedPerson.name}" number "${changedPerson.number}" to "${newNumber}"`,
						);
						setTimeout(() => {
							setSuccessMessage(null);
						}, 5000);
						setNewName('');
						setNewNumber('');
						return;
					})
					.catch((err) => {
						if (err.response?.status === 404) {
							setErrorMessage(
								`Information of "${changedPerson.name}" has already been removed from server`,
							);
							setTimeout(() => {
								setErrorMessage(null);
							}, 5000);
							setPersons(
								persons.filter((person) => person.id !== changedPerson.id),
							);
							setNewName('');
							setNewNumber('');
						} else {
							console.log({ ...err });
							setErrorMessage(
								`A network error occurred while connecting to the server...`,
								err.response?.statusText,
							);
							setTimeout(() => {
								setErrorMessage(null);
							}, 5000);
						}
					});
				return;
			}

			// The person exists and both name and number are same as the database
			else {
				setErrorMessage(
					`"${newName}" is already added to phonebook with number "${existingPerson.number}"`,
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
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
					setSuccessMessage(
						`Added "${savedPerson.name}" with number "${savedPerson.number}"`,
					);
					setTimeout(() => {
						setSuccessMessage(null);
					}, 5000);
					setNewName('');
					setNewNumber('');
				})
				.catch((err) => {
					console.log({ ...err });
					setErrorMessage(
						`A network error occurred while adding "${newPerson.name}" ...`,
						err.response?.statusText,
					);
					setTimeout(() => {
						setErrorMessage(null);
					}, 5000);
				});
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
					setSuccessMessage(
						`Deleted ${personTobeDeleted.name}" with number "${personTobeDeleted.number}"`,
					);
					setTimeout(() => {
						setSuccessMessage(null);
					}, 5000);
				})
				.catch((err) => {
					if (err.response?.status === 404) {
						setErrorMessage(
							`Information of "${personTobeDeleted.name}" has already been removed from server`,
						);
						setTimeout(() => {
							setErrorMessage(null);
						}, 5000);
						setPersons(
							persons.filter((person) => person.id !== personTobeDeleted.id),
						);
						setNewName('');
						setNewNumber('');
					} else {
						console.log({ ...err });
						setErrorMessage(
							`A network error occurred while deleting "${personTobeDeleted.name}" ...`,
							err.response?.statusText,
						);
						setTimeout(() => {
							setErrorMessage(null);
						}, 5000);
					}
				});
		} else {
			return;
		}
	};

	return (
		<>
			<Heading text='Phonebook' component='h1' />
			<Notification
				successMessage={successMessage}
				errorMessage={errorMessage}
			/>
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
			<Persons
				persons={filteredPersons}
				handleDelete={handleDelete}
				loadingMessage={loadingMessage}
			/>
		</>
	);
};

export default App;
