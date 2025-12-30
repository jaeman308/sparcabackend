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

module.exports = router;