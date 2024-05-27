const mongoose = require('mongoose');
const chat = require('./models/chat.js');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

main().then(console.log("Database connected succesfully"))
.catch(err => console.log(err));

let manyChats = [
    {
        from : "Rohit",
        to:"Mohit",
        message : "Can you teach me js",
        created_at: new Date()
    },
    {
        from : "Neha",
        to:"Suhana",
        message : "You know what happened today?",
        created_at: new Date()
    },
    {
        from : "Sristi",
        to:"jayesh",
        message : "Have u done ur hw?",
        created_at: new Date()
    },
    {
        from : "Alexa",
        to:"Anamika",
        message : "Nice weather",
        created_at: new Date()
    }
]

chat.insertMany(manyChats); 