const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
	name: String,
	identifier: {
		type: Schema.Types.ObjectId,
		ref: 'identifier',
	},
});

const Customer = mongoose.model('customer', customerSchema);
module.exports = Customer;
