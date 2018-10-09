const startupDebugger = require('debug')('app: startup');
const dbDebugger = require('debug')('app: db');
const home = require('./routes/home');
const courses = require('./routes/courses');
const express = require('express');
const config = require('config');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./routes/middleware/logger');
const app = express();


app.set('view engine', 'pug');
app.set('views', './views');


console.log(`NODE_ENV: ${process.env.NODE_ENV}`); //undefined
console.log(`App: ${app.get('env')}`);

app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true })); //key=value&key=value => req.body
app.use(express.static('public'));
app.use(logger);
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled..');
};

// Db work
dbDebugger('Connected to the database...');

app.use(morgan('tiny'));
// app.use(function(req, res, next) {
//     console.log('Authenticating..');
//     next();
// });


// app.get('/', (req, res) => {
//     res.send('Hello World!!!');
// });

// PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));