const mongoose = require('mongoose');
// !new mongoose.Schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: String
});
const User = mongoose.model('User', userSchema)
module.exports = { userSchema, User };