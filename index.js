const express = require('express');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const itemsRouter = require('./routes/items');
const helmet = require('helmet');

const app = express();

// Middlewares
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/items', itemsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
