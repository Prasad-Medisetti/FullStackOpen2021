const express = require('express'),
	cors = require('cors'),
	morgan = require('morgan');
const { post } = require('got');

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
];

const app = express();
app.use(express.json());
app.use(cors());

morgan.token('body', function (req, res) {
	return JSON.stringify(req.body);
});

app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body'),
);

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>');
});

app.get('/info', (req, res, next) => {
	res.send(
		`<p>Phonebook has info for ${
			persons.length
		} people</p> <p>${new Date()}</p>`,
	);
});

app.get('/api/persons', (req, res) => {
	res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
	const personId = Number(req.params.id);

	if (!personId)
		return res
			.status(400)
			.json({
				error: 'Id is required...',
			})
			.end();

	const person = persons.find((person) => person.id === personId);

	if (!person)
		return res
			.json({ error: `Person with id ${personId} doesn't exist` })
			.status(204)
			.end();

	res.json(person);
});

const generateId = () => {
	const idMax =
		persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
	return idMax + 1;
};

app.post('/api/persons', (req, res) => {
	const body = req.body;

	if (!body.name || !body.number) {
		return res
			.status(400)
			.json({
				error: 'Name and number are required...',
			})
			.end();
	}

	let person = persons.find((person) => person.name === body.name);

	if (person)
		return res.json({ error: 'name must be unique' }).status(204).end();

	const newPerson = {
		name: body.name,
		number: body.number,
		date: new Date(),
		id: generateId(),
	};

	persons = persons.concat(newPerson);
	res.json(newPerson);
});

app.delete('/api/persons/:id', (req, res) => {
	const personId = Number(req.params.id);

	if (!personId)
		return res
			.status(400)
			.json({
				error: 'Id is required...',
			})
			.end();

	let person = persons.find((person) => person.id === personId);
	persons = persons.filter((person) => person.id !== personId);

	if (!person)
		return res
			.json({ error: `Person with id ${personId} doesn't exist` })
			.status(204)
			.end();

	let { id, ...deletedPerson } = person;

	res.json(deletedPerson).end();
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
