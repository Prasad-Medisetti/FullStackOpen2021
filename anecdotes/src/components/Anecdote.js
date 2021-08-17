import React from 'react';

const Anecdote = ({ anecdote, votes }) => {
	return (
		<>
			<p>{anecdote}</p>
			<p>Has {votes} votes</p>
		</>
	);
};

export default Anecdote;
