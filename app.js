const express = require('express')
const app = express()

// var http = require('http');
var https = require('https');
var fs = require('fs');

app.use(express.static('static'))

const httpsOptions = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.cert')
}
// const port = process.env.PORT || 8000;
const port = 1337;
const server = https.createServer(httpsOptions, app).listen(port, () => {
  console.log('server running at ' + port)
})

// https.createServer(httpsOptions, app);
// const server = app.listen(port, () => console.log(`Listening on port ${port}`))
