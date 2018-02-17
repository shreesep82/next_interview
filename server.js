// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

app.use(express.static('public'))

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

 require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
//app.listen(port);
//console.log('The magic happens on port ' + port);

///////////////////////////////////////////////////////////////////////////////////////////////////////

  var io = require('socket.io')
  var pty = require('pty.js')
  var terminal = require('./term.js');

var stream;
if (process.argv[2] === '--dump') {
  stream = require('fs').createWriteStream(__dirname + '/dump.log');
}

/**
 * Open Terminal
 */

var buff = []
var socket = {}
  , term = {};


function open_terminal(socketid) {

term[socketid] = pty.fork(process.env.SHELL || 'sh', [], {
  name: require('fs').existsSync('/usr/share/terminfo/x/xterm-256color')
    ? 'xterm-256color'
    : 'xterm',
  cols: 80,
  rows: 24,
  cwd: process.env.HOME
});

term[socketid].on('data', function(data) {
  if (stream) stream.write('OUT: ' + data + '\n-\n');
  return !socket[socketid]
    ? buff.push(data)
    : socket[socketid].emit('data', data);
});

console.log(''
  + 'Created shell with pty master/slave'
  + ' pair (master: %d, pid: %d)',
  term[socketid].fd, term[socketid].pid);
}

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

app.use(express.static(__dirname));
app.use(terminal.middleware());

var server = app.listen(port);
console.log('The magic happens on port ' + port);

/**
 * Sockets
 */

io = io.listen(server, {
  log: false
});

io.sockets.on('connection', function(sock) {
    open_terminal(sock.id)
    socket[sock.id] = sock;

	term[sock.id].write('stty rows 34 cols 110\n');

	console.log(sock.id)
    var sock_data = ''
    socket[sock.id].on('data', function(data) {
        if (stream) stream.write('IN: ' + data + '\n-\n');
        //console.log('data: ' + JSON.stringify(data));
        //console.log('data: ' + data);

        term[sock.id].write(data);
        if(data == '\r')
        {
            if(sock_data == 'exit')
            //socket.emit('data', sock_data)
            socket[sock.id].emit('data', sock_data)
            sock_data = ''
        }
        else if(data == '\u0004')
            //socket.emit('data', 'exit')
            socket[sock.id].emit('data', 'exit')
        else {
            	sock_data += data
		}

    });

    socket[sock.id].on('disconnect', function() {
        socket[sock.id] = null;
        //console.log('exit')
        //term.write('exit');
    });

/*
    console.log('buff: ' + buff)
    while (buff.length) {
        socket[sock.id].emit('data', buff.shift());
    }
*/
});

