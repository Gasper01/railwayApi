const express = require('express');
const router = express.Router();
const pool = require('../db');

// Routes
router.get('/users', async (req, res) => {
	try {
		const [rows, fields] = await pool.query('SELECT * FROM users');
		res.json(rows);
	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error al obtener los usuarios');
	}
});

router.post('/', (req, res) => {
	// Create a new item
});

router.get('/:id', (req, res) => {
	// Get a single item by ID
});

router.put('/:id', (req, res) => {
	// Update a single item by ID
});

router.delete('/:id', (req, res) => {
	// Delete a single item by ID
});

module.exports = router;
