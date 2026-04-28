
const express = require("express")
const fs = require("fs")

const app = express()
app.use(express.json())

const FILE_PATH = "notes.json"

// helper function to read notes json - js
function readNotes(){
    const data = fs.readFileSync(FILE_PATH, "utf-8")
    return JSON.parse(data)
}

// helper function to save notes - js to json
function saveNotes(notes){
    fs.writeFileSync(FILE_PATH,JSON.stringify(notes, null, 2))
}

// home route
app.get("/",(req,res)=>{
    res.send("Welcome to Jane's Notes API")
})

// get all notes
app.get("/api/notes",(req,res)=>{
    const notes = readNotes()

    res.json({
        status:"success",
        count:notes.length,
        data:notes
    })
})


// get one notes
app.get("/api/notes/:id",(req,res)=>{
    const notes = readNotes()
    const note = notes.find((item)=> String(item.id) === req.params.id)

    if(!note){
        return res.status(404).json({
            status:"error",
            message:`Note with id ${req.params.id} not found`
        })
    }

    res.json({
        status:"success",
        data:note
    })
})

// create a note
app.post("/api/notes",(req,res)=>{
    const notes = readNotes();

    const newNote={
        id:Date.now().toString(), //notes.length + 1,
        title:req.body.title,
        content:req.body.content,
    }

    notes.push(newNote)
    saveNotes(notes)

    res.status(201).json({
        status:"success",
        message:"Note created",
        data:newNote,
    })
})

app.put("/api/notes/:id",(req,res)=>{
    const notes = readNotes();

    const noteIndex = notes.findIndex((item)=>String(item.id) === req.params.id)

    if(noteIndex === -1){
        return res.status(404).json({
            status:"error",
            message:`Note with id ${req.params.id} not found`
        })
    }
    notes[noteIndex] = {
        ...notes[noteIndex],
        title:req.body.title,
        content:req.body.content
    }

    saveNotes(notes)

    res.json({
        status:"success",
        message:"Note Updated",
        data:notes[noteIndex],
    })
})

// delete
app.delete("/api/notes/:id",(req,res)=>{
    const notes = readNotes()

    const newNotes = notes.filter((item)=>item.id !== Number(req.params.id));

    if(notes.length === newNotes.length){
        return res.status(400).json({
            status:"error",
            message:"Note not found",
        })
    }

    saveNotes(newNotes)

    res.json({
        status:"success",
        message:"Note deleted"
    })
})

app.listen(3000,()=>{
    console.log("server running on port 3000");
    
})