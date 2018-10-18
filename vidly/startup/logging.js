require('express-async-errors');
const winston = require('winston');
//require('winston-mongoose');

module.exports = function() {
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'uncaughtExceptions.log'}));
    
    // process.on('unhandledRejection', (ex) => {
    //     console.log('WE GOT AN UNHANDLED REJECTION');
    //     winston.error(ex.message, ex);
    //     process.exit(1);
    // });
    
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
    
    winston.add(new winston.transports.File({ filename: "logfile.log" }));     
}