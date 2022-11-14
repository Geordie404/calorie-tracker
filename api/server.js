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
const Item = require('./models/Item');

function getDay(){
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const yourDate = new Date(today.getTime() - (offset*60*1000));
    const day = yourDate.toISOString().substring(0,10);
    return day;
}


// ----- API GET requests -----

// gets all items or users
app.get('/items', async (req, res) => {
	const items = await Item.find();

	res.json(items);
});

app.get('/users', async (req, res) => {
	const users = await User.find();

	res.json(users);
});

//  gets all items of a user
app.get('/items/:id', async (req, res) => {
	const items = await Item.find({userId:req.params.id})

	res.json(items);
});

//  gets a users caloric information
app.get('/user/:id', async (req, res) => {
	const user = await User.find({_id:req.params.id})

	res.json(user);
});

//  gets all items of a user today
app.get('/items/today/:id', async (req, res) => {
    const day = getDay();
	const items = await Item.find({userId:req.params.id, date:day})

	res.json(items);
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

// new item POST
app.post('/item/new', (req, res) => {
    const day = getDay();
    // json code for completing an item
	const item = new Item({
        userId: req.body.userId,
		entry: req.body.entry,
        calories: req.body.calories,
        protein: req.body.protein,
        date: day
	});
	item.save(); // saves the user to our collection
	res.json(item); // get back the json response with new user
});


// ------ API UPDATE requests -----

app.get('/item/hide/:id', async (req, res) => {
	const item = await Item.findById(req.params.id);

	item.hidden = !item.hidden;

	item.save();

	res.json(item);
})


// ------ API DELETE requests -----

// item DELETE
app.delete('/item/delete/:id', async (req, res) => {
	const result = await Item.findByIdAndDelete(req.params.id);

	res.json({result});
});

// user DELETE
app.delete('/user/delete/:id', async (req, res) => {
	const result = await User.findByIdAndDelete(req.params.id);

	res.json({result});
});


// set our port for localhost
app.listen(3002, ()=> console.log("server started on port 3002"));