const express = require("express");
const router = express.Router();
const Connection = require("../models/connection");
const Board = require("../models/board");

router.post("/", async (req, res) => {
    try{
        const board = await Board.findById(req.body.boardId);
        if (!board) 
            {return res.status(404).json({ message: "Board not found" });}
        const newConnection = await Connection.create(req.body);
        await Board.findByIdAndUpdate(newConnection.boardId, { $push: { connections: newConnection._id } });
        res.status(201).json(newConnection);
    }catch (error) {
        res.status(500).json({message: "Error creating connection", error});

    }
    
});

router.delete("/:id", async (req,res) => {
    try {
       const connection = await Connection.findById(req.params.id);
       if(!connection){
        return res.status(404).json({message: "Connection not found"});
       }
       await Board.findByIdAndUpdate(connection.boardId, { $pull: { connections: connection._id } });
       await Connection.findByIdAndDelete(req.params.id);
       res.status(200).json({message: "Connection deleted successfully"});

    }catch (error) {
        res.status(500).json({message: "Error deleting connection", error});
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const updatedConnection = await Connection.findByIdAndUpdate(
            req.params.id,
            req.body,          
            { new: true }     
        );

        if (!updatedConnection) {
            return res.status(404).json({ message: "Connection not found" });
        }

        res.status(200).json(updatedConnection);

    } catch (error) {
        res.status(500).json({ message: "Error updating connection", error });
    }
});

module.exports = router;