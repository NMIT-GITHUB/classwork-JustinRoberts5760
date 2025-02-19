const express = require("express") //Use the express.js module
const morgan = require("morgan") //Use the morgan module

const app = express() //Create express.js app

app.use((req, res, next) => { //Use the request, responce and next function
    if (req.url === "/") { //If the url is equal to / go to the next function
        next()
    } else if (req.url === "/throw") {
        throw new Error("Wrong Path")
    } else {
        next("You did not visit the root!")
    }
})

app.use((req, res) => {
    res.send("Welcome to the home page.")
})

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500)
    next(err)
})

app.use((err, req, res, next) => {
    res.send("Error Message: " + err)
})

app.listen(3000, () => {
    console.log("App Started")
}) 