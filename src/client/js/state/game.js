import Phaser from 'phaser';
import socketio from 'socket.io-client';
import Player from '../player';

export default class GameState extends Phaser.State {
  constructor() {
    super();
  }
  preload() {
    this.doneLoading = 0; //this is 1 at the end of createOnConnection
    this.load.image('background', 'assets/space.jpg');
    this.load.image('dirt', 'assets/dirt.jpg');
    this.load.image('land', 'assets/land.jpg');
    this.load.image('juan_tank', 'assets/tanks/juan_tank.png');
    this.load.image('juan_turret', 'assets/tanks/barrel.png');
  }

  create() {
    this.io = socketio.connect();
    this.io.on('connect', data => {
      this.createOnConnection(data);
    });

    this.background = this.add.sprite(0, 0, 'background').setOrigin(0, 0);
    this.land = this.add.bitmapData(400, 300);
    this.land.draw('land');
    this.land.update();
    this.land.addToWorld();
  }

  update() {
    if (this.doneLoading) {
      const player = this.getPlayerById(this.io.id);
      this.io.emit('client:player-moved', {
        id: this.io.id,
        posX: player.sprite.worldPosition.x,
        posY: player.sprite.worldPosition.y,
        angle: player.sprite.angle
      });

      this.getPlayerById(this.io.id).update();

      this.topText.setText(`Your ID: ${this.io.id}
        ${this.players.length} players
        posX: ${Math.floor(player.sprite.worldPosition.x)}
        posY: ${Math.floor(player.sprite.worldPosition.y)}
      `);
    }
  }

  createOnConnection(data) {
    window.players = [];
    this.players = players;
    window.io = this.io; //meafffdd

    this.socketCreateListeners();

    this.stage.backgroundColor = '#aaa';
    this.physics.startSystem(Phaser.Physics.ARCADE);


    this.topText = this.add.text(
      10,
      10,
      '', {
        font: "12px Arial",
        fill: "rgba(0, 0, 0, 0.64)"
      });

    this.doneLoading = 1;
  }

  socketCreateListeners() {
    const me = this.getPlayerById(this.io.id);
    //load all existing players
    this.io.emit('client:give-me-players'); //ask for it
    this.io.on('server:all-players', data => { //the response
      data.forEach(e => {
        if (e.id != this.io.id) //this will prevent loading our player two times
          players.push(new Player(e.id, this, e.posX, e.posY, e.angle));
      });
    });

    this.io.on('server:player-added', data => {
      console.log(`New ${data.id} added to x: ${data.posX}, y: ${data.posY}`);
      players.push(new Player(data.id, this, data.posX, data.posY, data.angle));
    });

    this.io.on('server:player-disconnected', id => { //if a player has disconnected
      console.log(`Player ${id} disconnected`);
      this.deletePlayerById(id)
    });

    this.io.on('server:player-moved', data => {
      this.getPlayerById(data.id).setX(data.posX).setY(data.posY).setAngle(data.angle);
    });
  }

  getPlayerById(id) {
    const foundPlayer = this.players.find(player => player.id === id)
    return foundPlayer ? foundPlayer : null
  }

  deletePlayerById(id) {
    const foundPlayerIndex = this.players.findIndex(player => player.id === id)
    if (foundPlayerIndex > -1) {
      this.players[i].sprite.destroy(); //phaser sprite destroy function
      this.players.splice(i, 1); //unset from the players array
    }
  }
}