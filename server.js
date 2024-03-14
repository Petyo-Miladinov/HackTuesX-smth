const express  = require('express')
const app = express()
const port = 80
app.use(express.static('views'));
app.set('view engine', 'ejs') 

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/test', (req, res) => {
    console.log(req.body)
    console.log(req.query)
    res.send("Never Gonna Give You Up")
})

app.listen(port, () => {
    console.log("Running...")
})