

//#!/usr/bin/env node

/**
 * term.js
 * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
 */

var http = require('http')
  , express = require('express')
  , io = require('socket.io')
  , pty = require('pty.js')
  , terminal = require('../');

/**
 * term.js
 */

process.title = 'term.js';

/**
 * Dump
 */

var stream;
if (process.argv[2] === '--dump') {
  stream = require('fs').createWriteStream(__dirname + '/dump.log');
}

/**
 * Open Terminal
 */

var buff = []
  , socket
  , term;

function open_terminal() {

term = pty.fork(process.env.SHELL || 'sh', [], {
  name: require('fs').existsSync('/usr/share/terminfo/x/xterm-256color')
    ? 'xterm-256color'
    : 'xterm',
  cols: 80,
  rows: 24,
  cwd: process.env.HOME
});

term.on('data', function(data) {
  if (stream) stream.write('OUT: ' + data + '\n-\n');
  return !socket
    ? buff.push(data)
    : socket.emit('data', data);
});

console.log(''
  + 'Created shell with pty master/slave'
  + ' pair (master: %d, pid: %d)',
  term.fd, term.pid);
}

/**
 * App & Server
 */

var app = express()
  , server = http.createServer(app);

app.use(function(req, res, next) {
  var setHeader = res.setHeader;
  res.setHeader = function(name) {
    switch (name) {
      case 'Cache-Control':
      case 'Last-Modified':
      case 'ETag':
        return;
    }
    return setHeader.apply(res, arguments);
  };
  next();
});

/*
app.use(express.basicAuth(function(user, pass, next) {
  if (user !== 'foo' || pass !== 'bar') {
    return next(true);
  }
  return next(null, user);
}));
*/

app.use(express.static(__dirname));
app.use(terminal.middleware());

if (!~process.argv.indexOf('-n')) {
  server.on('connection', function(socket) {
    var address = socket.remoteAddress;
    //if (address !== '127.0.0.1' && address !== '::1' && address != '::ffff:127.0.0.1' ) {
    if (0) {
      try {
        socket.destroy();
      } catch (e) {
        ;
      }
      console.log('Attempted connection from %s. Refused.', address);
    }
  });
}

server.listen(8081);

/**
 * Sockets
 */

io = io.listen(server, {
  log: false
});

io.sockets.on('connection', function(sock) {
	open_terminal()
  	socket = sock;

    var sock_data = ''
  	socket.on('data', function(data) {
    	if (stream) stream.write('IN: ' + data + '\n-\n');
    	//console.log('data: ' + JSON.stringify(data));
    	term.write(data);
		if(data == '\r')
		{
			if(sock_data == 'exit')
	    	socket.emit('data', sock_data)
			sock_data = ''
		}
		else if(data == '\u0004')
    		socket.emit('data', 'exit')
		else
			sock_data += data
	
  	});

  	socket.on('disconnect', function() {
    	socket = null;
    	//console.log('exit')
    	//term.write('exit');
  	});

	console.log(buff)
  	while (buff.length) {
    	socket.emit('data', buff.shift());
  	}
});
