const express = require("express") //Use express.js module
const log = require("morgan") //Use morgan module
const http = require("http") //Use http module

const app = express() //Create express.js app

app.use((req, res, next) => { //Request, response, Next function
    const minute = new Date().getMinutes() //Create a constant that holds the current time minutes
    if (minute % 2 === 0) { //If the current time minutes remainder of 2 equals 0
        next() //Continue th the next function
    } else { //Otherwise
        res.statusCode = 403 // provide the error
        res.end("Not Authorised.") //End the response providing a reason
    }
});

app.use((req, res) => {
    res.writeHead(200, {"Content-Type": "text/plain"}) //Create a call-back handler request, status code 200, content plain text
    res.end("No No Zone") //End the res providing the reason
});

http.createServer(app).listen(3000) // Create a local server using port 3000