console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');
const _ = require('lodash');
const yargs = require('yargs');

// var user = os.userInfo();
// //console.log(user);
// fs.appendFileSync('greetings.txt', `Hello !${user.username}! You are ${notes.age}`);

// var res = notes.addNote();
// var result = notes.add(2, 3);
// console.log(res);
// console.log(result);

// console.log(_.isString(true));
// console.log(_.isString("Andrew"));
// var filteredArray = _.uniq(['Andrew', 1, 'Andrew', 1, 2, 3, 4, 'Mike', 'Mike']);
// console.log(filteredArray);
const argv = yargs.argv;
// var command  = process.argv[2];
var command  = argv._[0];
console.log('Command: ', command);
//console.log('Process', process.argv);
console.log('Yargs', argv)

if (command == 'add'){
  //console.log('Adding new note');
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    notes.logNote(note);
  } else {
    console.log('Note title taken');
  }
} else if (command == 'list'){
  // console.log('Listing all notes');
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  // allNotes.forEach((note) => {
  //   notes.logNote(note);
  // })
  allNotes.forEach((note) => notes.logNote(note));
} else if (command == 'read'){
  //console.log('Reading notes');
  var note = notes.getNote(argv.title);
  if (note) {
    console.log('Note found');
    notes.logNote(note);
  } else {
    console.log("Note not found");
  }
} else if (command == 'remove'){
  // console.log('Removing notes');
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}
