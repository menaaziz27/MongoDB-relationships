const fs = require('fs');

const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/one-to-one-embedded/User').User;
const Post = require('./models/one-to-one-embedded/Post');

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(client => {
		console.log('DB connected!');
		// ! To drop the database every time i run the program
		mongoose.connection.db.dropDatabase();
	})
	.catch(err => console.log('error connection in DB :', err))
	.then(client => {
		console.log(`connected to port ${process.env.PORT}`);
	})
	.catch(err => console.log('connection error : ', err));

const createUser = async (name, age, address) => {
	return await User.create({ name, age, address });
};

const createPost = async (title, description, owner) => {
	return await Post.create({ title, description, owner });
};

createUser('Mina', 21, 'cairo')
	.then(async user => {
		console.log('New user created!');

		return await createPost('Hello', 'Hello world!', user);
	})
	.then(async post => {
		console.log('New Post Created!');

		try {
			// write the results of the user colloection and post collection in a file
			const users = await User.find();
			const posts = await Post.find();

			// createing array of all users and all posts
			const allData = users.concat(posts);

			// writing the array into the file
			fs.writeFileSync(
				'oneToOneEmbedded/one-to-one-data.json',
				JSON.stringify(allData),
				err => {
					return console.log('error typing to a file :', err);
				}
			);

			// writing all posts collection with it's owner in another file
			(async () => {
				const posts = await Post.find();
				console.log(posts);
				// .select("-__v -post.__v -customer._id");
				fs.writeFileSync(
					'oneToOneEmbedded/one-to-one-posts.json',
					JSON.stringify(posts),
					err => {
						return console.log('error typing to a file :', err);
					}
				);
			})();
		} catch (e) {
			console.log(e);
		}
	})
	.catch(err => console.log('Error in creation the user', err));
