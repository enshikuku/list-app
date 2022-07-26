import express from "express"

// create an express application
const app = express()

// set template engine
app.set('view engine', 'ejs')

// specify where to source for static files
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.listen(3000)