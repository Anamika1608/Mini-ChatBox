const express = require("express");
const path = require("path");
const app = express(); 
const mongoose = require('mongoose'); 
const chat = require('./models/chat.js')
const methodOverride = require('method-override');
const ExpressError = require("./ExpressError.js");

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")));

app.listen(8080,()=>{ 
  console.log('server is listening to the port 8080');
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

main().then(console.log("Database connected succesfully"))
.catch(err => console.log(err));

async function main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
} 

app.get("/",(req,res)=>{
  res.render("home.ejs");
})

app.get("/chats", async (req,res)=>{
  try {
    let chats = await chat.find();
    res.render("chats.ejs", {chats});
  }
  catch {
    next(err);
  }
}) 

app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");
})

app.post("/chats",async (req,res)=>{
  try {
    let {from,to,message} = req.body;
    let newChat = new chat({
      from : from,
      to : to,
      message : message,
      created_at : new Date()
    })
    await newChat.save();
    res.redirect("/chats");
  }
  catch (err) {
    next(err) // call the error handling middleware fn
  }
})

// show route
app.get("/chats/:id",async(req,res,next)=>{
  try {
    let id = req.params.id;
    let required = await chat.findById(id);
    if(!chat) next(new ExpressError(500,"Chat not found"));
    res.render('edit.ejs',{required});
  }
  catch(err) { next(err); }
})
 
// edit route 
app.get("/chats/:id/edit",async(req,res)=>{
  try {
    let id = req.params.id;
    let required = await chat.findById(id);
    res.render('edit.ejs',{required});
  }
  catch (err) {
    next(err);
  }
})

app.put("/chats/:id",async(req,res)=>{
  try {
    let new_id = req.params.id;
    let new_msg = req.body.message;
    let ans = await chat.findByIdAndUpdate(new_id,{message:new_msg,updated_at : new Date()},{runValidators : true});
    res.redirect("/chats");
  }
  catch(err) {
    next(err);
  }
})

app.get("/chats/:id/delete",async(req,res)=>{
  try {
    let new_id = req.params.id;
    await chat.findByIdAndDelete(new_id);
    res.redirect("/chats");
  }
  catch(err) {
    next(err);
  }
})

// Error Handling middleware
app.use((err,req,res,next)=>{
  let {status = 500,message="Some error occured"} = err;
  res.status(status).send(message);
})
