const express = require('express');
const router = express.Router();
const pool = require('../db');
const { validateUser } = require('../validacion');

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

router.post('/users', validateUser, async (req, res, next) => {
	try {
		const { name, email } = req.body;
		await pool.execute(
			'INSERT INTO users (nombre, correo) VALUES (?, ?)',
			[name, email]
		);
		res.json({ message: 'User created successfully' });
	} catch (error) {
		next(error);
	}
});

router.put('/users/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const { name, email } = req.body;
		await pool.execute(
			'UPDATE users SET nombre = ?, correo = ? WHERE id = ?',
			[name, email, id]
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
