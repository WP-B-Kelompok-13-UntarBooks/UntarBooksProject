const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const layouts = require('express-ejs-layouts');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded());
app.use("/node_modules", express.static('node_modules'));
app.use("/layouts", express.static('views/layouts'));

/*
//enable session

app.use(session({
    secret:'som3_s3cret_key5',
    cookie: {}
}));*/

//use layouts
app.use(layouts);
app.use(express.static('public'));
app.set('layout', 'layouts/cust-nav.ejs');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//routes
const indexRouter = require('./routes/index');
const searchRouter = require('./routes/search');
const detailRouter = require('./routes/detail');
//const authRouter = require('./routes/auth');
//const todoRouter = require('./routes/todo');

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/detail', detailRouter);
//app.use('/auth', authRouter);
//app.use('/todo', todoRouter);

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Server runs at port 3000...');
});