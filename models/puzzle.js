const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://andy:corn@ds023458.mlab.com:23458/minesweeper', function(err) {
  if (err) return console.error(err);
  console.log('connected to mongoDB');
});

var puzzleSchema = new Schema({
  index: Number,
  board: String,
});

var Puzzle = mongoose.model('Puzzle', puzzleSchema);

module.exports = Puzzle;