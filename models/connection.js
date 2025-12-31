const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
    boardId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Board', 
        required: true 
    },
    fromNodeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Node', 
        required: true 
    },
    toNodeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Node', 
        required: true 
    },
    style: {
        color: { type: String },
        width: { type: Number },
        type: { 
            type: String, 
            enum: ['solid', 'dashed', 'dotted', 'arrow'], 
            default: 'solid' 
        }
    }
});

const Connection = mongoose.model('Connection', connectionSchema);
module.exports = Connection;
