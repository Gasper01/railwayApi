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
router.post('/users', validate([]), async (req, res, next) => {
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

module.exports = router;
