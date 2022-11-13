// model file with entry DB schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EntrySchema = new Schema({

    // Person - User who made this entry
    userId: {
      type: String,
      required: [true, 'unique ID is required']
    },

    // Food Item Name
    entry: {
        type: String,
        required: [true, 'Entry is required']
      },

  
    calories: {
      type: Number,
      required: [true, 'User caloric intake is required']
    },

    protein: {
      type: Number,
      required: [true, 'User protien intake is required']
    },
      
  

    // if the entry is considered in the calculation or not
    hidden: { type: Boolean, default: false },
    
    // date item was entered
	  date: { type: Date, default: Date.now }
});

// Module exporting code
const Entry = mongoose.model("Entry", EntrySchema);
module.exports = Entry;