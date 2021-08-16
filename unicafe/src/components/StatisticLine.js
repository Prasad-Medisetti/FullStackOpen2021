import React from 'react';

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<th>{text}</th>
			<td>:</td>
			<td>
				{value}
				{text === 'Positive' && '%'}
			</td>
		</tr>
	);
};

export default StatisticLine;
