const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    username :{type: String, required: true, unique: true},
    hashedPassword: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    boards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Board" }]
});

userSchema.set('toJSON', {
    transform: (doc,ret) => {
        delete ret.hashedPassword;
        return ret;
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;  