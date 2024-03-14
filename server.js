const express  = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 80
app.use(express.static('views'));
app.set('view engine', 'ejs') 
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/test', async (req, res) => {
    console.log(req)
    console.log(req.query)
    res.send("Never Gonna Give You Up")
})

app.listen(port, () => {
    console.log("Running...")
})