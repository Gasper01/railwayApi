const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const usersadminRouter = require('./routes/usersadmin');

const app = express();

// Middlewares
app.use(helmet());
app.use(compression());
app.use(express.json());

// Routes
app.use('/', usersadminRouter);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
