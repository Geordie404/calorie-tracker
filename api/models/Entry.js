// model file with entry DB schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EntrySchema = new Schema({

    // Person - User who made this entry
    username: {
        type: String,
        required: [true, 'Username is required']
      },

    // Food Item Name
    entry: {
        type: String,
        required: [true, 'Entry is required']
      },

    // calories and protein for the entry
	macros: {
        calories: Number,
        protein:  Number
    },

    // if the entry is considered in the calculation or not
    hidden: { type: Boolean, default: false },
    
    // date item was entered
	date: { type: Date, default: Date.now }
});

// Module exporting code
const Entry = mongoose.model("Entry", EntrySchema);
module.exports = Entry;