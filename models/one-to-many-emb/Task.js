const mongoose = require('mongoose');

const Task = mongoose.Schema({
	title: String,
	description: String,
});

module.exports = Task;
