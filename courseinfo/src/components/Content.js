import Part from 'components/Part';
import React from 'react';

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
