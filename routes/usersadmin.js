const express = require('express');
const { validationResult, query } = require('express-validator');
const router = express.Router();
const pool = require('../db');

// Validation middleware
const validate = (validations) => {
	return async (req, res, next) => {
		await Promise.all(
			validations.map((validation) => validation.run(req))
		);

		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}

		res.status(400).json({ errors: errors.array() });
	};
};

// Routes
router.get('/users', validate([]), async (req, res, next) => {
	try {
		const [rows] = await pool.execute('SELECT * FROM users');
		res.json(rows);
	} catch (error) {
		next(error);
	}
});
router.get('/users/:id', validate([]), async (req, res, next) => {
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

router.post('/users', validate([]), async (req, res, next) => {
	try {
		const data = req.body;
		await pool.execute(
			'INSERT INTO users (nombre, correo) VALUES (?, ?)',
			[data.name, data.email]
		);
		res.json({ message: 'User created successfully' });
	} catch (error) {
		next(error);
	}
});

router.put('/users/:id', validate([]), async (req, res, next) => {
	try {
		const { id } = req.params;
		const data = req.body;
		await pool.execute(
			'UPDATE users SET nombre = ?, correo = ? WHERE id = ?',
			[data.name, data.email, id]
		);
		res.json({ message: 'User updated successfully' });
	} catch (error) {
		next(error);
	}
});

router.delete('/users/:id', validate([]), async (req, res, next) => {
	try {
		const { id } = req.params;
		await pool.execute('DELETE FROM users WHERE id = ?', [id]);
		res.json({ message: 'User deleted successfully' });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
