//import dependencies
const express = require("express");
const shortid = require("short-id");
const bodyparser = require("body-parser");

//create a new express server
const server = express()

//
server.use(bodyparser.json());

//created users
let users = [{
    id: shortid.generate(),
    name: "John",
    bio: "Lives in North Caronlina"
},{
    id: shortid.generate(),
    name: "Jane",
    bio: "Lastname Doe"
},{
    id: shortid.generate(),
    name: "Xander",
    bio:"Not enough people named Xander"
},{
    id: shortid.generate(),
    name:"Gwendlyn",
    bio:"I don't even know if I spelled her name correctly"
}];

//initial server function 
server.get("/", (req, res) => {
    res.json({message: 'Hello from my first node project'})
});

//post request
server.post("/api/users", (req, res) => {
    const { name, bio } = req.body;
    
    if(!name || !bio ) {
        return res.status(400).json({ message: 'Please provide name and bio for the user'});
    }
    if(users.find(user => user.name === name)) {
        return res.status(500).json({ message: 'There was an error while saving the user to the database'})
    }

    const user = { id: shortid.generate(), name, bio };
    users.push(user);
    res.status(201).send(user);
});

//get request
server.get("/api/users", (req, res) => {
    if (!req) res.status(500).json({ message: 'The users information could not be retrieved.'});
    res.send(users);
});

//get by id
server.get("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === id);

    if(!id) {
        return res.status(500).json({ message: 'The user information could not be retrieved.'})
    }
    if(!user){
        return res.status(404).json({ mesage: 'The user with the specified ID doesn not exist.'})
    }

    res.status(200).send(user);
});

//tell the server where to listen 
server.listen(8000, () => {
    console.log("Server started on port 8000")
})