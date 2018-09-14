export class TankTest extends Phaser.Scene {

    preload() {
        this.load.image('juan_tank', 'assets/tanks/juan_tank.png');
        this.load.image('barrel', 'assets/tanks/barrel.png');
    }

    create() {
        // Setup tank
        this.juan = this.physics.add.image(100, 400, 'juan_tank');
        this.juan.displayWidth = 100;
        this.juan.displayHeight = 100;

        this.juan.setCollideWorldBounds(true);

        // Create and attach turret
        this.turret = this.physics.add.image(150, 400, 'barrel');
        this.turret.displayWidth = 70;
        this.turret.displayHeight = 15;
        // this.juan.addChild(this.turret);

        //  Input Events
        this.mouse_click = false
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // Player Movement
        if (this.cursors.left.isDown) {
            this.juan.setVelocityX(-160);
            this.juan.flipX = true;
            // console.log("left");
        }
        else if (this.cursors.right.isDown) {
            this.juan.setVelocityX(160);
            this.juan.flipX = false;
            // console.log("right")
        }
        else {
            this.juan.setVelocityX(0);
            // console.log("X stop");
        }

        if (this.cursors.up.isDown) {
            this.juan.setVelocityY(-160);
            // console.log("up")
        }
        else if (this.cursors.down.isDown) {
            this.juan.setVelocityY(160);
            // console.log("down")
        }
        else {
            this.juan.setVelocityY(0);
            // console.log("Y stop");
        }

        // Turret and bullets
        this.input.on('pointerdown', function (pointer) {
            console.log("left click down");
            this.mouse_click = true
        }, this);
        this.input.on('pointerup', function (pointer) {
            console.log("left click up");
            if (this.mouse_click) {
                // fire bullet
                console.log("firing bullet");
            }
            this.mouse_click = false
        }, this);

    }
}
