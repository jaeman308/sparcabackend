import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
    board_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true},
    item: {type: String, required: true},
    category: {type: String, enum: ['furniture', 'lighting', 'fixtures', 'painting', 'decorative', 'material', 'contractor'], required: true},
    price: {type: Number, required: true, default: $0},
    actualPrice: {type: Number, required: true, default: 0},
});

const Budget = mongoose.model('Budget', BudgetSchema);

export default Budget;