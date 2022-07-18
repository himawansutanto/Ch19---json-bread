const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')
const data = JSON.parse(fs.readFileSync('todo.json', 'utf8'))
const app = express()
const port = 3000

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('list', { rows: data })
})

app.get('/add', (req, res) => {
    res.render('add')
})

app.post('/add', (req, res) => {
    data.push({ string: req.body.string, integer: req.body.integer, float: req.body.float, date: req.body.date, boolean: req.body.boolean })
    fs.writeFileSync("todo.json", JSON.stringify(data, null, 3))
    res.redirect('/')
})

app.get('/edit/:id', (req, res) => {
    res.render('edit', { item: data[req.params.id], index: parseInt(req.params.id) })
})

app.post('/edit/:id', (req, res) => {
    data[req.params.id] = { string: req.body.string, integer: req.body.integer, float: req.body.float, date: req.body.date, boolean: req.body.boolean }
    fs.writeFileSync("todo.json", JSON.stringify(data, null, 3))
    res.redirect('/')
})

app.get('/delete/:id', (req, res) => {
    const index = req.params.id
    data.splice(index, 1)
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})