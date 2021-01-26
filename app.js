var express = require('express')
var path = require('path')
var http = require('http')
var bodyParser = require('body-parser')
var router = require('./routes/routes')
var cors = require('cors')



var port = 9091

var app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())


app.use('/api', router)

app.set('port', port)

var server = app.listen(port)

//var server = http.createServer(app)
//server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error
	}

	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

	switch (error.code) {
		case 'EACCESS':
			console.error(bind + ' requires eleveted priveleges')
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(bind + ' is already in use')
			process.exit(1)
			break
		default:
			throw error
	}
}

function onListening() {
	var addr = server.address()
	var bind = typeof addr === 'string' ? 'Pipe ' + addr : 'Port ' + addr.port
	console.log('server running on http://127.0.0.1:' + port)
}