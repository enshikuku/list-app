import express from "express"

// create an express application
const app = express()

// set template engine
app.set('view engine', 'ejs')

// specify where to source for static files
app.use(express.static('public'))

const items = [
    {id: 1, name: 'mangoes'},
    {id: 2, name: 'bananas'},
    {id: 3, name: 'pencil'},
    {id: 4, name: 'pen'},
    {id: 5, name: 'notebook'}
]

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about', {
        data: 'this is data from server',
        items: items
    })
})
// 404  error

app.get('*', (req, res) => {
    res.render('pnf')
})
app.listen(3000)