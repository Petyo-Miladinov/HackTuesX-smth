const express  = require('express')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')

const port = 80
app.use(express.static('views'));
app.set('view engine', 'ejs') 
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/add', async (req, res) => {
    let data = req.query.data
    console.log(data)
    let coods = data.split(",")
    data = "v " + coods[0] + " " + coods[1] + " " + coods[2] + "\n"
    fs.appendFile("3d/model.obj", data, (err) =>{})
    res.send("Received")
})

app.get('/download', (req, res) =>{
    res.download(__dirname + "/3d/model.obj")
})

app.listen(port, () => {
    console.log("Running...")
})