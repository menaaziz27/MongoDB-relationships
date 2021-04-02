const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IdentifierSchema = new Schema({
	nationality: String,
	customerId: {
		type: Schema.Types.ObjectId,
		ref: 'customer',
	},
});

const Identifier = mongoose.model('identifier', IdentifierSchema);
module.exports = Identifier;
