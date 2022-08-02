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
// about page
app.get('/about', (req, res) => {
    res.render('about')
})
// list items
app.get('/list', (req, res) => {
    res.render('list')
})
// add items
app.get('/add', (req, res) => {
    res.render('add')
})
// 404  error

app.get('*', (req, res) => {
    res.render('404')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('app is live')
})