import React from 'react';
import StatisticLine from './StatisticLine';

const Statistics = ({ good, bad, neutral }) => {
	const total = good + bad + neutral;
	const average = (good - bad) / total;
	const positive = (good / total) * 100;

	return (
		<>
			{good + bad + neutral > 0 ? (
				<table>
					<tbody>
						<StatisticLine text='Good' value={good} />
						<StatisticLine text='Neutral' value={neutral} />
						<StatisticLine text='Bad' value={bad} />
						<StatisticLine text='Total' value={total} />
						<StatisticLine text='Average' value={average} />
						<StatisticLine text='Positive' value={positive} />
					</tbody>
				</table>
			) : (
				<p>No feedback given...</p>
			)}
		</>
	);
};

export default Statistics;
