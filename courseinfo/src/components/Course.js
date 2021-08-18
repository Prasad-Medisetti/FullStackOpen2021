import Content from 'components/Content';
import Header from 'components/Header';
import Total from 'components/Total';
import React from 'react';

const Course = ({ course }) => {
	return (
		<>
			<Header text={course.name} component='h2' />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</>
	);
};

export default Course;
