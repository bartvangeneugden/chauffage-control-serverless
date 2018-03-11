//For local development only. Normally this would be served off S3
var express = require('express');
var app = express();
var path = require('path');

app.use('/build', express.static('build'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/api/config.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../../__tests__/mockConfig.json'));
});

app.listen(8080);
