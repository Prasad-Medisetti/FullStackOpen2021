import React from 'react';

const Header = ({ text, component }) => {
	const Tag = component || 'div';
	return <Tag>{text}</Tag>;
};

export default Header;
