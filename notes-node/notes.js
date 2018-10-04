console.log('Starting notes.js');

const fs = require('fs');
// module.exports.age = 25;

// module.exports.addNote = function () {
//
// }
//
// module.exports.addNote = () => {
//   console.log('addNote');
//   return 'New note';
// };
//
// module.exports.add = (a, b) => {
//   console.log('add');
//   return a + b;
// }

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json')
    notes = JSON.parse(notesString);
    return notes;
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  //console.log('Adding note', title, body);
  // var notes = [];
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  // try {
  //   var notesString = fs.readFileSync('notes-data.json')
  //   notes = JSON.parse(notesString);
  // } catch (e) {
  //
  // }

  // var duplicateNotes = notes.filter((note) => {
  //   return note.title == title;
  // });

  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length == 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }

};


var getAll = () => {
  //console.log('Getting all notes');
  return fetchNotes();
}

var getNote = (title) => {
  //console.log("Getting note", title);
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0];
}

var removeNote = (title) => {
  //console.log("Removing note", title);
  //fetch notes
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);

  saveNotes(filteredNotes);
  //filter notes, removing the one with title of argument
  return notes.length !== filteredNotes.length;

}

var logNote = (note) => {
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Title: ${note.body}`);
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
