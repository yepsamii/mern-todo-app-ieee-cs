import express from "express";
import Todo from "../models/todo.model.js";
import { logger } from "../utils/logger.js";

const router = express.Router();

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    logger.info(`GET /api/todos - fetched ${todos.length} todo(s)`);
    res.json(todos);
  } catch (error) {
    logger.error(`GET /api/todos failed: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

// Add a new todo
router.post("/", async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  try {
    const newTodo = await todo.save();
    logger.info(`POST /api/todos - created todo id=${newTodo._id}`);
    res.status(201).json(newTodo);
  } catch (error) {
    logger.error(`POST /api/todos failed: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

// Update a todo (text and/or completed)
router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      logger.warn(`PATCH /api/todos/${req.params.id} - todo not found`);
      return res.status(404).json({ message: "Todo not found" });
    }

    if (req.body.text !== undefined) {
      todo.text = req.body.text;
    }
    if (req.body.completed !== undefined) {
      todo.completed = req.body.completed;
    }

    const updatedTodo = await todo.save();
    logger.info(
      `PATCH /api/todos/${req.params.id} - updated (completed=${updatedTodo.completed})`
    );
    res.json(updatedTodo);
  } catch (error) {
    logger.error(`PATCH /api/todos/${req.params.id} failed: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

// Delete an todo
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) {
      logger.warn(`DELETE /api/todos/${req.params.id} - todo not found`);
      return res.status(404).json({ message: "Todo not found" });
    }
    logger.info(`DELETE /api/todos/${req.params.id} - deleted`);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    logger.error(`DELETE /api/todos/${req.params.id} failed: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

export default router;
