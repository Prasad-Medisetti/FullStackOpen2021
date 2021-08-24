import React from 'react';

const Heading = ({ text, component, style }) => {
	const Tag = component || 'div';
	return <Tag style={style}>{text}</Tag>;
};

export default Heading;
