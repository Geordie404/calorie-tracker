// API dependencies setup

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Mongoose Atlas connection
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