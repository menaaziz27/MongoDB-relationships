const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	age: Number,
	cars: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Car',
		},
	],
});

const User = mongoose.model('User', userSchema, 'CarOwner');

module.exports = User;
