const genres = require('./routes/genres');
const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const customers = require('./routes/customers');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.log('Could not connect to MongoDB..'));

app.use(express.json()); //req.body
app.use('/api/genres/', genres);
app.use('/api/customers/', customers);

// PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));