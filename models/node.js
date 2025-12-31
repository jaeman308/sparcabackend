const mongoose = require('mongoose');


const nodeSchema = new mongoose.Schema({
    board_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true},
    type: {type: String, enum: ['text', 'image'], required: true},
    position: {
        x: {type: Number, required: true},
        y: {type: Number, required: true}
    },
    size: {
        width: {type: Number, required: true},
        height: {type: Number, required: true}
    },
    content: {
        type: {type: String},
        imageUrl: {type: String}
    },
    style: {
        color: {type: String},
        fontSize: {type: Number}
    }
});


const Nodes = mongoose.model('Node', nodeSchema);
module.exports = Nodes;