const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function(){
//winston.add(new winston.transports.File({
//     filename: `${__dirname}/logs/appError.log`,
//     timestamp: true
// }));

// process.on('uncaughtException', (ex) => {
//     // console.log('WE GOT AN UNCAUGHT EXCEPTION');
//     winston.error(ex.message, ex);
//     process.exit(1);
// });
    const db = config.get('db');
    mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}..`));
    //.catch(err => console.log('Could not connect to MongoDB..'));
}