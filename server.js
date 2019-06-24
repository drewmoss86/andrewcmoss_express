const express = require('express');
const contactRoutes = express.Router();
const logRoutes = express.Router();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

//bring in schema
const Contact = require('./model/Contact');
const Log = require('./model/Log');

//cannot access localhost:27017 on http interface
mongoose.connect('mongodb://localhost:27017/andrewcmoss_express', { useNewUrlParser: true });
const connection = mongoose.connection;

//connect to mongodb
connection.once('open', () => {
	console.log("MongoDB connection established!");
})

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/contact', contactRoutes);
app.use('/log', logRoutes);


/****
 * 
 * Routes for contact collection
 * 
 */
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

//find contacts by id
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

/**
 * 
 * Routes for logs collection
 * 
 */

//find all logs
logRoutes.route('/').get( (req, res) =>{
	Log.find( (err, log) => {
		if (err) {
			console.log(err);
		} else {
			res.json(log);
		}
	})
})

//find all logs by id
logRoutes.route('/:id').get( (req, res) => {
	let id = req.params.id;
	Log.findById(id, (err, log) => {
		if (err) {
			console.log(err);
		} else {
			res.json(log);
		}
	})
})

//add log
logRoutes.route('/add').post( (req, res) => {
	let log = new Log(req.body);
	log.save()
	.then(contact => { 
		res.status(200).json({'log': 'Log added successfully!'});
	})
	.catch(err => {
		res.status(400).send('Log was NOT added!')
	});
});


app.listen(port, () => console.log(`Server running on port ${port}`));