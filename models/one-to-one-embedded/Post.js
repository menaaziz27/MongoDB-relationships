const mongoose = require('mongoose');
const userSchema = require('./User').userSchema;

const Post = mongoose.model(
	'Post',
	new mongoose.Schema({
		title: String,
		description: String,
		owner: {
			type: userSchema,
		},
	})
);

module.exports = Post;
