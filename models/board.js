const mongoose = require('mongoose');


const boardSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Connection" }],
    nodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Node" }]
});


const Board = mongoose.model('Board', boardSchema);
module.exports = Board;   