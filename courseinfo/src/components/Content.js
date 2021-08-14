import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
	return (
		<>
			{parts.map((part, key) => (
				<Part part={part} key={key} />
			))}
		</>
	);
};

export default Content;
