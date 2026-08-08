# Server JS

const app = require('./src/app')
const connectDB = require('./src/db/db')


connectDB() 

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})


# App JS

const express = require('express');
const noteModel = require('./modules/note.model')

const app = express();
app.use(express.json())

/* note = {title, description} */

app.post('/notes', async (req, res) => {
    const data = req.body /* {title, description} */
    await noteModel.create({
        title: data.title,
        description: data.description
    })

    res.status(201).json({
        message: "Note Created"
    })
})

app.get('/notes', async (req, res) => {

    const notes = await noteModel.find() // []

    // const notes = await noteModel.findOne({
    //     title:"test_title_1"
    // })

    res.status(200).json({
        message: "Notes fetched successfully",
        notes: notes
    })
})

app.delete('/notes/:id', async (req, res) => {

    const id = req.params.id

    await noteModel.findOneAndDelete({
        _id: id
    })

    res.status(200).json({
        message: "Note deleted successfully"
    })
})
 
app.patch('/notes/:id', async(req, res) => {
    const id = req.params.id
    const description = req.body.description

    await noteModel.findOneAndUpdate(
        {_id: id}, {description: description}
    )

    res.status(200).json({
        message: "Note updated successfully"
    })
})

module.exports = app


# Models/note.model.js

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    description: String
})


const noteModel = mongoose.model("note", noteSchema)

module.exports = noteModel


# src/db/db.js

const mongoose = require('mongoose');

async function connectDB() {

    await mongoose.connect("mongodb+srv://Ashu:ayush27june@cluster-apt.z3hhzw7.mongodb.net/halley")

    console.log("Connected to DataBase")
}

module.exports = connectDB