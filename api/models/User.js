// model file with calories DB schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({

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
const User = mongoose.model("User", UserSchema);
module.exports = User;