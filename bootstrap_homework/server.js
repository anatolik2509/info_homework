const express = require('express');
const parser = require('body-parser');
const app = express();
const port = 3000;

app.use(parser.urlencoded({ extended: true }));
app.use(express.json());
require('./server/request_handler')(app);
app.use(express.static('public'));
app.listen(port);
console.log("server started at " + port);