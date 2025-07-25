// backend/controllers/todoController.js
const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  res.json(todos);
};

exports.createTodo = async (req, res) => {
  const todo = await Todo.create({ user: req.user._id, text: req.body.text });
  res.status(201).json(todo);
};

exports.updateTodo = async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { $set: req.body },
    { new: true }
  );
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json({ message: 'Todo deleted' });
};
