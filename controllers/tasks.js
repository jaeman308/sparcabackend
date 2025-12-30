const express = require('express');
const router = express.Router();
const Task = require('../models/Tasks');

router.post ("/", async (req, res) => {
    try{
        const newTask = await Task.create(req.body)
    }catch (error){
        res.status(500).json({message: "Error creating task", error});
    };
});

router.get("/", async (req,res) => {
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }catch (error){
        res.status(500).json({message: "Error fetching tasks", error});
    }
});

router.get("/:id", async (req,res) => {
    try {
        const task = await Task.findById(req.params.id)
        if(!task){
            return res.status(404).jsong({message: "Task not found"});
        }
        res.status(200).json(task);
    }catch (error){
        res.status(500).json({message: "Error fetching task", error});
    }
});

router.put("/:id", async (req,res) => {
    try {
        const updateTask = await Task.findByIdAndUpdate (req.params.id, req.body, {new: true});
        if(!updateTask){
            return res.status(404).json({message: "Task not found"});
        }
        res.status(200).json(updateTask)
    }catch (error) {
        res.status(500).json({message: "Error updating task", error});
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const  deleteTask = await Task.findByIdAndDelete(req.params.id);
        if(!deleteTask){
            return res.status(404).json({message: "Task not found"});
        }
        res.status(200).json({message: "Task deleted successfully"});
        
    }catch (error){
        res.status(500).json({message: "Error deleting task", error});
    }
});

module.exports = router;