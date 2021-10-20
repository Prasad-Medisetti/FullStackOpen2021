const Blog = require('../models/blog');
const blogssRouter = require('express').Router();

blogssRouter.get('/api/blogs', (req, res) => {
	Blog.find({}).then((blogs) => {
		res.json(blogs);
	});
});

blogssRouter.post('/api/blogs', (req, res) => {
	const blog = new Blog(req.body);

	blog.save().then((result) => {
		res.status(201).json(result);
	});
});

module.exports = blogssRouter;
