const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const indexRouter = require('./routes/index');
const contactoRouter = require('./routes/contacto');
const menuRouter = require('./routes/menu');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clientes r-italia'
});

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/contacto', contactoRouter);
app.use('/menu', menuRouter);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');app.use(express.static(__dirname + '/views'));

app.post("/validar", (req, res) => {
    let nombre = req.body.Name;
    let email = req.body.Email;
    let telf = req.body.Tlf;
    let msj = req.body.Msg;
    let registrar = `INSERT INTO clientes (Nombre, Email, Telefono, Mensaje) VALUES ('${nombre}', '${email}', '${telf}', '${msj}')`;
    connection.query(registrar, (err, result) => {
        if (err) throw err;
        res.redirect('/index.html');
    })
})

app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`)
})