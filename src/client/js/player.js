export default class Tank {
	constructor(id, game, x, y, angle) {
		this.id = id;
		this.game = game;
		this.cursors = this.input.keyboard.createCursorKeys();

		this.sprite = this.game.add.sprite(0, 0, 'juan_tank', 100);
		this.sprite.scale.setTo(-.1, .1);
		this.game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.inputEnabled = true;
		this.sprite.anchor.setTo(0, 0.5);
		this.sprite.x = x;
		this.sprite.y = y;
		this.sprite.angle = angle;
		this.sprite.body.allowRotation = false;
	}

	update() {
		// this.sprite.rotation = this.game.physics.arcade.moveToPointer(this.sprite, 60, this.game.input.activePointer, 500);
		// Player Movement
		if (this.cursors.left.isDown) {
			this.sprite.setVelocityX(-160);
			this.sprite.flipX = true;
			// console.log("left");
		} else if (this.cursors.right.isDown) {
			this.sprite.setVelocityX(160);
			this.sprite.flipX = false;
			// console.log("right")
		} else {
			this.sprite.setVelocityX(0);
			// console.log("X stop");
		}

		if (this.cursors.up.isDown) {
			this.sprite.setVelocityY(-160);
			// console.log("up")
		} else if (this.cursors.down.isDown) {
			this.sprite.setVelocityY(160);
			// console.log("down")
		} else {
			this.sprite.setVelocityY(0);
			// console.log("Y stop");
		}
	}
	
	setX(x) {
		if (this.cursors.left.isDown) {
			this.sprite.x = x--;
		}
		if (this.cursors.right.isDown) {
			this.sprite.x = x++;
		}
		return this;
	}
	setY(y) {
		if (this.cursors.up.isDown) {
			this.sprite.y = y++;
		}
		if (this.cursors.down.isDown) {
			this.sprite.y = y--;
		}
		return this;
	}

	setAngle(deg) {
		this.sprite.angle = deg++;
		return this;
	}
}