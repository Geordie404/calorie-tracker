// API dependencies setup

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Mongoose Atlas establish connection

const atlasURI = 
    "mongodb+srv://geordie:B1ytxkubWCjyMgr1@cluster0.mro8toc.mongodb.net/?retryWrites=true&w=majority"


    try {
        // Connect to the MongoDB cluster on Atlas
         mongoose.connect(
          atlasURI, // my cluster connection string
          { useNewUrlParser: true, useUnifiedTopology: true },
          () => console.log("Mongoose is connected to Atlas")
        );
    
      } catch (e) {
        console.log("could not connect");
      }
    
// Acquire Models
const User = require('./models/User');
const Entry = require('./models/Entry');



// API GET
app.get('/entries', async (req, res) => {
	const entries = await Entry.find();

	res.json(entries);
});

app.get('/users', async (req, res) => {
	const users = await User.find();

	res.json(users);
});

// set our port for localhost
app.listen(3002, ()=> console.log("server started on port 3002"));