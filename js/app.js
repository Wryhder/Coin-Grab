var player;
var cursors;
var coins = new Array();
var score;
var score_text;
var rand_x, rand_y;


// Preload game assets
function preload() {
  this.load.image('coin', '../assets/Coin.png');
  this.load.spritesheet('player', '../assets/pixel guy.png', {
    frameWidth: 32,
    frameHeight: 32
  });
}

// Define game objects
function create() {
  // Initialize player score
  score = 0;

  // Display player score on top-left corner of screen
  score_text = this.add.text(10, 10, score, null);

  player = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'player');
  player.setScale(4);
  player.setOrigin(.5);

  this.anims.create({
    key: 'player_anim',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 8 }),
    repeat: -1
  });

  player.anims.play('player_anim');

  cursors = this.input.keyboard.createCursorKeys();

  // Populate `coins` array with coin sprites randomly placed on screen
  for (var i = 0; i < 10; i++) {
    rand_x = Math.floor(Math.random() * Math.floor(800));
    rand_y = Math.floor(Math.random() * Math.floor(600));

    var coin = this.add.sprite(rand_x, rand_y, 'coin');

    // Set position of coin sprite at center of graphic
    coin.setOrigin(.5);

    coins.push(coin);
  }
}

// Engine loop
function update() {
  // move the player up when up arrow key is pressed
  if (cursors.up.isDown) {
    player.y -= 2;
  }
  // move the player down when down arrow key is pressed
  if (cursors.down.isDown) {
    player.y += 2;
  }
  // move the player left when left arrow key is pressed
  if (cursors.left.isDown) {
    player.x -= 2;
  }
  // move the player right when right arrow key is pressed
  if (cursors.right.isDown) {
    player.x += 2;
  }

  coinCollection();
}

function coinCollection() {
  for (var coin of coins) {
    if (player.x > (coin.x - coin.width / 2)
      && player.x < (coin.x + coin.width / 2)
      && player.y > (coin.y - coin.height / 2)
      && player.y < (coin.y + coin.height / 2)) {

      // collision; move coin to some other random location
      rand_x = Math.floor(Math.random() * Math.floor(800));
      rand_y = Math.floor(Math.random() * Math.floor(600));
      coin.x = rand_x;
      coin.y = rand_y;

      // Increase player score
      score += 1;

      // Update score display
      score_text.setText(score);
    }
  }
}

var config = {
  type: Phaser.WEBGL,
  parent: 'ivan-game',
  width: 800,
  height: 600,
  backgroundColor: 'black',
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  pixelArt: true,
  audio: {
    disableWebAudio: true
  }
};

var game = new Phaser.Game(config);
