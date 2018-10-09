const Logger = require('./logger');
const logger = new Logger();

//Register a listener
logger.on('messageLogged', function() { //arg or event 
    console.log('Listener called');
});

logger.log('message');

