const express = require('express');
const _ = require('lodash');
const { ObjectID } = require('mongodb');
const { Contact } = require('../db/models/contact.js');

const router = express.Router();

router.post('/new', async (req, res) => {
	try {
		const contact = new Contact({
			name: req.body.name,
			address: req.body.address,
			email: req.body.email,
			phone_number: req.body.phone_number,
		}); 
		const cont = await contact.save();

		res.status(200).json(cont);
	} catch (err) {
		res.status(400).send({ error: 'Something went wrong' });
	}
});

router.get('/all', async (_req, res) => {
	try {
		let contacts;
		let filters = [];
		let regex = [];
		if(_req.query.filters.trim()) {

			filters = _req.query.filters.split(',');
			filters.forEach(element => {
				regex.push(new RegExp(element,'i'));
			});

			contacts = await Contact.find(
				{ $or:[{name: { $in : regex}},
					   {addess: { $in : regex}},
					   {email: { $in : regex}},
					   {phone_number: { $in : regex}},
					]
				}
			);
		} else {
			contacts = await Contact.find();
		}
		res.status(200).json(contacts);
	} catch (err) {
		res.status(400).json({ error: err });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		if (!ObjectID.isValid(id)) {
			return res.status(404).json({ error: 'Invalid ID' });
		}

		const contact = await Contact.findOne({ _id: id });
		res.status(200).json(contact);
	} catch (err) {
		res.status(400).json({ error: 'Unable to find that post' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		if (!ObjectID.isValid(id)) {
			return res.status(404).send('Invalid ID');
		}

		const contact = await Contact.findOneAndRemove({
			_id: id,
		});

		if (!contact) {
			return res.status(400).json({ error: 'Unable to delete that post' });
		}

		res.status(200).json({ msg: 'Post has been removed successfully!' });
	} catch (err) {
		res.status(400).send({ error: 'Something went wrong' });
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const body = _.pick(req.body, ['address', 'email','phone_number','name']);

		if (!ObjectID.isValid(id)) {
			return res.status(404).json({ error: 'Invalid ID' });
		}
		const contact = await Contact.findOneAndUpdate(
			{
				_id: id
			},
			{ $set: body },
			{ new: true }
		);

		if (!contact) {
			return res.status(404).json({ error: 'Unable to update that post' });
		}

		res.status(200).json(contact);
	} catch (err) {
		res.status(400).send({ error: 'Something went wrong' });
	}
});

module.exports = router;
