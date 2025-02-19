const express = require("express") //Use express.js module
const app = express() //Create express.js app

app.get("/random/:min/:max", (req, res) => { //Get random min man number from route and request and response function
    const min = parseInt(req.params.min) //Save the fetch min number as an integer as a min variable
    const max = parseInt(req.params.max) //Save the fetched max number as an integer as a max variable

    if (isNaN(min) || isNaN(max)) { //See whether the min or max is a number
        res.status(400)
        res.json({error: "Bad Request"})
        return
    }

    const result = Math.round(Math.random() * (max-min) + min)
    res.json({result: result})
});

app.listen(3000, () => {
    console.log("App started on Port 3000")
})