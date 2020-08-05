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
}]

//tell the server where to listen 
server.listen(8000, () => {
    console.log("Server started on port 8000")
})