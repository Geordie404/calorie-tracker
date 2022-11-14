// model file with item DB schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemSchema = new Schema({

    // Person - User who made this item
    userId: {
      type: Number,
      required: [true, 'unique ID is required']
    },

    // Food Item Name
    entry: {
        type: String,
        required: [true, 'Item is required']
      },

  
    calories: {
      type: Number,
      required: [true, 'User caloric intake is required']
    },

    protein: {
      type: Number,
      required: [true, 'User protien intake is required']
    },
      
  

    // if the item is considered in the calculation or not
    hidden: { type: Boolean, default: false },
    
    // date item was entered
	  date: { type: String, default: Date.now }
});

// Module exporting code
const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;