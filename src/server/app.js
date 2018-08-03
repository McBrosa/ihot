var path = require('path');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use((req, res, next) => {
  console.log(`Client requested ${req.path}`);
  next();
});
app.use('/', express.static(path.join(__dirname, '../../dist')))
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

server.listen(3000, () => {
  console.log('server up and running, connect to http://localhost:3000');

  let totalPlayers = 0;
  io.on('connection', socket => {
    console.log(`Accepted websocket connection for player ${++totalPlayers}`);
    socket.on('init', () => {
      socket.emit('registered', { playerNumber: totalPlayers })
      io.emit('count', { totalPlayers })
    });
    socket.on('disconnect', () => {
      totalPlayers--
      io.emit('count', { totalPlayers });
    });
  });
});
