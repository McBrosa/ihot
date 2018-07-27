export class TankTest extends Phaser.Scene {

    preload() {
        this.load.image('juan_tank', 'assets/tanks/juan_tank.png');
        this.load.image('moises_tank', 'assets/tanks/moises_tank.png');
    }

    create() {
        var juan = this.physics.add.image(100, 400, 'juan_tank');
        var moises = this.physics.add.image(800, 400, 'moises_tank');
        juan.displayWidth = 50;
        juan.displayHeight = 50;
        moises.displayWidth = 50;
        moises.displayHeight = 50;
        moises.flipX = true;

        juan.setVelocity(100, 0);
        juan.setBounce(1, 0);
        juan.setCollideWorldBounds(true);

        moises.setVelocity(-100, 0);
        moises.setBounce(1, 0);
        moises.setCollideWorldBounds(true);
    }
}
