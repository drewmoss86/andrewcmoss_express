const express = require('express');
const contactRoutes = express.Router();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

const Contact = require('./model/Contact');

// mongoose.Promise = global.Promise;
//cannot access localhost:27017 on http interface
mongoose.connect('mongodb://localhost:27017/andrewcmoss_express', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
	console.log("MongoDB connection established!");
})

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/contact', contactRoutes);

//find all contacts
contactRoutes.route('/').get( (req, res) => {
	Contact.find( (err, contact) => {
		if (err) {
			console.log(err);
		} else {
			res.json(contact);
		}
	});
});

contactRoutes.route('/:id').get( (req, res) => {
	let id = req.params.id;
	Contact.findById(id, (err, contact) => {
		if (err) {
			console.log(err);
		} else {
			res.json(contact);
		}
	});
});

//add contact
contactRoutes.route('/add').post( (req, res) => {
	let contact = new Contact(req.body);
	contact.save()
		.then(contact => {
			res.status(200).json({ 'contact': 'Contact added successfully!' });
		})
		.catch(err => {
			res.status(400).send('Contact was NOT added');
		});
});

//update contact
// contactRoutes.route('/update/:id').post( (req, res) => {
// 	Contact.findById(req.params.id, (err, contact) => {
// 		if(!contact) {
// 			res.status(400).send("Record not found!");
// 		} else {
// 			contact.name = req.body.name;
// 			contact.organization = req.body.organization;
// 			contact.email = req.body.email;
// 			contact.phone = req.body.phone;
// 			contact.message = req.body.message;

// 			contact.save()
// 			.then(contact => {
// 				res.json("Contact updated!");
// 			})
// 			.catch(err => {
// 				res.status(400).send("Contact NOT updated");
// 			});
// 		}
// 	});
// });


app.get('/api/contacts', (req, res) => {
	const contacts = [
		{id: 1, name: 'Dylan Moss', organization: "Moss Co.", email: "dmoss@mossco.com", phone: "555-555-5555", message: "Hello world!"},
		{id: 2, name: 'Frank Moss', organization: "Moss Co.", email: "fmoss@mossco.com", phone: "555-555-5555", message: "Hello world!"},
		{id: 3, name: 'Janet Moss', organization: "Moss Co.", email: "jmoss@mossco.com", phone: "555-555-5555", message: "Hello world!"}	
	];

	res.json(contacts);
});

app.listen(port, () => console.log(`Server running on port ${port}`));