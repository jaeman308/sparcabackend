const express = require("express");
const router = express.Router();
const Connection = require("../models/connection");
const Node = require("../models/node");
const Board = require("../models/board");

router.post("/", async (req,res) => {
    try{
        const newNode = await Node.create (req.body);
        res.status (201).json (newNode);

    }catch (error) {
        res.status(500).json ({message: "Error creating node", error});
    }
 });

 router.get("/", async (req,res) => {
    try{
        const nodes = await Node.find();
        res.status (200).json (nodes);
    }catch (error) {
        res.status(500).json ({message: "Error fetching ndoes", error});
    }
 })

 router.get("/:id", async (req,res) => {
    try{
        const node = await Node.findById(req.params.id);
        if(!node){
            return res.status(400).json({message: "Node not found"});
        }
        res.status (200).json (node);
    }catch (error) {
        res.status(500).json ({message: "Error fecthing node", error});
    }
 });

 router.put("/:id", async (req,res) => {
    try{
        const updateNode = await Node.findByIdAndUpdate (req.params.id, req.body, {new: true});
        if(!updateNode){
            return res.status(404).json({message: "Node not found"});
        }
        res.status (200).json (upadteNode);
    }catch (error) { 
        res.status(500).json ({message: "Error updating node", error});
    }

 });


 router.delete("/:id", async (req,res) => {
    try {
        const node = await Node.findById(req.params.id);
        if(!node) {
            return res.status(400).json({messag: "Node not found"});

        }
        const boardID = node.boardId;
        const connections = await Connection.find({
            $or: [
                {fromNodeId: node._id},
                {toNodeId: node._id}
            ]
        });
        const connectionIds = connections.map(conn => conn._id);

        await Connection.deleteMany({
            _id: { $in: connectionIds }
        });

        await Board.findByIdAndUpdate(boardID, {
            $pull: {
                nodes: node._id,
                connections: { $in: connectionIds }
            }
        });
        await Node.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Node deleted successfully"});   


    }catch (error){
        res.status(500).json ({message: "Error deleting ndoe", error});
    }
 });

 module.exports = router;