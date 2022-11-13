// model file with calories DB schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({

    // Person - User
    username: {
        type: String,
        required: [true, 'Username is required']
      },

    // metabolism calories
    metaCalories: Number,

    // metabolism protein
    metaProtein: Number
});

// Module exporting code
const User = mongoose.model("User", userSchema);
module.exports = User;