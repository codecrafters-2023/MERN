const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const Test = require('./models/user')
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json())
const port = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URL)
    .then(res => console.log("mongodb connected"))
    .catch(err => console.console.log('Error connecting to MongoDB'))


app.post('/add', async (req, res) => {
    const { title, description } = req.body
    await Test.create({
        title, description
    })
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

app.get('/get', async (req, res) => {
    await Test.find()
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

app.get('/getSingleData/:id', async (req, res) => {
    const id = req.params.id
    // console.log(id);
    await Test.findById({ _id: id })
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    await Test.findByIdAndDelete(id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

app.put('/update/:id', async (req, res) => {
    const id = req.params.id
    console.log(id);
    const { title, description } = req.body;
    console.log(title, description);
    await Test.findOneAndUpdate({ _id: id }, { title: title, description: description })
        .then((result) => res.json(result))
        .catch((err) => res.json(err))

})

app.listen(port, () => {
    console.log("Server listening on " + port);
});