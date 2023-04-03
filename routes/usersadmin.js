const express = require('express');
const router = express.Router();
const pool = require('../db');
const validate = require('../validacion');

router.get('/users', async (req, res, next) => {
	try {
		const [rows] = await pool.execute('SELECT * FROM users');
		res.json(rows);
	} catch (error) {
		next(error);
	}
});

router.get('/users/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const [rows] = await pool.execute(
			'SELECT * FROM users WHERE id = ?',
			[id]
		);
		if (rows.length === 0) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json(rows[0]);
	} catch (error) {
		next(error);
	}
});

router.post('/users', async (req, res, next) => {
	try {
		const data = req.body;
		const errors = validate(data); // Validating user input
		if (errors.length) {
			return res.status(400).json({ errors }); // If there are errors, return them
		}
		await pool.execute(
			'INSERT INTO users (nombre, correo) VALUES (?, ?)',
			[data.name, data.email]
		);
		res.json({ message: 'User created successfully' });
	} catch (error) {
		next(error);
	}
});

router.put('/users/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const data = req.body;
		const errors = validate(data); // Validating user input
		if (errors.length) {
			return res.status(400).json({ errors }); // If there are errors, return them
		}
		await pool.execute(
			'UPDATE users SET nombre = ?, correo = ? WHERE id = ?',
			[data.name, data.email, id]
		);
		res.json({ message: 'User updated successfully' });
	} catch (error) {
		next(error);
	}
});

router.delete('/users/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		await pool.execute('DELETE FROM users WHERE id = ?', [id]);
		res.json({ message: 'User deleted successfully' });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
