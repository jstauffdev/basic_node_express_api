const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  todo_item: String,
  complete: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
