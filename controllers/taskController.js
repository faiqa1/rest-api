const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Task = require("../models/taskModel"); 

// @desc Get all tasks
// @route GET /api/tasks
// @access private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user_id: req.user.id });
  res.status(200).json(tasks);
});

// @desc Create New task
// @route POST /api/tasks
// @access private
const createTask = asyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);

  const { title, description, completed } = req.body;
  
  if (!title) {
    res.status(400);
    throw new Error("Title is mandatory");
  }
  const task = await Task.create({
    title,
    description,
    completed,
    user_id: req.user.id,
  });

  res.status(201).json(task);
});

// @desc Get a single task
// @route GET /api/tasks/:id
// @access private
const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  if (task.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("unauthorized user");
  }

  res.status(200).json(task);
});

// @desc Update a task
// @route PUT /api/tasks/:id
// @access private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  if (task.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("unauthorized user");
  }
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedTask);
});

// @desc Delete a task
// @route DELETE /api/tasks/:id
// @access private
const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log("Received task ID:", id); 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("Invalid ObjectId format:", id); 
    return res.status(400).json({ message: "Invalid task ID fo" });
  }
  const task = await Task.findById(id);
  console.log("Found task:", task);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  if (task.user_id.toString() !== req.user.id) {
    return res.status(403).json({ message: "unauthorized user" });
  }
  await Task.findByIdAndDelete(id);
  console.log("Deleted task ID:", id); 
  res.status(200).json({ message: "Task deleted successfully" });
});


module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
};
