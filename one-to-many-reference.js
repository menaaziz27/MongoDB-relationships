const fs = require('fs');

const mongoose = require('mongoose');
require('dotenv').config();
const debug = require('debug');

const User = require('./models/one-to-many-reference/User');
const Car = require('./models/one-to-many-reference/Car');

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(client => {
		console.log('DB connected!');
		// ! To drop the database every time i run the program
	})
	.catch(err => console.log('error connection in DB :', err))
	.then(client => {
		console.log(`connected to port ${process.env.PORT}`);
	})
	.catch(err => console.log('connection error : ', err));

const createCar = async (owner_id, carObj) => {
	// here we're creating a car object and making associations between the car and the car owner
	let newCar = new Car(carObj);
	let user;
	try {
		user = await User.findById(owner_id);
		user.cars.push(newCar);
		// this line nodejs see the the car owner is the whole user object
		// but in fact mongoose magically assign the user objectId to the car owner property
		newCar.owner = user;
		// await user.save();
		// return await newCar.save();
		return await Promise.all([newCar.save(), user.save()]);
	} catch (e) {
		console.log(e);
	}
};

const createUser = async (name, age) => {
	return await User.create({ name, age });
};
// create user
const run = async () => {
	let user = await createUser('mina', 21);
	user = await user.save();
	const user_id = user._id;
	console.log(user_id);
	let result = await createCar(user_id, { make: 'Toyota', model: 'camry' });
	return result;
};
run()
	.then(async carAndCarOwner => {
		// carAndCarOwner[0] => car;
		// carAndCarOwner[1] => owner;
		// console.log(carAndCarOwner, 'run');

		let car = await Car.findById(carAndCarOwner[0]._id).populate('owner');
		let owner = await User.findById(carAndCarOwner[1]._id).populate('cars');
		console.log(car, 'this is the car obj populated by the owner');
		console.log(owner, 'this is the owner obj populated by cars');
		fs.writeFileSync(
			'oneToManyReference/one-to-many-allData.json',
			JSON.stringify(carAndCarOwner),
			err => {
				return console.log('error typing to a file', err);
			}
		);
	})
	.catch(e => console.log(e));
