import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    board_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true},
    description: {type: String, required: true},
    dueDate: {type: Date},
    priority:{type: String, enum: ['low', 'medium', 'high'], default: 'low', required: true},
    status: {type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending', required: true},
});

const Task = mongoose.model('Task', taskSchema);
export default Task;    


