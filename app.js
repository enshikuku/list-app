import express from 'express'
import mysql from 'mysql'

// create an express application
const app = express()

//create a connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'list'
})

// set template engine
app.set('view engine', 'ejs')

// specify where to source for static files
app.use(express.static('public'))

// config to access form information
app.use(express.urlencoded({extended: false}))

// homepage
app.get('/', (req, res) => {
    res.render('index')
})

// about page
app.get('/about', (req, res) => {
    res.render('about')
})

// list items
app.get('/list', (req, res) => {

    let sql = 'SELECT * FROM item'

    connection.query(
        sql, (error, results) => {
            res.render('list', {items: results})
        }
    )  
})
// display add item form
app.get('/add', (req, res) => {
    res.render('add')
})

// submit add item form
app.post('/add', (req, res) => {

    let sql = 'INSERT INTO item (name) VALUES (?)'
    connection.query(
        sql, [req.body.newItem], (error, results) => {
            res.redirect('/list')
        }
    )
})
//display edit item form
app.get('/edit/:id', (req, res) => {

    let sql = 'SELECT * FROM Item WHERE id =?'
    connection.query(
        sql, [parseInt(req.params.id)],
        (error, results) => {
            res.render('edit', {item: results[0]})
        }
    )

})
// submit edit item form
app.post('/edit/:id', (req, res) => {

    let sql = 'UPDATE Item SET name = ? WHERE id = ?'
    connection.query(
        sql, [req.body.newItem, parseInt(req.params.id)],
        (error, results) => {
            res.redirect('/list')
        }
    )

})

// 404  error

app.get('*', (req, res) => {
    res.render('404')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('app is live')
})