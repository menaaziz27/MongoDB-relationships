const fs = require('fs');

const mongoose = require('mongoose');
require('dotenv').config();

const Customer = require('./models/one-to-one-ref/Customer');
const Identifier = require('./models/one-to-one-ref/Identifier');

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
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

const run = async () => {
	let customer = new Customer({ name: 'Mina' });
	let id = new Identifier({ nationality: 'Egyptian' });

	customer.identifier = id;
	id.customerId = customer;
	await customer.save();
	await id.save();
	c = await Customer.findOne({ name: 'Mina' }).populate('identifier');
	console.log(c);
	ID = await Identifier.findOne({ nationality: 'Egyptian' }).populate(
		'customerId'
	);
	console.log(ID);

	let allData = [c, ID];
	// how nodejs see them on server ?
	fs.writeFileSync(
		'oneToOneRef/one-to-one-customers.json',
		JSON.stringify(allData),
		err => {
			return console.log('error typing to a file :', err);
		}
	);
};

run();
