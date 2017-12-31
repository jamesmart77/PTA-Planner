const express = require("express");
const api = express.Router();
// const db = require('../models/index');


// get all events
api.get("/api/events", (req, res)=>{

});

// create an event
api.post("/api/events", (req, res)=>{

});

// udpate an event
api.put("/api/events/:id", (req, res)=>{

});

// delete an event
api.delete("/api/events/:id", (req, res)=>{

});

// get all users
api.get("/api/users", (req, res)=>{
  
});

// create a user
api.post("/api/users", (req, res)=>{

});

// edit a user
api.put("/api/users/:id", (req, res)=>{

});

// delete a user
api.delete("/api/users/:id", (req, res)=>{

});

// try to login an admin
api.post("/api/admin/login", (req, res)=>{

});

// try to login a user
api.post("/api/volunteer/login", (req, res)=>{

});

// add a volunteer to an event
api.post("/api/staging", (req, res)=>{
    

});

module.exports = api;


