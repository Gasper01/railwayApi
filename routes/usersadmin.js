const express = require('express');
const { validationResult } = require('express-validator');
const { query } = require('express-validator');
const promiseRouter = require('express-promise-router');
const pool = require('../db');

const router = promiseRouter();

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
router.get(
	'/users',
	validate([
		query('page').optional().isInt(),
		query('limit').optional().isInt(),
	]),
	async (req, res) => {
		const { page = 1, limit = 10 } = req.query;

		const [rows] = await pool.query(
			'SELECT * FROM users LIMIT ?, ?',
			[(page - 1) * limit, limit]
		);
		res.json(rows);
	}
);

module.exports = router;
