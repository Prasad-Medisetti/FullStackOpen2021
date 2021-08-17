import React from 'react';

const Button = ({ handleClick, text }) => (
	<button
		style={{
			padding: '.25em .75em',
			backgroundColor: 'transparent',
			borderRadius: '.25em',
		}}
		onClick={handleClick}>
		{text}
	</button>
);

export default Button;
