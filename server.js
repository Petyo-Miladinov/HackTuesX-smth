const express  = require('express')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')


const port = 80
app.use(express.static('views'));
app.set('view engine', 'ejs') 
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('account')
})

app.get('/add', async (req, res) => {
    
    if(req.query.id == null){
        res.send("no id. f u")
    }
    else{
        console.log(req.query)
        let data = req.query.data
        data = data + "\n"
        fs.appendFile("3d/" + req.query.id + "/model.txt", data, (err) =>{})
        res.send("Received")
    }
})

app.get('/new_file', async(req, res) => {
    console.log("aaa")
    if(req.query.id == null){
        res.send("no id. f u")
    }
    else{
        console.log(fs.existsSync("3d/" + req.query.id))
        if(fs.existsSync(__dirname + "/3d/" + req.query.id) == false){
            fs.mkdir("3d/" + req.query.id, (err) => {})
        }
        fs.writeFile("3d/" + req.query.id + "model.txt", "", (err) =>{})
        res.send("Done")
    }
})

app.get('/download', (req, res) =>{
    res.download(__dirname + "/3d/model.txt")
})

app.listen(port, () => {
    console.log("Running...")
})