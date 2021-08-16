import React, { useState } from 'react';
import Button from './components/Button';
import Header from './components/Header';
import Statistics from './components/Statistics';

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGoodClick = () => setGood(good + 1);
	const handleNeutralClick = () => setNeutral(neutral + 1);
	const handleBadClick = () => setBad(bad + 1);

	return (
		<>
			<Header text='Give feedback' />
			<Button handleClick={handleGoodClick} text='good' />
			<Button handleClick={handleNeutralClick} text='neutral' />
			<Button handleClick={handleBadClick} text='bad' />
			<Header text='Statistics' />
			<Statistics good={good} bad={bad} neutral={neutral} />
		</>
	);
};

export default App;
