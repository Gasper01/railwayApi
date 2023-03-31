const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const usersadminRouter = require('./routes/usersadmin');

const app = express();

// Middlewares
app.use(helmet(), compression(), cors(), express.json());

// Routes
app.use('/', usersadminRouter);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

// Default 404 middleware
app.use('*', (req, res) => res.status(404).send('Not found'));

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
