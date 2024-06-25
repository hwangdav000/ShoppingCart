const express = require('express') // express calss constructor
const adminRouter = express() // invoke the class to create express app server

adminRouter.get("/", (req, res)=> {
    res.send("hello world from admin")
})

adminRouter.get("/info", (req, res)=> {
    res.send("info world from admin")
})

module.exports = adminRouter