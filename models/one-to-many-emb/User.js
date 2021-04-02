const mongoose = require('mongoose');
const Task = require('./Task');

const User = mongoose.model('User', {
	name: String,
	age: Number,
	tasks: [Task],
});

module.exports = User;
