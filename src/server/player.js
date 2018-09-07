const config = require('./config');
module.exports = new(class Players {
  constructor() {
    this.players = [];
  }
  add(id, roomNo) {
    this.players.push({
      id,
      posX: config.game.start.x,
      posY: config.game.start.y
    });
  }
  get(id) {
    const foundPlayer = this.players.find(player => player.id === id);
    return foundPlayer ? foundPlayer : this.players;
    // return this.players;
    // for (let i = 0; i < this.players.length; i++) {
    //   if (this.players[i].id == id) return this.players[i];
    // }
    // return this.players;
  }
  set(id, json) {
    this.players = this.players.map((e) => {
      if (e.id === id) { //search the player with a specified id
        Object.keys(json).forEach((k) => { //loop through all values that need to be modified
          e[k] = json[k];
        });
      }
      return e;
    });
  }
  delete(id) {
    const deletePlayerIndex = this.players.findIndex(player => player.id === id);
    if (deletePlayerIndex > -1) {
      this.players.splice(deletePlayerIndex, 1);
    }
    // for (let i = 0; i < this.players.length; i++) {
    //   if (this.players[i].id == id) this.players.splice(i, 1);
    // }
  }
});