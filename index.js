const express = require('express'); 
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json())



const Todo = require('./model/Todo');
const mongoDBAccess = 'mongodb+srv://dabocer237:stUJYnu4RxkAJBpr@project1.8cm3j.mongodb.net/'


//hpttp methods get, post, put, delete


app.get('/', (req, res) => {
    res.send('Hello World!');
});

mongoose.connect(mongoDBAccess).then(() => console.log('Connected!'));




// this is to create or add to the DB
//need body-parser to parse the body of the request

app.post('/task', (req, res) => {
    const addTask = async () => {
        try {
            let task = new Todo({
                todoName:req.body.todoName,
                //date: req.body.date.now(),
                isCompleted: false,
                desc: 'Learn how to bake for sister bday'
            })
            
            //task.save();
            let data = await task.save();
            res.send(data);
            //console.log(data)
        } catch (error) {
            res.send(error);
            console.log(error);
        }

        
    }
    addTask();  
})





// this is to read from the DB -takes one function as an argument, hass access to error and result

// Todo.find({}, (err, result) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// })

app.get('/tasks', async (req, res) => {
    const findAllTodos = async () => {
        try {
            const todo = await Todo.find({});
            res.send(todo);
            console.log(todo);
        } catch (error) {
            res.send(error);
            console.log(error);
        }
    }
    findAllTodos();
})



// this is to update the DB

app.put('/task/:id', (req, res) => {
    //req.body - data they want to send in the body - object multiple items in the object
    //req.params - added in the url
    // cannot get means name is wrong
    const updateData = async () => {
        // camelcase
        try {
            let data = await Todo.findOneAndUpdate({_id:req.params.id},{isCompleted:req.body.isCompleted, todoName:req.body.todoName});
            res.send(data);
        }
        catch (error) {
            res.send(error);
            console.log(error);
        }
    }
    updateData();
})






// this is to delete from the DB

app.delete('/task/:id', (req, res) => {
    const deleteData = async () => {
        try {
            //let data = await Todo.deleteMany({todoName:"Learn how to bake"})
            let data = await Todo.findByIdAndDelete(req.params.id);
            res.send({message:'deleted', data});
            console.log(data)
        } catch (error) {
            res.send(error);
            console.log(error);
        }
    }
    
    deleteData();

})



app.listen(4000);