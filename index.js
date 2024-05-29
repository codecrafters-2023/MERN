const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const Test = require('./models/user')

const app = express();
app.use(cors());
app.use(express.json())
const port = 8000;

mongoose.connect('mongodb+srv://codecrafters:Devteam2024@data.ma9zn4r.mongodb.net/alldata?retryWrites=true&w=majority&appName=data')
.then(res => console.log("mongodb connected"))
.catch(err => console.console.log('Error connecting to MongoDB: ' + err));


app.post('/add', (req, res) => {
    const {name, email} = req.body
    Test.create({
        name, email
    })
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

app.get('/get', (req, res) =>{
    Test.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

app.delete('/delete/:id', (req, res) =>{
    const id = req.params.id
    Test.findByIdAndDelete(id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

app.put('/update/:id', (req, res) =>{
    const id = req.params.id
    Test.findByIdAndUpdate({_id: id} , {status: true})
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})


app.listen(port, () => {
    console.log("Server listening on " + port);
});