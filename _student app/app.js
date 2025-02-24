const http = require("http")
const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")

const app = express()

const entries = []
app.locals.entries = entries

app.set("views", path.resolve(__dirname, "views"))
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extent: false}))

app.get("/", (req,res) => {
    res.render("index")
})

app.get("/new-entry", (req,res) => {
    res.render("new-entry")
})

app.post("/new-entry", (req,res) => {
    if(!req.body.title || !req.body.body) {
        res.status(400).send("Entries must have a title and an information body. Please enter your details")
        return
    }
    entries.push({
        title: req.body,
        body: req.body.body,
        published: new Date()
    });
    res.redirect("/")
})

app.get("/edit-entry/:id", (req,res) => {
    const id = parseInt(req.params.id)
    const entry = entries.find(e => e.id === id)
    if(!entry) {
        res.status(404).send("Entry not found")
        return
    }
    res.render("edit-entry", {entry})
})

app.post("/edit-entry/:id", (req,res) => {
    const id = parseInt(req.params.id)
    const entry = entries.find(e => e.id === id)
    if (!entry) {
        res.status(404).send("Entry not found")
        return
    }
    if (!req.body.title || !req.body.body) {
        res.status(400).send("Both title and text are required!")
    }
    entry.title = req.body.title
    entry.body = req.body.body
    entry.published = new Date()
    res.redirect("/")
})

app.use((res,req) => {
    res.status(404).render("404")
})

http.createServer(app).listen(3000, () => { //Create the server giving a port number
    console.log("Student Example App Started.") //Creating a confirmation message to user
})