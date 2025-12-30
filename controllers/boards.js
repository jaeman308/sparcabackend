const express = require('express')
const router = express.Router();
const Board = require('../models/Board')

router.post("/", async (req, res) => {
    try {
        const newBoard = await Board.create(req.body);
        res.status(201).json(newBoard);
    }catch (error) {
        res.status(500).json({message: "Error creating board", error});
    }
});

router.get("/", async (req, res) => {
    try {
        const boards = await Board.find();
        res.status(200).json(boards);
    } catch (error) {
        res.status(500).json({message: "Error fetching boards", error});
    }
});
router.get("/:id", async (req, res) => {
    try{
        const board =  await Board.findById(req.params.id);
        if(!board){
            return  res.status(404).json({message: "Board not found"});
        }
        res.status(200).json(board);    
    }catch (error) {
        res.status(500).json({message: "Error fetching board", error});
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedBoard = await Board.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedBoard){
            return res.status(404).json({message: "Board not found"});
        }
        res.status(200).json(updatedBoard);
    } catch (error) {
        res.status(500).json({message: "Error updating board", error});
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedBoard = await Board.findByIdAndDelete(req.params.id);
        if(!deletedBoard){
            return res.status(404).json({message: "Board not found"});
        }
        res.status(200).json({message: "Board deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error deleting board", error});
    }
}); 

module.exports = router;