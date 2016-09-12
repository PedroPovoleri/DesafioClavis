var mongoose = require('mongoose');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var fileUpload = require('express-fileupload');
var fs = require('fs');

var app = express();

//router load
var home = require('./route/homeRoute');
var scarpy = require('./route/scarpyRoute');
//Morgan
app.use(morgan('dev'));

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

//Mongoose connection
mongoose.connect('mongodb://127.0.0.1/clavis');

// Configura as rotas
var router = express.Router();

//Static routers
app.use('/' , express.static(path.resolve('../public')));

app.use(fileUpload());

//Model routers
app.use('/api/home', home);
app.use('/api/scarpy', scarpy);

app.listen(9191);