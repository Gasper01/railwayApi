const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const usersadminRouter = require('./routes/usersadmin');

const app = express();

// Middlewares
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:3000', // Especifica el origen permitido para las solicitudes
	})
);

// Routes
app.use('/', usersadminRouter);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send(err.stack);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
