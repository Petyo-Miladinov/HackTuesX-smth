const express  = require('express')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')
const cookieParser = require('cookie-parser');

const port = 80
app.use(cookieParser());
app.use(express.static('views'));
app.set('view engine', 'ejs') 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    if(req.cookies.id){
        if(fs.existsSync(__dirname + "/3d/" + req.cookies.id) == true){
            console.log("aaa")
            res.render('index', {disabled: ""})
        }
        else{
            res.render('index', { disabled: "disabled"})
        }
        
    }
    else{
        res.render('account')
    }
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
        if(fs.existsSync(__dirname + "/3d/" + req.query.id) == false){
            fs.mkdir("3d/" + req.query.id, (err) => {})
        }
        fs.writeFile("3d/" + req.query.id + "/model.txt", "", (err) =>{})
        res.send("Done")
    }
})

app.post('/login', async (req, res) =>{
    let data = req.body 
    console.log(data.user_id)
    res.cookie("id", data.user_id)
    res.redirect("/")
})

app.get('/logout', (req, res) =>{
    res.clearCookie("id")
    res.redirect("/")
})

app.get('/download', (req, res) =>{
    let cookie = req.cookies.id
    if(cookie != undefined)
    {
        res.download(__dirname + "/3d/" + cookie + "/model.txt")
    }
    else{
        res.send("err")
    }
})

app.listen(port, () => {
    console.log("Running...")
})