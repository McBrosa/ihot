const config = require('./config');
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

app.use((req, res, next) => {
	console.log(`Client requested ${req.path}`);
	next();
});
app.use('/', express.static(path.join(__dirname, '../../dist')))
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

//-socket
const players = require('./player.js');

io.on('connection', socket => {
	players.add(socket.id);
	console.log(`${socket.id} added`);
	io.emit('server:player-added', players.get(socket.id));

	socket.on('client:give-me-players', () => {
		socket.emit('server:all-players', players.get());
	});

	socket.on('client:player-moved', data => {
		socket.broadcast.emit('server:player-moved', players.get(socket.id));
		players.set(data.id, {
			posX: data.posX,
			posY: data.posY,
			angle: data.angle
		});
	});

	socket.on('disconnect', () => {
		players.delete(socket.id);
		io.emit('server:player-disconnected', socket.id);
		console.log(`${socket.id} disconnected`);
	});
});
//-socket

server.listen(config.port, () => {
	console.log(`Listening on ${config.port}`);
});

// server.listen(3000, () => {
//   console.log('server up and running, connect to http://localhost:3000');

//   let totalPlayers = 0;
//   io.on('connection', socket => {
//     console.log(`Accepted websocket connection for player ${++totalPlayers}`);
//     socket.on('init', () => {
//       socket.emit('registered', { playerNumber: totalPlayers })
//       io.emit('count', { totalPlayers })
//     });
//     socket.on('disconnect', () => {
//       totalPlayers--
//       io.emit('count', { totalPlayers });
//     });
//   });
// });