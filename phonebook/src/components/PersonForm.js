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
			<div>
				<div>
					Name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					Number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
			</div>

			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};

export default PersonForm;
