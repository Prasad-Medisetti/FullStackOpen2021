import React from 'react';

const Notification = ({ successMessage, errorMessage }) => {
	if (successMessage === null && errorMessage === null) {
		return null;
	}

	return (
		<div className={`message ${successMessage ? 'success' : 'error'}`}>
			{/* <span
				className='closebtn'
				onClick={() => {
					document.querySelector('.message').style.opacity = 0;
					document.querySelector('.message').style.display = 'none';
				}}>
				&times;
			</span> */}
			{successMessage ? successMessage : errorMessage}
		</div>
	);
};

export default Notification;
