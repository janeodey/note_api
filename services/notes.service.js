const { FILE } = require("dns");
const fs = require("fs")
const path = require("path");

const FILE_PATH = path.join(__dirname, "../data/notes.json")

function readNotes(){
    const data = fs.readFileSync(FILE_PATH, "utf-8")
    return JSON.parse(data)
}

function saveNotes(notes){
    fs.writeFileSync(FILE_PATH,JSON.stringify(notes, null, 2))
}

module.exports={
    readNotes,
    saveNotes,
}