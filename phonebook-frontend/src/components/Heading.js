import React from 'react';

const Heading = ({ text, component }) => {
	const Tag = component || 'div';
	return <Tag style={{ paddingLeft: '.5em' }}>{text}</Tag>;
};

export default Heading;
