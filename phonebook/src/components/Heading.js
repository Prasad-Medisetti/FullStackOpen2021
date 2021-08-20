import React from 'react';

const Heading = ({ text, component }) => {
	const Tag = component || 'div';
	return <Tag>{text}</Tag>;
};

export default Heading;
