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



// ----- API GET requests -----

// gets all entries or users
app.get('/entries', async (req, res) => {
	const entries = await Entry.find();

	res.json(entries);
});

//  
app.get('/entries/:id', async (req, res) => {
	const entries = await Entry.find({userId:req.params.id})

	res.json(entries);
});

app.get('/users', async (req, res) => {
	const users = await User.find();

	res.json(users);
});

// ----- API POST requests ------

// new user POST
app.post('/user/new', (req, res) => {
	const user = new User({
        _id: req.body._id,
		username: req.body.username,
        calories: req.body.calories,
        protein: req.body.protein
	});
	user.save(); // saves the user to our collection
	res.json(user); // get back the json response with new user
});

// new entry POST
app.post('/entry/new', (req, res) => {
    // date code for timezone conversion
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const yourDate = new Date(today.getTime() - (offset*60*1000));
    const time = yourDate.toISOString().substring(0,10);
    // json code for completing an entry
	const entry = new Entry({
        userId: req.body.userId,
		entry: req.body.entry,
        calories: req.body.calories,
        protein: req.body.protein,
        date: time
	});
	entry.save(); // saves the user to our collection
	res.json(entry); // get back the json response with new user
});


// ------ API UPDATE requests -----

app.get('/entry/hide/:id', async (req, res) => {
	const entry = await Entry.findById(req.params.id);

	entry.hidden = !entry.hidden;

	entry.save();

	res.json(entry);
})


// ------ API DELETE requests -----

// entry DELETE
app.delete('/entry/delete/:id', async (req, res) => {
	const result = await Entry.findByIdAndDelete(req.params.id);

	res.json({result});
});

// user DELETE
app.delete('/user/delete/:id', async (req, res) => {
	const result = await User.findByIdAndDelete(req.params.id);

	res.json({result});
});


// set our port for localhost
app.listen(3002, ()=> console.log("server started on port 3002"));