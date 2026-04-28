const express = require("express")
const notesRoutes = require("./routes/notes.routes")

const app = express()
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to Jane's Note API")
})

app.use("/api/notes", notesRoutes)

module.exports = app