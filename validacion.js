const { body, validationResult } = require('express-validator');

exports.validateUser = [
	body('name').notEmpty().withMessage('Name is required'),
	body('email').isEmail().withMessage('Email must be valid'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];
