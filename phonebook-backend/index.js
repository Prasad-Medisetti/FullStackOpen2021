require('dotenv').config();

const express = require('express'),
	cors = require('cors'),
	morgan = require('morgan');

const Person = require('./models/person');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

morgan.token('body', function (req, res, next) {
	return JSON.stringify(req.body);
});

app.use(
	morgan(
		':method\t:url\t:status\t:res[content-length] -\t:response-time ms\t:body',
	),
);

// Custom Logger
// const requestLogger = (req, res, next) => {
// 	console.log('Method:', req.method);
// 	console.log('Path:  ', req.path);
// 	console.log('Body:  ', req.body);
// 	console.log('---');
// 	next();
// };

// app.use(requestLogger);

app.get('/', (req, res, next) => {
	res.send('<h1>Hello World!</h1>');
});

app.get('/info', (req, res, next) => {
	Person.find({})
		.then((persons) => {
			if (persons) {
				res.send(
					`<p>Phonebook has info for ${
						persons.length
					} people</p> <p>${new Date()}</p>`,
				);
			} else {
				res.status(404).end();
			}
		})
		.catch((err) => next(err));
});

app.get('/api/persons', (req, res, next) => {
	Person.find({})
		.then((persons) => {
			if (persons) {
				res.json(persons);
			} else {
				res.status(404).end();
			}
		})
		.catch((err) => next(err));
});

app.get('/api/persons/:id', (req, res, next) => {
	const personId = req.params.id;

	if (!personId)
		return res
			.status(400)
			.json({
				error: 'Id is required...',
			})
			.end();

	Person.findById(personId)
		.then((person) => {
			if (person) {
				res.json(person);
			} else {
				res.status(404).end();
			}
		})
		.catch((err) => next(err));
});

app.post('/api/persons', (req, res, next) => {
	const body = req.body;

	if (!body.name || !body.number) {
		return res
			.status(400)
			.json({
				error: 'Name and number are required...',
			})
			.end();
	}

	Person.find({ name: body.name })
		.then((persons) => {
			if (persons.length > 0)
				return res.status(400).json({ error: 'name must be unique' }).end();
			else {
				const newPerson = new Person({
					name: body.name,
					number: body.number,
				});

				newPerson
					.save()
					.then((savedPerson) => {
						res.json(savedPerson);
					})
					.catch((err) => next(err));
			}
		})
		.catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
	const personId = req.params.id;
	const body = req.body;

	const person = {
		name: body.name,
		number: body.number,
	};

	Person.findByIdAndUpdate(personId, person, { new: true })
		.then((updatedNote) => {
			res.json(updatedNote);
		})
		.catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
	const personId = req.params.id;

	if (!personId)
		return res
			.status(400)
			.json({
				error: 'Id is required...',
			})
			.end();

	Person.findByIdAndRemove(personId)
		.then((person) => {
			if (person) {
				res.json(person);
			} else {
				res.status(404).end();
			}
		})
		.catch((err) => next(err));
});

const unknownEndpoint = (req, res, next) => {
	res.status(404).send({ error: 'unknown endpoint' });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
	console.error(err.message);

	if (err.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' });
	}

	next(err);
};

// handler of requests with result to errors and this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
