const Todo = require('../models/Todo');

const todoController = {
    create: async (req, res) => {
        const { title, description } = req.body;
        const newTodo = new Todo({ title, description });
        try {
            await newTodo.save();
            res.status(201).json(newTodo);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    get: async (req, res) => {
        try {
            const todos = await Todo.find();
            res.status(200).json(todos);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    getSingleTask: async (req, res) => {
        const { id } = req.params;
        try {
            const todo = await Todo.findById(id);
            if (!todo) {
                return res.status(404).json({ message: 'Task not found' });
            }
            todo.isCompleted = !todo.isCompleted;
            await todo.save();
            res.status(200).json(todo);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { title, description } = req.body;
        try {
            const updatedTodo = await Todo.findByIdAndUpdate(
                id,
                { title, description },
                { new: true }
            );
            res.status(200).json(updatedTodo);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    markComplete: async (req, res) => {
        const { id } = req.params;
        try {
            const todo = await Todo.findById(id);
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            todo.isCompleted = !todo.isCompleted;
            await todo.save();
            res.status(200).json(todo);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const todo = await Todo.findByIdAndDelete(id);
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.status(200).json({ message: 'Todo deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};

module.exports = todoController;