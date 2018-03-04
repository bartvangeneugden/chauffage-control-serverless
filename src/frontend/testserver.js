//For local development only. Normally this would be served off S3
var express = require('express');
var app = express();
var path = require('path');

app.use('/build', express.static('build'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);
