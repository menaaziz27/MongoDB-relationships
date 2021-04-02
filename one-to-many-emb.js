const fs = require('fs');

const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/one-to-many-emb/User');
const Task = require('./models/one-to-many-emb/Task');

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(client => {
		console.log('DB connected!');
	})
	.catch(err => console.log('error connection in DB :', err))
	.then(client => {
		console.log(`connected to port : ${process.env.PORT}`);
	})
	.catch(err => console.log('connection error : ', err));

const createUser = async (name, age) => {
	let user = new User({ name, age, tasks: [] });
	return await user.save();
};

const creatTask = async (title, description, user) => {
	let taskObj = { title, description };
	const foundedUser = User.findById(user._id);
	user.tasks.push(taskObj);
	return await user.save();
};

createUser('Mena', 21)
	.then(async user => {
		console.log('New user created!');
		return creatTask('college', 'Math assignment', user);
	})
	.then(async task => {
		console.log('New Task Created!');
		try {
			// writing all user data in one-to-one-posts.json
			const Mena = await User.findOne({ name: 'Mena' });
			fs.writeFileSync(
				'oneToManyEmb/one-to-many-emb.json',
				JSON.stringify(Mena),
				err => {
					return console.log('error typing to a file :', err);
				}
			);
			console.log(Mena);
		} catch (e) {
			console.log(e);
		}
	})
	.catch(err => console.log('Error in creation the user', err));
