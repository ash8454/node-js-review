const fs = require('fs');

//Asynchronous method
const files = fs.readdirSync('./');

console.log(files);

//Synchronous method
fs.readdir('./', function(err, files) {
    if (err) console.log('Error', err);
    else console.log('Result', files);
});
