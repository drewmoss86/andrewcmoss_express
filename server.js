const express = require('express');
const app = express();


app.get('/api/contacts', (req, res) => {
	const contacts = [
		{id: 1, name: 'Dylan Moss', organization: "Moss Co.", email: "dmoss@mossco.com", phone: "555-555-5555", message: "Hello world!"},
		{id: 2, name: 'Frank Moss', organization: "Moss Co.", email: "fmoss@mossco.com", phone: "555-555-5555", message: "Hello world!"},
		{id: 3, name: 'Janet Moss', organization: "Moss Co.", email: "jmoss@mossco.com", phone: "555-555-5555", message: "Hello world!"}	
	];

	res.json(contacts);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));