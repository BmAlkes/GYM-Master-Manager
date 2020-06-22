const express = require("express")
const server = express()
const routes = require("./routes")
const methodOverride = require("method-override")

const nunjucks = require("nunjucks")

server.use(express.urlencoded({extended:true}))
server.use(express.static("public"))
server.use(methodOverride("_method"))
server.use(routes)
server.set("view engine","njk")


nunjucks.configure("views",{
    express:server,
    autoescape:false,
    noCache:true
})

const port = process.env.PORT ||4000;

server.listen(port,function(){
    console.log("server is running now")
})