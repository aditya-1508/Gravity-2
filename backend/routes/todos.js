const express = require('express');
const Todo = require('../models/Todo');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get all todos
router.get('/', authMiddleware, async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  res.json(todos);
});

// Add a new todo
router.post('/', authMiddleware, async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    user: req.user._id
  });
  const saved = await newTodo.save();
  res.status(201).json(saved);
});

// Update a todo
router.put('/:id', authMiddleware, async (req, res) => {
  const updated = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { $set: req.body },
    { new: true }
  );
  res.json(updated);
});

// Delete a todo
router.delete('/:id', authMiddleware, async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
