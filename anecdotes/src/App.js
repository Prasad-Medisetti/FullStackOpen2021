import React, { useEffect, useState } from 'react';
import './App.css';
import Anecdote from './components/Anecdote';
import Button from './components/Button';
import Header from './components/Header';

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
	];

	const [selected, setSelected] = useState(0);
	const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
	const [maxPoints, setMaxPoints] = useState(-1);

	const getNextAnecdote = () => {
		let nextIndex = Math.floor(Math.random() * anecdotes.length);
		setSelected(nextIndex);
	};

	const getMaxVotedAnecdote = () => {
		let maxPoint = Math.max(...points);
		if (maxPoint === 0) setMaxPoints(-1);
		else setMaxPoints(points.indexOf(maxPoint));
	};

	const handleVoteClick = () => {
		let newPoints = [...points];
		newPoints[selected]++;
		setPoints(newPoints);
	};

	useEffect(() => {
		console.log(`maxPoints`, maxPoints);
		getMaxVotedAnecdote();
	});

	return (
		<div>
			<Header text='Anecdote of the day' />
			<Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
			<Button text='Vote' handleClick={handleVoteClick} />
			<Button text='Next Anecdote' handleClick={getNextAnecdote} />

			{maxPoints !== -1 && (
				<>
					<Header text='Anecdote with most votes' />
					<Anecdote anecdote={anecdotes[maxPoints]} votes={points[maxPoints]} />
				</>
			)}
		</div>
	);
};

export default App;
