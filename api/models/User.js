// model file with calories DB schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    _id: {
      type: Number,
      required: [true, 'ID is required']
    },
  
    username: {
      type: String,
      required: [true, 'Username is required']
    },
    
    calories: {
      type: Number,
      required: [true, 'User caloric intake is required']
    },

    protein: {
      type: Number,
      required: [true, 'User protien intake is required']
    },

    timestamp: {
      type: String,
      default: Date.now()
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;