const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
	title: String,
	body: String, 
	date: String
});

module.exports = mongoose.model('Log', logSchema);