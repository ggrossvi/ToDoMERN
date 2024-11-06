const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    todoName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        required: false
    }       
});
const Todo = mongoose.model('Todo', Schema);

//console.log(module);
module.exports = Todo;