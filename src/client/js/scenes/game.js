export class GameScene extends Phaser.Scene {
  preload() {
    this.load.image('background', 'assets/space.jpg');
    this.load.image('dirt', 'assets/dirt.jpg');
    this.load.image('land', 'assets/land.jpg');
  }

  create() {
    this.socket = io();
    this.background = this.add.sprite(0, 0, 'background').setOrigin(0, 0);
    

    // //just add graphic 
    // var graphic=this.add.graphics();
    // graphic.fillStyle(0xff00ff,1);
    // graphic.fillRect(0,0,60,60);

    // //add sprite with graphic content
    // this.graphic2=this.make.graphics({x: 0, y: 0, add: false});
    // this.graphic2.fillStyle(0x2200ff,0.4);
    // this.graphic2.fillRect(0,0,60,60);
    // this.graphic2.generateTexture('land', 60, 60);
            
    // var spr = this.add.sprite(0, 0, 'land');
    
    this.land = this.add.bitmapData(400, 300);
    this.land.draw('land');
    this.land.update();
    this.land.addToWorld();
  }

  update() {}
}