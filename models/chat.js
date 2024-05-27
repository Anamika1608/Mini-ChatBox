const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from : {
     type : String,
     required : true
    },
    to : {
     type : String,
     required : true
    },
    message: {
     type : String,
     maxLength : [50, "Message is too long"]
    },
    created_at : {
     type : Date,
     required : true
    },
    updated_at : {
      type : Date
    }
 })
 
const chat = mongoose.model("chat",chatSchema);
module.exports = chat; 