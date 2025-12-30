const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
    id: {type: String, required: true},
    board_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true},
    from_node_id: {type: String, required: true},
    to_node_id: {type: String, required: true},
    style: {
        color: {type: String},
        width: {type: Number},
        type: {type: String, enum: ['solid', 'dashed', 'dotted', 'arrow'], default: 'solid'},
    }
}, {_id: false});

const Connection = mongoose.model('Connection', connectionSchema);
module.exports = Connection;

