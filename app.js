// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Our own imported files
const config = require('./models/config');
const routes = require('./routes/index')

const app = express()

mongoose.Promise = global.Promise
mongoose.connect(config.dbUrl, {server: { socketOptions: { keepAlive:120 } } })

// log requests
app.use(logger('dev'));
// create reg.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Allows you to use the routes middleware
app.use('/', routes)

app.listen(config.port, function () {
    console.log('Example app listening on port 3000!')
});
