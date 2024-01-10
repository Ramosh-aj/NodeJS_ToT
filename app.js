

const express = require("express");
//inite app
const app = express() ; 

const Joi= require("joi");



const bookPath = require("./routes/books");
const autherPath = require("./routes/authers");

//Mongo
const mongoose= require("mongoose");

//connection To Database
mongoose
        .connect("mongodb:://localhost/bookStoreBB")
        .then(() => console.log("Connected To MongoDB..."))
        .catch((error) => console.log("Connection Failed To MongoDB!" , error));

 //middelware
 //to convert the json file to js obj becouse the express can handle with json
 app.use(express.json());

 

 //import to the roter
 app.use("/api/books",bookPath);
 app.use("/api/authers/",autherPath);
 

//the 4 main HTTP method/ HTTP verbs
//////////////////////////////////////

//app.get();
// app.push();
// app.delete();
// app.post();
///////////////////////////////////////





//Runing Server
const PORT= 5000;
app.listen(PORT,()=> console.log(`server is runing in port ${PORT}`));