import React from 'react';

const PersonForm = ({
	newName,
	handleNameChange,
	addPerson,
	newNumber,
	handleNumberChange,
}) => {
	return (
		<form onSubmit={addPerson}>
			<input placeholder='Name' value={newName} onChange={handleNameChange} />
			<input
				placeholder='Number'
				value={newNumber}
				onChange={handleNumberChange}
			/>
			<button type='submit'>Add</button>
		</form>
	);
};

export default PersonForm;
