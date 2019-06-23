const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
	name: String,
	organization: String, 
	email: String,
	phone: String,
	message: String 
});

module.exports = mongoose.model('Contact', contactSchema);